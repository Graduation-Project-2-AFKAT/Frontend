import { useState, useEffect } from "react";
import GameCard from "../components/GameCard";
import Tabs from "../components/Tabs";
import { Link } from "react-router";
import { Gamepad } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { loadGames } from "../redux/modules/games";

const Games = () => {
  const { isLoading } = useAppSelector((state) => state.loading);
  const { Games } = useAppSelector((state) => state.games);
  const dispatch = useAppDispatch();

  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    dispatch(loadGames());
  }, [dispatch]);

  const tags = [
    "Action",
    "Horror",
    "Puzzle",
    "Cards",
    "Adventure",
    "RPG",
    "Shooting",
    "Arcade",
    "Survival",
  ];

  const handleTagToggle = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];

    setSelectedTags(newTags);
  };

  //TODO refetch data whenever selectedTags change
  useEffect(() => {
    // let tagsParams = "";
    // if (selectedTags.length > 0) {
    //   tagsParams += "?tag=";
    // }
    //
    // tagsParams += selectedTags.join("&tag=");
    // console.log(window.location.origin + window.location.pathname + tagsParams);
  }, [selectedTags]);

  useEffect(() => {
    const main = document.querySelector("main") as HTMLDivElement;

    const handleScroll = () => {
      const currentScrollY = main.scrollTop;

      if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    main.addEventListener("scroll", handleScroll, { passive: true });

    return () => main.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <main className="w-full overflow-y-auto pt-0 lg:gap-10">
      <header
        className={`border-b-primary sticky top-0 z-2 flex items-center justify-between border-b-2 bg-black/50 px-10 py-6 backdrop-blur-3xl transition-transform duration-300 ${
          isVisible ? "translate-y-0" : "-translate-y-[110%]"
        }`}
      >
        <p>Share Your Games With The World!</p>
        <Link
          to={`${window.location.pathname}/publish`}
          className="hover:bg-primary focus:bg-primary/75 flex cursor-pointer items-center gap-x-2 rounded-lg bg-gray-100 px-4 py-2 text-sm font-bold text-black duration-50 focus:translate-y-0.5"
        >
          Add Your Game <Gamepad size={25} />
        </Link>
      </header>

      <div className="flex flex-col space-y-10 py-10 text-center font-bold lg:px-10">
        <span className="text-3xl">Browse Games</span>
        <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5 px-5">
          {/* //TODO make selected "text-primary" */}
          {tags.length > 0 &&
            tags.map((tag) => (
              <button
                key={tag}
                // href={
                //   window.location.origin +
                //   window.location.pathname +
                //   `?tag=${tag}`
                // }
                className={`rounded-full px-4 py-1 text-sm transition-colors ${
                  selectedTags.includes(tag)
                    ? "bg-primary border-primary border text-black"
                    : "border border-white/30 bg-white/5 hover:border-teal-400/50"
                }`}
                onClick={() => {
                  handleTagToggle(tag);
                }}
              >
                {tag}
              </button>
            ))}
        </ul>
      </div>

      <section className="col-span-2 space-y-6 scroll-smooth md:mx-auto md:w-[85%] lg:w-full lg:px-10">
        <div className="flex flex-col space-y-10 border-b border-white/20 shadow-md drop-shadow-md md:rounded-lg"></div>

        {/* sub-tabs */}
        <Tabs
          defaultTab="Featured"
          tabs={["Featured", "Newest", "Top Rated"]}
        />

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
              <span>Loading assets...</span>
            </div>
          </div>
        ) : (
          <ul className="grid-games mb-25 grid space-y-6 px-10 md:px-0">
            {Games.map((game) => {
              return <GameCard key={game.id} game={game} />;
            })}
          </ul>
        )}

        {/* <div className="absolute bottom-10 h-10 w-135 shadow-[inset_0_-20px_20px_-20px_rgba(0,0,0,0.5)]"></div> */}
      </section>

      {/* <Board
        title="Leaderboard"
        className="h-fit border lg:hidden xl:flex"
        itemsCount={3}
      /> */}
    </main>
  );
};

export default Games;
