import { Grid, Html, OrbitControls, Stage, useGLTF } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useAppSelector } from "../redux/hooks";

interface IProps {
  model_file: string | null;
}

const ModelCanvas = ({ model_file }: IProps) => {
  const { isLoading } = useAppSelector((state) => state.loading);

  const canvasContainerRef = useRef<HTMLDivElement>(null);

  const [wireframe, setWireframe] = useState(false);
  const [gridPosition, setGridPosition] = useState(-2);
  const [autoRotate, setAutoRotate] = useState(false);

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
              />
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

  return (
    <section className="mb-15 flex flex-col items-center">
      <div
        ref={canvasContainerRef}
        className="relative aspect-video w-full max-w-[68rem] self-center overflow-hidden rounded-xl border border-white/10 bg-[#16141C]"
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
            <Stage intensity={5} adjustCamera={false}>
              <ambientLight intensity={0.3} />
              <directionalLight
                position={[10, 10, 5]}
                intensity={0.5}
                castShadow
              />
              <directionalLight position={[-50, -50, -50]} intensity={0.3} />
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
  );
};

export default ModelCanvas;
