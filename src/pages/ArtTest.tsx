import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Download, Heart, Share2, Flag } from "lucide-react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

interface IArtAsset {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  modelUrl: string;
  fileFormat: string;
  category: string;
  price: string;
  author: {
    name: string;
    avatar: string;
    username: string;
  };
  likes: number;
  downloads: number;
  date: string;
  tags: string[];
  license: string;
}

const ArtTest = () => {
  const { id } = useParams<{ id: string }>();
  const [art, setArt] = useState<IArtAsset | null>(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [activeTab, setActiveTab] = useState<"details" | "comments">("details");
  const [isModelLoading, setIsModelLoading] = useState(true);
  const modelContainerRef = useRef<HTMLDivElement>(null);

  // Sample data - in a real app, you'd fetch this from your API
  useEffect(() => {
    // Simulating API fetch
    setTimeout(() => {
      setArt({
        id: "1",
        title: "Sci-Fi Modular Environment Kit",
        description:
          "A high-quality modular sci-fi environment kit, perfect for game development. Includes various wall sections, floor tiles, props, and decorative elements that can be combined to create unique sci-fi interiors. All assets are optimized for real-time rendering with PBR textures.",
        thumbnail:
          "https://cdnb.artstation.com/p/assets/images/images/023/198/393/large/pablo-munoz-gomez-sci-fi-corridor-01.jpg",
        modelUrl:
          "https://threejs.org/examples/models/gltf/DamagedHelmet/glTF/DamagedHelmet.gltf", // Three.js sample model
        fileFormat: "GLTF",
        category: "Environments",
        price: "$24.99",
        author: {
          name: "Pablo Gomez",
          avatar: "https://randomuser.me/api/portraits/men/32.jpg",
          username: "environment_designer",
        },
        likes: 521,
        downloads: 789,
        date: "2024-03-15",
        tags: [
          "sci-fi",
          "modular",
          "environment",
          "PBR",
          "space",
          "futuristic",
        ],
        license: "Standard Commercial License",
      });
      setLoading(false);
    }, 800);
  }, [id]);

  // Initialize Three.js scene for 3D model viewer
  useEffect(() => {
    if (!art || !modelContainerRef.current) return;

    // Setup Three.js scene
    const container = modelContainerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Create scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x121015);

    // Camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 2;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    container.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Load the model
    setIsModelLoading(true);
    const loader = new GLTFLoader();
    loader.load(
      art.modelUrl,
      (gltf) => {
        // Center the model
        const box = new THREE.Box3().setFromObject(gltf.scene);
        const center = box.getCenter(new THREE.Vector3());
        gltf.scene.position.x -= center.x;
        gltf.scene.position.y -= center.y;
        gltf.scene.position.z -= center.z;

        // Scale the model to fit the view
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 2 / maxDim;
        gltf.scene.scale.set(scale, scale, scale);

        scene.add(gltf.scene);
        setIsModelLoading(false);
      },
      (xhr) => {
        // Loading progress
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      (error) => {
        console.error("Error loading model:", error);
        setIsModelLoading(false);
      },
    );

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      container.removeChild(renderer.domElement);

      // Dispose of scene contents
      while (scene.children.length > 0) {
        const object = scene.children[0];
        scene.remove(object);
        if (object instanceof THREE.Mesh) {
          if (object.geometry) object.geometry.dispose();
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach((material) => material.dispose());
            } else {
              object.material.dispose();
            }
          }
        }
      }

      renderer.dispose();
    };
  }, [art]);

  const handleDownload = () => {
    // In a real app, this would trigger the download or purchase flow
    console.log("Download requested for:", art?.title);
    alert("Download started for " + art?.title);
  };

  const handleLike = () => {
    setLiked(!liked);
  };

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
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
          <span>Loading asset...</span>
        </div>
      </div>
    );
  }

  if (!art) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold">Asset Not Found</h2>
          <p className="mb-6 text-white/70">
            The asset you're looking for doesn't exist or has been removed.
          </p>
          <a
            href="/arts"
            className="bg-primary rounded px-6 py-2 font-medium text-black"
          >
            Back to Gallery
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8">
      <div className="flex flex-col gap-8">
        {/* Title and Author Section */}
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold">{art.title}</h1>
            <div className="mt-2 flex items-center">
              <img
                src={art.author.avatar}
                alt={art.author.name}
                className="mr-2 h-8 w-8 rounded-full"
              />
              <span className="text-white/70">by </span>
              <a
                href={`/profile/${art.author.username}`}
                className="hover:text-primary ml-1"
              >
                {art.author.name}
              </a>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              className="bg-primary flex items-center gap-2 rounded px-6 py-2 font-medium text-black"
              onClick={handleDownload}
            >
              <Download size={18} />
              {art.price === "Free" ? "Download" : "Purchase"}
            </button>

            <button
              className={`rounded border px-3 py-2 ${liked ? "border-primary text-primary" : "border-white/20 hover:border-white/50"}`}
              onClick={handleLike}
            >
              <Heart size={20} className={liked ? "fill-primary" : ""} />
            </button>

            <button className="rounded border border-white/20 px-3 py-2 hover:border-white/50">
              <Share2 size={20} />
            </button>
          </div>
        </div>

        {/* 3D Model Viewer */}
        <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[#16141C]">
          <div
            ref={modelContainerRef}
            className="aspect-video w-full"
            style={{ minHeight: "500px" }}
          >
            {isModelLoading && (
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
                  <span>Loading 3D model...</span>
                </div>
              </div>
            )}
          </div>

          <div className="absolute bottom-4 left-4 rounded bg-black/50 px-3 py-1 text-sm backdrop-blur-sm">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-green-500"></span>
              Interactive 3D Model - Click and drag to rotate
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-white/10">
          <div className="flex">
            <button
              className={`px-6 py-3 font-medium ${activeTab === "details" ? "border-primary text-primary border-b-2" : "text-white/70"}`}
              onClick={() => setActiveTab("details")}
            >
              Details
            </button>
            <button
              className={`px-6 py-3 font-medium ${activeTab === "comments" ? "border-primary text-primary border-b-2" : "text-white/70"}`}
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
                {art.description}
              </p>

              <div className="mb-8">
                <h3 className="mb-3 text-lg font-medium">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {art.tags.map((tag) => (
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
                  <span className="font-medium">{art.category}</span>
                </div>

                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-white/70">File Format</span>
                  <span className="font-medium">{art.fileFormat}</span>
                </div>

                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-white/70">License</span>
                  <span className="font-medium">{art.license}</span>
                </div>

                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-white/70">Likes</span>
                  <span className="font-medium">{art.likes}</span>
                </div>

                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-white/70">Downloads</span>
                  <span className="font-medium">{art.downloads}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-white/70">Published</span>
                  <span className="font-medium">
                    {new Date(art.date).toLocaleDateString()}
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
            <div className="mb-6 rounded-lg border border-white/10 bg-[#16141C] p-6">
              <h3 className="mb-4 font-medium">Leave a Comment</h3>
              <textarea
                rows={4}
                className="w-full rounded border border-white/10 bg-white/5 p-3 text-white placeholder-white/50 transition-colors outline-none focus:border-teal-400"
                placeholder="Share your thoughts about this asset..."
              ></textarea>
              <div className="mt-4 flex justify-end">
                <button className="bg-primary rounded px-6 py-2 font-medium text-black">
                  Post Comment
                </button>
              </div>
            </div>

            <div className="space-y-6">
              <p className="text-center text-white/70">
                Be the first to comment on this asset!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArtTest;
