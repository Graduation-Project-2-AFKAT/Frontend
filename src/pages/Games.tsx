import { useState, useEffect } from "react";
import GameCard from "../components/GameCard";
import Tabs from "../components/Tabs";
import { Link } from "react-router";
import { Gamepad } from "lucide-react";

const Games = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

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

  //TODO refetch data depending on selected tags
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
        className={`sticky top-0 z-2 flex items-center justify-between bg-[#2E2B35] px-10 py-6 transition-transform duration-300 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
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
          {tags.map((tag) => (
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

        <ul
          className="games-grid mb-25 grid space-y-6 px-10 md:px-0"
          style={
            {
              // gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            }
          }
        >
          <GameCard username="user1" />
          <GameCard username="user2" />
          <GameCard username="user3" />
          <GameCard username="user4" />
          <GameCard username="user5" />
          <GameCard username="user6" />
          <GameCard username="user7" />
          <GameCard username="user8" />
          <GameCard username="user9" />
          <GameCard username="user10" />
        </ul>

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
