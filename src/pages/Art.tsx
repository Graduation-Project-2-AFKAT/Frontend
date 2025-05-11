import { Grid, Html, OrbitControls, Stage, useGLTF } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Download, Flag, Heart, Share2 } from "lucide-react";
import moment from "moment";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";
import { toast } from "react-toastify";
import * as THREE from "three";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { downloadAsset, loadAsset } from "../redux/modules/assets";

const ArtComments = lazy(
  () => import("../components/Arts/ArtComments"), //TODO this is only mocking comments, replace it with comment fetched from server
);

const Art = () => {
  const { Asset, downloadProgress, estimatedTime } = useAppSelector(
    (state) => state.assets,
  );
  const { isLoading, type } = useAppSelector((state) => state.loading);
  const dispatch = useAppDispatch();

  const {
    id,
    title,
    description,
    author,
    tags,
    created_at,
    download_count,
    model_file,
  } = Asset || {};

  const location = useLocation();

  const [activeTab, setActiveTab] = useState<"details" | "comments">("details");
  const [liked, setLiked] = useState(false);
  const [autoRotate, setAutoRotate] = useState(false);
  const [wireframe, setWireframe] = useState(false);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [gridPosition, setGridPosition] = useState(-2);
  const [isReportLoading, setIsReportLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!Asset) {
      const id = location.pathname.split("/").pop();

      dispatch(loadAsset(id!));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDownload = () => {
    if (id) {
      dispatch(
        downloadAsset({ id: id, assetTitle: title!, assetFile: model_file! }),
      );
    }
  };

  function Loader() {
    return (
      <Html center>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex animate-pulse flex-col items-center">
            <svg
              className="text-primary mb-4 h-10 w-10 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span className="text-nowrap">Loading 3D model...</span>
          </div>
        </div>
      </Html>
    );
  }

  // Provides OrbitControls with auto-rotation functionality
  function StableOrbitControls({ autoRotate }: { autoRotate: boolean }) {
    const { camera, gl } = useThree();
    const controlsRef = useRef<any>(null);

    // Use useFrame for smooth updates
    useFrame(() => {
      if (controlsRef.current) {
        controlsRef.current.update();
      }
    });

    return (
      <OrbitControls
        ref={controlsRef}
        camera={camera}
        domElement={gl.domElement}
        autoRotate={autoRotate}
        autoRotateSpeed={1}
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        enableDamping={true}
        dampingFactor={0.05}
        // These settings help prevent camera reset issues
        makeDefault
        // minPolarAngle={Math.PI / 2.5} // Minimum vertical angle (prevents going too high)
        // maxPolarAngle={Math.PI / 1.5} // Maximum vertical angle (prevents going too low)
        // minAzimuthAngle={-Math.PI / 4} // Limit horizontal rotation to -45 degrees
        // maxAzimuthAngle={Math.PI / 4} // Limit horizontal rotation to +45 degrees
      />
    );
  }

  function Model({ url, wireframe }: { url: string; wireframe: boolean }) {
    const { scene } = useGLTF(url);
    if (!scene) throw Error("Error: model file is not available");
    const modelRef = useRef<THREE.Object3D>(null);

    useEffect(() => {
      scene.traverse((node: any) => {
        if (node.isMesh) {
          // Handle both single materials and material arrays
          if (Array.isArray(node.material)) {
            node.material.forEach((mat: any) => {
              if (mat) mat.wireframe = wireframe;
            });
          } else if (node.material) {
            node.material.wireframe = wireframe;
          }
        }
      });
    }, [wireframe, scene]);

    useEffect(() => {
      if (modelRef.current) {
        // Center the model properly
        const box = new THREE.Box3().setFromObject(modelRef.current);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());
        modelRef.current.position.sub(center);

        const maxDimension = Math.max(size.x, size.y, size.z);
        if (maxDimension > 5) {
          const scale = 5 / maxDimension;
          modelRef.current.scale.set(scale, scale, scale);
        } else if (maxDimension < 1) {
          const scale = 2.5 / maxDimension;
          modelRef.current.scale.set(scale, scale, scale);
        }
        // console.log("x:", size.x);
        // console.log("y:", size.y);
        // console.log("z:", size.z);

        // Calculate grid position based on model's bottom
        const newBox = new THREE.Box3().setFromObject(modelRef.current);
        const bottomY = newBox.min.y - 0.1;
        setGridPosition(bottomY);
      }
    }, [scene]);

    return <primitive ref={modelRef} object={scene} />;
  }

  // Ensure prevent scrolling when mouse is over canvas container
  useEffect(() => {
    const container = canvasContainerRef.current;

    if (container) {
      const preventScroll = (e: WheelEvent) => {
        e.preventDefault();
      };

      container.addEventListener("wheel", preventScroll, { passive: false });

      return () => {
        container.removeEventListener("wheel", preventScroll);
      };
    }
  }, []);

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleReport = () => {
    setIsReportLoading(true);
    setTimeout(() => {
      toast.info("Your report has been sent successfully");
      setIsReportLoading(false);
    }, 1000);
  };

  return (
    <div className="w-full">
      <div className="space-y-8 px-15 pt-8 pb-20">
        {/* Header */}
        <header className="flex items-center justify-between">
          <div className="flex flex-col space-y-2">
            <h1 className="text-3xl font-bold">{title}</h1>
            <div className="flex">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="avatar"
                className="mr-2 h-8 w-8 rounded-full"
              />

              <span className="text-white/70">by</span>
              {/* //TODO redirect to profile page with author id to load their data, in profile page check if there is id on url load their data else keep your data there */}
              <Link to={`#`} className="hover:text-primary ml-1 font-medium">
                {author}
              </Link>
            </div>
          </div>

          <div className="flex gap-x-3">
            <div className="relative flex flex-col items-end">
              <button
                onClick={handleDownload}
                disabled={isLoading && type === "assets/download"}
                className={`"disabled:bg-primary/70 bg-primary mb-1 flex items-center gap-x-2 rounded px-4 py-2 text-sm font-bold text-black duration-150 disabled:cursor-not-allowed! ${!(isLoading && type === "assets/download") && "hover:scale-95"}`}
              >
                {isLoading && type === "assets/download"
                  ? `Downloading...`
                  : `Download`}
                <Download width={18} />
              </button>

              {/* Progress bar - only show when downloading */}
              {isLoading &&
                type === "assets/download" &&
                downloadProgress > 0 && (
                  <div className="absolute bottom-0 mt-2 w-full max-w-[150px] translate-y-8 xl:hidden">
                    <div className="h-1.5 w-full rounded-full bg-gray-700">
                      <div
                        className="bg-primary h-1.5 rounded-full transition-all duration-300 ease-out"
                        style={{ width: `${downloadProgress}%` }}
                      />
                    </div>
                    <div className="mt-1 flex justify-between text-xs">
                      <p>~{estimatedTime || 0}s left</p>
                      <p>{downloadProgress}%</p>
                    </div>
                  </div>
                )}
            </div>
            <div className="space-x-2">
              <button
                className={`${liked ? "border-primary text-primary" : "border-white/20 hover:border-white/50"} rounded border px-3 py-2 duration-100`}
                onClick={handleLike}
              >
                <Heart size={20} className={liked ? "fill-primary" : ""} />
              </button>
              <button className="rounded border border-white/20 px-3 py-2 hover:border-white/50">
                <Share2 size={20} />
              </button>
            </div>
          </div>
        </header>

        {/* 3D Model Viewer */}
        <section className="flex flex-col items-center">
          <div
            ref={canvasContainerRef}
            className="relative aspect-video min-h-[500px] w-full max-w-[68rem] self-center overflow-hidden rounded-xl border border-white/10 bg-[#16141C]"
          >
            <Canvas
              camera={{
                fov: 45,
                near: 0.1,
                far: 2000,
                position: [-1, 0.5, 5],
              }}
              dpr={[1, 2]}
              frameloop="demand"
              onPointerDown={() => (document.body.style.cursor = "grabbing")}
              onPointerUp={() => (document.body.style.cursor = "grab")}
              onPointerLeave={() => (document.body.style.cursor = "")}
              onPointerEnter={() => (document.body.style.cursor = "grab")}
            >
              <Suspense fallback={<Loader />}>
                <Stage intensity={0.6} adjustCamera={false}>
                  <group>
                    {model_file && !isLoading ? (
                      <Model url={model_file} wireframe={wireframe} />
                    ) : (
                      <Html center>
                        <div className="flex flex-col items-center gap-2 rounded-md bg-black/50 p-4 text-nowrap backdrop-blur-sm">
                          <div className="text-warning h-8 w-8">⚠️</div>
                          <p>Model file not available</p>
                        </div>
                      </Html>
                    )}
                  </group>
                </Stage>
              </Suspense>
              <Grid
                renderOrder={-1}
                position={[0, gridPosition, 0]}
                infiniteGrid
                cellSize={1}
                cellThickness={0.6}
                sectionSize={5}
                sectionThickness={1.5}
                sectionColor="#AAA"
                fadeDistance={50}
              />
              <StableOrbitControls autoRotate={autoRotate} />
              {/* <Environment background preset="park" blur={0.05} /> */}
            </Canvas>

            <div className="pointer-events-none absolute bottom-4 left-4 rounded bg-black/50 px-3 py-1 text-sm backdrop-blur-sm">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-green-500"></span>
                Click and drag to rotate model
              </div>
            </div>

            <div className="absolute right-4 bottom-4 flex gap-2">
              <button
                className={`rounded px-2 py-1 text-sm ${autoRotate ? "bg-primary text-black" : "bg-black/50 text-white/70"} backdrop-blur-sm`}
                onClick={() => setAutoRotate(!autoRotate)}
              >
                Auto-Rotate
              </button>
              <button
                className={`rounded px-2 py-1 text-sm ${wireframe ? "bg-primary text-black" : "bg-black/50 text-white/70"} backdrop-blur-sm`}
                onClick={() => setWireframe(!wireframe)}
              >
                Wireframe
              </button>
            </div>
          </div>
        </section>

        {/* Tabs */}
        <div className="border-b border-white/10">
          <div className="flex">
            <button
              className={`px-5 py-3 font-medium ${activeTab === "details" ? "border-primary text-primary border-b-2" : "text-white/70"}`}
              onClick={() => setActiveTab("details")}
            >
              Details
            </button>
            <button
              className={`px-5 py-3 font-medium ${activeTab === "comments" ? "border-primary text-primary border-b-2" : "text-white/70"}`}
              onClick={() => setActiveTab("comments")}
            >
              Comments
            </button>
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === "details" ? (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h2 className="mb-3 text-xl font-semibold">Description</h2>
              <p className="mb-10 pl-3 leading-relaxed text-white/80">
                {description}
              </p>

              <div>
                <h3 className="mb-3 text-lg font-medium">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {tags &&
                    tags.map((tag) => (
                      <a
                        key={tag}
                        href={`/arts?tag=${tag}`}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm transition-colors hover:border-teal-400/50"
                      >
                        {tag}
                      </a>
                    ))}
                </div>
              </div>
            </div>

            <div className="h-fit rounded-lg border border-white/10 bg-[#16141C] p-6">
              <h2 className="mb-4 text-xl font-semibold">Asset Information</h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-white/70">File Format</span>
                  <span className="font-medium">
                    {model_file?.split(".").pop()?.toUpperCase()}
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-white/70">License</span>
                  <span className="text-end font-medium">
                    Standard Commercial License
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-white/70">Downloads</span>
                  <span className="font-medium">{`${download_count ? download_count + "+" : 0}`}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-white/70">Published</span>
                  <span className="font-medium">
                    {moment(created_at).format("l")}
                  </span>
                </div>
              </div>

              <div className="mt-6 border-t border-white/10 pt-6">
                <button
                  className="flex w-full items-center justify-center gap-2 rounded border border-white/10 bg-white/5 py-2 text-white/70 hover:bg-white/10"
                  onClick={handleReport}
                  disabled={isReportLoading}
                >
                  {isReportLoading && (
                    <svg
                      className="mr-3 -ml-1 size-5 animate-spin text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  )}
                  {/* //TODO press report asset to send email to support service or admin */}
                  <Flag size={16} />
                  Report Asset
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-6">
            <form className="mb-6 rounded-lg border border-white/10 bg-[#16141C] p-6">
              <h3 className="mb-4 font-medium">Leave a Comment</h3>
              <textarea
                className="field-sizing-content min-h-40 w-full rounded border border-white/10 bg-white/5 p-3 text-white placeholder-white/50 transition-colors outline-none focus:border-teal-400"
                placeholder="Share your thoughts about this asset..."
              />
              <div className="mt-4 flex justify-end">
                <button className="bg-primary rounded px-6 py-2 font-medium text-black">
                  Post Comment
                </button>
              </div>
            </form>

            {activeTab === "comments" && (
              <Suspense
                fallback={
                  <div className="absolute inset-0 top-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="flex items-center gap-2">
                      <div className="border-primary h-6 w-6 animate-spin rounded-full border-t-2 border-b-2"></div>
                      <span>Loading comments...</span>
                    </div>
                  </div>
                }
              >
                {/* //TODO lazy load art comments */}
                <ArtComments />
              </Suspense>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Art;
