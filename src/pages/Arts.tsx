import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Component } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { loadAssets } from "../redux/modules/assets";
import ArtCard from "../components/Arts/ArtCard";
import { IAsset } from "../interfaces";

// Sample categories for game art assets
const categories = [
  "Unity",
  "Blender",
  "Krita",
  "Pixel Art",
  "Aseprite",
  "Photoshop",
  "Unreal Engine",
  "Maya",
  "Illustrator",
  "Substance 3D Modeler",
];

const Arts = () => {
  const { isLoading } = useAppSelector((state) => state.loading);
  const { Assets } = useAppSelector((state) => state.assets);
  const dispatch = useAppDispatch();

  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    dispatch(loadAssets({ tags: activeTab }));
  }, [activeTab, dispatch]);

  const scrollToTop = () => {
    const main = document.getElementById("main-elem");

    if (main) {
      main.scrollTop = 0;
    }
  };

  return (
    <main className="w-full overflow-y-auto p-10">
      <div className="flex flex-col gap-y-5">
        <header className="mb-5 flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            Share Your Game Assets With The World!
          </h1>
          <Link
            to={`${window.location.pathname}/publish`}
            className="hover:bg-primary focus:bg-primary/75 ml-5 flex cursor-pointer items-center gap-x-2 rounded-lg bg-gray-100 px-4 py-2 text-sm font-bold text-nowrap text-black duration-50 focus:translate-y-0.5"
            onClick={scrollToTop}
          >
            Add Your Asset <Component size={20} />
          </Link>
        </header>

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

        {/* Categories tabs */}
        <div className="scrollbar-hide mb-4 flex flex-wrap justify-center overflow-x-auto border-b border-white/10 pb-0">
          <button
            className={`flex-1 px-4 py-2 whitespace-nowrap ${
              activeTab === ""
                ? "text-primary border-primary border-b-2 font-bold"
                : "text-white/70 hover:text-white"
            }`}
            onClick={() => setActiveTab("")}
          >
            All
          </button>

          {categories.map((category) => (
            <button
              key={category}
              className={`flex-1 px-4 py-2 whitespace-nowrap ${
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
        {isLoading ? (
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
              <span>Loading Assets...</span>
            </div>
          </div>
        ) : (
          <>
            {Assets.length > 0 ? (
              <div className="grid-games grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {Assets.map((art: IAsset) => (
                  // <Link
                  //   to={`/arts/${art.id}`}
                  //   key={art.id}
                  //   className="group"
                  //   onClick={scrollToTop}
                  // >
                  <ArtCard key={art.id} asset={art} />
                  // </Link>
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

            {/* {Assets.length > 0 && (
              <div className="my-10 flex justify-center">
                <button
                  className="hover:border-primary/50 rounded-lg border border-white/10 bg-white/5 px-6 py-2"
                  // onClick={() => setArts((prev) => [...prev, ...prev])}
                >
                  Load More
                </button>
              </div>
            )} */}
          </>
        )}
      </div>
    </main>
  );
};

export default Arts;
