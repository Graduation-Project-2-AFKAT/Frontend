import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Sample categories for game art assets
const categories = [
  "3D Models",
  "Characters",
  "Environments",
  "Props",
  "Textures",
  "UI/UX",
  "Concept Art",
  "Animation",
];

// Sample filter options
const filters = {
  license: ["Free", "Paid", "CC Attribution", "CC Commercial"],
  style: [
    "Realistic",
    "Stylized",
    "Low Poly",
    "Pixel Art",
    "Hand-painted",
    "Vector",
  ],
  fileFormat: ["FBX", "OBJ", "GLTF", "PNG", "PSD", "Blender"],
};

// Sample arts data
const sampleArts = [
  {
    id: 1,
    title: "Fantasy Character Pack",
    thumbnail:
      "https://cdna.artstation.com/p/assets/images/images/032/208/232/large/livia-prima-02-mov.jpg",
    author: "GameArtist123",
    category: "Characters",
    license: "Paid",
    style: "Stylized",
    fileFormat: "FBX",
    likes: 325,
    downloads: 1200,
    price: "$24.99",
  },
  {
    id: 2,
    title: "Sci-Fi Environment Kit",
    thumbnail:
      "https://cdnb.artstation.com/p/assets/images/images/023/198/393/large/pablo-munoz-gomez-sci-fi-corridor-01.jpg",
    author: "EnviroDesigner",
    category: "Environments",
    license: "Free",
    style: "Realistic",
    fileFormat: "GLTF",
    likes: 512,
    downloads: 3100,
    price: "Free",
  },
  {
    id: 3,
    title: "Low Poly Tree Collection",
    thumbnail:
      "https://cdna.artstation.com/p/assets/images/images/021/724/665/large/sebastian-luca-asset-render.jpg",
    author: "3DModelMaster",
    category: "Props",
    license: "CC Attribution",
    style: "Low Poly",
    fileFormat: "OBJ",
    likes: 189,
    downloads: 876,
    price: "Free",
  },
  {
    id: 4,
    title: "UI Kit for Fantasy RPG",
    thumbnail:
      "https://cdna.artstation.com/p/assets/images/images/029/089/277/large/ezgi-cubuk-ui-fantasy.jpg",
    author: "UIDesignerPro",
    category: "UI/UX",
    license: "Paid",
    style: "Hand-painted",
    fileFormat: "PSD",
    likes: 212,
    downloads: 780,
    price: "$19.99",
  },
  {
    id: 5,
    title: "Animated Character Rig",
    thumbnail:
      "https://cdnb.artstation.com/p/assets/images/images/018/019/060/large/simon-kratz-frontsmall.jpg",
    author: "AnimationWizard",
    category: "Animation",
    license: "Paid",
    style: "Stylized",
    fileFormat: "FBX",
    likes: 301,
    downloads: 547,
    price: "$34.99",
  },
  {
    id: 6,
    title: "Rock and Cliff Set",
    thumbnail:
      "https://cdnb.artstation.com/p/assets/images/images/016/098/329/large/simon-jones-rocks01.jpg",
    author: "TerrainCreator",
    category: "Props",
    license: "CC Commercial",
    style: "Realistic",
    fileFormat: "OBJ",
    likes: 97,
    downloads: 432,
    price: "$12.99",
  },
];

interface IArtAsset {
  id: number;
  title: string;
  thumbnail: string;
  author: string;
  category: string;
  license: string;
  style: string;
  fileFormat: string;
  likes: number;
  downloads: number;
  price: string;
}

const Arts = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [loading, setLoading] = useState(true);
  const [arts, setArts] = useState<IArtAsset[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [openFilter, setOpenFilter] = useState<string | null>(null);

  useEffect(() => {
    // Simulate loading data
    const loadData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setArts(sampleArts);
      setLoading(false);
    };

    loadData();
  }, []);

  const filteredArts = arts.filter((art) => {
    // Filter by category tab
    if (activeTab !== "All" && art.category !== activeTab) return false;

    // Filter by search term
    if (
      searchTerm &&
      !art.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !art.author.toLowerCase().includes(searchTerm.toLowerCase())
    )
      return false;

    return true;
  });

  const toggleFilter = (filterName: string) => {
    if (openFilter === filterName) {
      setOpenFilter(null);
    } else {
      setOpenFilter(filterName);
    }
  };

  const scrollToTop = () => {
    const main = document.getElementById("main-elem");

    if (main) {
      console.log(main);
      main.scrollTop = 0;
    }
  };

  return (
    <div className="mx-auto w-full max-w-7xl p-10">
      <div className="flex flex-col gap-y-5">
        {/* Hero section */}
        <div className="relative mb-6 h-64 overflow-hidden rounded-xl">
          <div className="from-primary/40 absolute inset-0 bg-gradient-to-r to-transparent" />
          <img
            src="https://public-files.gumroad.com/qimqu2aabl8dktpniiuzjx2ka7uu"
            alt="Game Art Banner"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col justify-center pl-12">
            <h1 className="mb-2 text-4xl font-bold">Game Art Gallery</h1>
            <p className="max-w-md text-lg text-white/80">
              Discover and download high-quality game assets, 3D models, and
              designs for your projects
            </p>
          </div>
        </div>

        {/* Search and filters */}
        <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row">
          <div className="relative max-w-xl flex-grow">
            <input
              type="text"
              className="w-full rounded-lg border border-white/10 bg-white/5 p-3 pl-10 text-white placeholder-white/50 transition-colors outline-none focus:border-teal-400"
              placeholder="Search for assets, 3D models, or creators..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-white/50"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <div className="flex flex-wrap gap-2">
            {Object.entries(filters).map(([filterName, options]) => (
              <div key={filterName} className="relative">
                <button
                  onClick={() => toggleFilter(filterName)}
                  className="flex items-center gap-2 rounded border border-white/10 bg-white/5 px-4 py-2 hover:border-teal-400/50"
                >
                  <span>
                    {filterName.charAt(0).toUpperCase() + filterName.slice(1)}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 transition-transform ${openFilter === filterName ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {openFilter === filterName && (
                  <div className="absolute z-10 mt-1 w-48 rounded-md border border-white/10 bg-[#2A2731] shadow-lg">
                    <div className="py-1">
                      {options.map((option) => (
                        <button
                          key={option}
                          className="block w-full px-4 py-2 text-left text-sm hover:bg-white/5"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            <button className="rounded border border-teal-400 px-4 py-2 text-teal-400 hover:bg-teal-400/10">
              Reset Filters
            </button>
          </div>
        </div>

        {/* Categories tabs */}
        <div className="scrollbar-hide mb-4 flex overflow-x-auto border-b border-white/10 pb-2">
          <button
            className={`px-4 py-2 whitespace-nowrap ${
              activeTab === "All"
                ? "text-primary border-primary border-b-2 font-bold"
                : "text-white/70 hover:text-white"
            }`}
            onClick={() => setActiveTab("All")}
          >
            All
          </button>

          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 whitespace-nowrap ${
                activeTab === category
                  ? "text-primary border-primary border-b-2 font-bold"
                  : "text-white/70 hover:text-white"
              }`}
              onClick={() => setActiveTab(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery grid */}
        {loading ? (
          <div className="flex h-64 items-center justify-center">
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
              <span>Loading assets...</span>
            </div>
          </div>
        ) : (
          <>
            {filteredArts.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredArts.map((art) => (
                  <Link
                    to={`/arts/${art.id}`}
                    key={art.id}
                    className="group"
                    onClick={scrollToTop}
                  >
                    <div className="overflow-hidden rounded-lg border border-white/10 bg-[#2A2731] transition-all hover:border-teal-400/50 hover:shadow-lg hover:shadow-teal-400/10">
                      <div className="relative aspect-video overflow-hidden">
                        <img
                          src={
                            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkSL6vYmSxSPtTHB-iOoF5X6YSq92kuRGENA&s"
                          }
                          alt={art.title}
                          className="h-full w-full object-cover transition-transform group-hover:scale-105"
                        />
                        <div className="absolute top-2 right-2 rounded bg-[#121015]/80 px-3 py-1 text-sm">
                          {art.price}
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="group-hover:text-primary text-lg font-bold transition-colors">
                          {art.title}
                        </h3>
                        <div className="mt-2 flex items-center text-sm text-white/70">
                          <span>by {art.author}</span>
                          <span className="mx-2">•</span>
                          <span>{art.category}</span>
                        </div>
                        <div className="mt-4 flex items-center justify-between text-sm">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="mr-1 h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                />
                              </svg>
                              {art.likes}
                            </span>
                            <span className="flex items-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="mr-1 h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                />
                              </svg>
                              {art.downloads}
                            </span>
                          </div>
                          <span className="rounded bg-white/10 px-2 py-1 text-xs">
                            {art.fileFormat}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="flex h-64 flex-col items-center justify-center text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mb-4 h-16 w-16 text-white/30"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="text-xl font-bold">No results found</h3>
                <p className="mt-2 max-w-md text-white/70">
                  We couldn't find any assets matching your search. Try using
                  different keywords or filters.
                </p>
              </div>
            )}

            {filteredArts.length > 0 && (
              <div className="my-10 flex justify-center">
                <button
                  className="rounded-lg border border-white/10 bg-white/5 px-6 py-2 hover:border-teal-400/50"
                  onClick={() => setArts((prev) => [...prev, ...prev])}
                >
                  Load More
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Arts;
