import { Gamepad } from "lucide-react";
import { useDebugValue, useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import GameCard from "../components/GameCard";
import GamesTabs from "../components/games/GamesTabs";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { loadGames } from "../redux/modules/games";
import { IGame } from "../interfaces";

const Games = () => {
  const { isLoading } = useAppSelector((state) => state.loading);
  const { Games } = useAppSelector((state) => state.games);
  const dispatch = useAppDispatch();

  const [gamesToShow, setGamesToShow] = useState<IGame[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  useDebugValue(selectedTags ? "Online" : "Offline");

  const tags = [
    "Action",
    "Adventure",
    "RPG",
    "Strategy",
    "Simulation",
    "Sports",
    "Puzzle",
    "Racing",
    "Fighting",
    "Shooter",
    "Horror",
    "Cards Game",
    "Educational",
  ];

  useEffect(() => {
    const tags = selectedTags.join("&tag=");

    dispatch(loadGames(tags));
  }, [selectedTags, dispatch]);

  useEffect(() => {
    if (Games) {
      setGamesToShow(Games);
    }
  }, [Games]);

  const handleTagToggle = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];

    setSelectedTags(newTags);
  };

  const tabs = useMemo(() => {
    return ["Featured", "Newest", "Top Rated"] as (
      | "Featured"
      | "Newest"
      | "Top Rated"
    )[];
  }, []);

  return (
    <main className="w-full overflow-y-auto pt-0 lg:gap-10">
      <header className="border-b-primary bg-neutral/5 flex items-center justify-between border-b-2 px-10 py-6">
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
        <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-5 px-15 lg:px-0">
          {/* //TODO make selected "text-primary" */}
          {tags.length > 0 &&
            tags.map((tag) => (
              <li
                key={tag}
                className={`rounded-full px-4 py-1 text-sm transition-colors hover:cursor-pointer ${
                  selectedTags.includes(tag)
                    ? "bg-primary border-primary text-base-200 border"
                    : "hover:border-primary bg-primary-content/5 border-primary-content/30 border"
                }`}
                onClick={() => {
                  handleTagToggle(tag);
                }}
              >
                <button
                // href={
                //   window.location.origin +
                //   window.location.pathname +
                //   `?tag=${tag}`
                // }
                >
                  {tag}
                </button>
              </li>
            ))}
        </ul>
      </div>

      <section className="col-span-2 space-y-6 scroll-smooth md:mx-auto md:w-[85%] lg:w-full lg:px-10">
        <div className="border-b border-white/10" />
        <GamesTabs defaultTab="Featured" tabs={tabs} />

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
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span>Loading Games...</span>
            </div>
          </div>
        ) : (
          <ul className="grid-games my-10 grid gap-10 px-10 md:px-0">
            {gamesToShow.map((game) => {
              return <GameCard key={game.id} game={game} />;
            })}
          </ul>
        )}
      </section>
    </main>
  );
};

export default Games;
