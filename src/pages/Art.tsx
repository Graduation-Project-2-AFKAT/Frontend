import { useState, Suspense, useEffect, useRef } from "react";
import { Download, Heart, Share2, Flag } from "lucide-react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Stage, useGLTF, Html, Grid } from "@react-three/drei";
import * as THREE from "three";

const Art = () => {
  const [activeTab, setActiveTab] = useState<"details" | "comments">("details");
  const [liked, setLiked] = useState(false);
  const [autoRotate, setAutoRotate] = useState(false);
  const [wireframe, setWireframe] = useState(false);
  const [modelUrl] = useState(
    "https://threejs.org/examples/models/gltf/DamagedHelmet/glTF/DamagedHelmet.gltf",
  );

  const canvasContainerRef = useRef<HTMLDivElement>(null);

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
    const modelRef = useRef<THREE.Object3D>(null);

    useEffect(() => {
      scene.traverse((node: any) => {
        if (node.isMesh) {
          node.material.wireframe = wireframe;
        }
      });
    }, [wireframe, scene]);

    useEffect(() => {
      if (modelRef.current) {
        // Center the model properly
        const box = new THREE.Box3().setFromObject(modelRef.current);
        const center = box.getCenter(new THREE.Vector3());
        modelRef.current.position.sub(center);
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

  return (
    <div className="w-full">
      <div className="space-y-8 px-10 py-8 pb-20">
        {/* Header */}
        <header className="flex items-center justify-between">
          <div className="flex flex-col space-y-2">
            <h1 className="text-3xl font-bold">
              Sci-Fi Modular Environment Kit
            </h1>
            <div className="flex">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="avatar"
                className="mr-2 h-8 w-8 rounded-full"
              />

              <span className="text-white/70">by</span>
              <a href={``} className="hover:text-primary ml-1 font-medium">
                Pablo Gomez
              </a>
            </div>
          </div>

          <div className="flex gap-x-3">
            <button className="bg-primary flex items-center gap-x-2 rounded px-6 py-2 font-medium text-black">
              <Download size={18} />
              Download
            </button>
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
        </header>

        {/* 3D Model Viewer */}
        <section className="relative overflow-hidden rounded-xl border border-white/10 bg-[#16141C]">
          <div
            ref={canvasContainerRef}
            className="aspect-video min-h-[500px] w-full"
          >
            <Canvas
              camera={{
                fov: 45,
                near: 0.1,
                far: 1000,
                position: [-1, 0.5, 4],
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
                  <Model url={modelUrl} wireframe={wireframe} />
                </Stage>
              </Suspense>
              <Grid
                renderOrder={-1}
                position={[0, -1, 0]}
                infiniteGrid
                cellSize={0.6}
                cellThickness={0.6}
                sectionSize={3.3}
                sectionThickness={1.5}
                sectionColor="#AAA"
                fadeDistance={30}
              />
              <StableOrbitControls autoRotate={autoRotate} />
              {/* <Environment background preset="park" blur={0.05} /> */}
            </Canvas>
          </div>

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
              <h2 className="mb-4 text-xl font-semibold">Description</h2>
              <p className="mb-6 leading-relaxed text-white/80">
                A high-quality modular sci-fi environment kit, perfect for game
                development. Includes various wall sections, floor tiles, props,
                and decorative elements that can be combined to create unique
                sci-fi interiors. All assets are optimized for real-time
                rendering with PBR textures.
              </p>

              <div className="mb-8">
                <h3 className="mb-3 text-lg font-medium">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "sci-fi",
                    "modular",
                    "environment",
                    "PBR",
                    "space",
                    "futuristic",
                  ].map((tag) => (
                    <a
                      key={tag}
                      href={`/arts?tag=${tag}`}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm hover:border-teal-400/50"
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
                  <span className="text-white/70">Category</span>
                  <span className="font-medium">Environments</span>
                </div>

                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-white/70">File Format</span>
                  <span className="font-medium">GLTF</span>
                </div>

                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-white/70">License</span>
                  <span className="font-medium">
                    Standard Commercial License
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-white/70">Likes</span>
                  <span className="font-medium">521</span>
                </div>

                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-white/70">Downloads</span>
                  <span className="font-medium">789</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-white/70">Published</span>
                  <span className="font-medium">
                    {new Date().toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="mt-6 border-t border-white/10 pt-6">
                <button className="flex w-full items-center justify-center gap-2 rounded border border-white/10 bg-white/5 py-2 text-white/70 hover:bg-white/10">
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
              ></textarea>
              <div className="mt-4 flex justify-end">
                <button className="bg-primary rounded px-6 py-2 font-medium text-black">
                  Post Comment
                </button>
              </div>
            </form>

            <div className="space-y-6">
              {[
                {
                  id: 1,
                  author: {
                    name: "Alex Johnson",
                    avatar: "https://randomuser.me/api/portraits/men/41.jpg",
                    username: "alex_gamedev",
                  },
                  date: "2024-04-01",
                  content:
                    "This environment kit saved me so much time on my latest project! The modular pieces fit together perfectly and the textures are incredibly detailed. Would definitely recommend for any sci-fi game.",
                  likes: 12,
                },
                {
                  id: 2,
                  author: {
                    name: "Sarah Chen",
                    avatar: "https://randomuser.me/api/portraits/women/33.jpg",
                    username: "sarahgameartist",
                  },
                  date: "2024-03-28",
                  content:
                    "The PBR materials are excellent quality. I'm using these assets in my VR game and they look fantastic even under different lighting conditions. Great work!",
                  likes: 8,
                },
                {
                  id: 3,
                  author: {
                    name: "Michael Torres",
                    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
                    username: "mtorres_3d",
                  },
                  date: "2024-03-25",
                  content:
                    "Question - does this kit include source files for Blender? I'd love to make some custom modifications.",
                  likes: 3,
                  replies: [
                    {
                      id: 31,
                      author: {
                        name: "Pablo Gomez",
                        avatar:
                          "https://randomuser.me/api/portraits/men/32.jpg",
                        username: "environment_designer",
                      },
                      date: "2024-03-26",
                      content:
                        "Yes! The package includes Blender source files (.blend) as well as the exported GLTF and FBX formats. Let me know if you need any help with modifications.",
                    },
                  ],
                },
                {
                  id: 4,
                  author: {
                    name: "Emma Wright",
                    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
                    username: "emmaw",
                  },
                  date: "2024-03-22",
                  content:
                    "Just curious about the polycount? I'm working on a mobile game and wondering if these would be suitable or too heavy for mobile.",
                  likes: 5,
                },
              ].length > 0 ? (
                [
                  {
                    id: 1,
                    author: {
                      name: "Alex Johnson",
                      avatar: "https://randomuser.me/api/portraits/men/41.jpg",
                      username: "alex_gamedev",
                    },
                    date: "2024-04-01",
                    content:
                      "This environment kit saved me so much time on my latest project! The modular pieces fit together perfectly and the textures are incredibly detailed. Would definitely recommend for any sci-fi game.",
                    likes: 12,
                  },
                  {
                    id: 2,
                    author: {
                      name: "Sarah Chen",
                      avatar:
                        "https://randomuser.me/api/portraits/women/33.jpg",
                      username: "sarahgameartist",
                    },
                    date: "2024-03-28",
                    content:
                      "The PBR materials are excellent quality. I'm using these assets in my VR game and they look fantastic even under different lighting conditions. Great work!",
                    likes: 8,
                  },
                  {
                    id: 3,
                    author: {
                      name: "Michael Torres",
                      avatar: "https://randomuser.me/api/portraits/men/22.jpg",
                      username: "mtorres_3d",
                    },
                    date: "2024-03-25",
                    content:
                      "Question - does this kit include source files for Blender? I'd love to make some custom modifications.",
                    likes: 3,
                    replies: [
                      {
                        id: 31,
                        author: {
                          name: "Pablo Gomez",
                          avatar:
                            "https://randomuser.me/api/portraits/men/32.jpg",
                          username: "environment_designer",
                        },
                        date: "2024-03-26",
                        content:
                          "Yes! The package includes Blender source files (.blend) as well as the exported GLTF and FBX formats. Let me know if you need any help with modifications.",
                      },
                    ],
                  },
                  {
                    id: 4,
                    author: {
                      name: "Emma Wright",
                      avatar:
                        "https://randomuser.me/api/portraits/women/65.jpg",
                      username: "emmaw",
                    },
                    date: "2024-03-22",
                    content:
                      "Just curious about the polycount? I'm working on a mobile game and wondering if these would be suitable or too heavy for mobile.",
                    likes: 5,
                  },
                ].map((comment) => (
                  <div
                    key={comment.id}
                    className="rounded-lg border border-white/10 bg-[#16141C] p-6"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex">
                        <img
                          src={comment.author.avatar}
                          alt={comment.author.name}
                          className="mr-3 h-10 w-10 rounded-full"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <a
                              href={`/profile/${comment.author.username}`}
                              className="hover:text-primary font-medium"
                            >
                              {comment.author.name}
                            </a>
                            {comment.author.username ===
                              "environment_designer" && (
                              <span className="bg-primary/20 text-primary rounded px-2 py-0.5 text-xs">
                                Author
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-white/50">
                            {new Date(comment.date).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              },
                            )}
                          </p>
                        </div>
                      </div>
                      <button className="text-white/40 hover:text-white">
                        •••
                      </button>
                    </div>

                    <p className="mt-3 text-white/90">{comment.content}</p>

                    <div className="mt-4 flex items-center gap-4">
                      <button className="hover:text-primary flex items-center gap-1 text-sm text-white/50">
                        <Heart size={14} />
                        <span>{comment.likes}</span>
                      </button>
                      <button className="hover:text-primary text-sm text-white/50">
                        Reply
                      </button>
                    </div>

                    {/* Replies */}
                    {comment.replies && comment.replies.length > 0 && (
                      <div className="mt-4 border-l-2 border-white/10 pl-4">
                        {comment.replies.map((reply) => (
                          <div key={reply.id} className="mt-4">
                            <div className="flex">
                              <img
                                src={reply.author.avatar}
                                alt={reply.author.name}
                                className="mr-3 h-8 w-8 rounded-full"
                              />
                              <div>
                                <div className="flex items-center gap-2">
                                  <a
                                    href={`/profile/${reply.author.username}`}
                                    className="hover:text-primary font-medium"
                                  >
                                    {reply.author.name}
                                  </a>
                                  {reply.author.username ===
                                    "environment_designer" && (
                                    <span className="bg-primary/15 text-primary rounded px-2 py-0.5 text-xs">
                                      Author
                                    </span>
                                  )}
                                </div>
                                <p className="text-sm text-white/50">
                                  {new Date(reply.date).toLocaleDateString(
                                    "en-US",
                                    {
                                      year: "numeric",
                                      month: "short",
                                      day: "numeric",
                                    },
                                  )}
                                </p>
                              </div>
                            </div>

                            <p className="mt-2 text-white/90">
                              {reply.content}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-center text-white/70">
                  Be the first to comment on this asset!
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Art;
