import { useState, useEffect } from "react";
import Input from "../components/form/Input";
import Post from "../components/Post";
import GameCard from "../components/GameCard";
import Tabs from "../components/Tabs";

const GameJams = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const main = document.querySelector("main") as HTMLDivElement;

    const handleScroll = () => {
      const currentScrollY = main.scrollTop;
      console.log(currentScrollY);

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
        className={`sticky top-0 z-10 flex items-center justify-between bg-[#2E2B35] py-6 transition-transform duration-300 lg:px-10 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <p>Share Your Games With The World!</p>
        <button className="hover:bg-primary cursor-pointer rounded-lg bg-gray-100 px-4 py-2 text-sm font-bold text-black duration-50 hover:text-white">
          Add Your Game
        </button>
      </header>

      <div className="flex flex-col space-y-10 py-10 text-center font-bold lg:px-10">
        <span className="text-3xl">Browse Games</span>
        <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5 px-5">
          {/* //TODO make selected "text-primary" */}
          <li className="hover:border-primary flex h-8 w-fit items-center justify-center rounded-full border bg-white/5 px-5 duration-150 hover:cursor-pointer">
            Action
          </li>
          <li className="hover:border-primary flex h-8 w-fit items-center justify-center rounded-full border bg-white/5 px-5 duration-150 hover:cursor-pointer">
            Horror
          </li>
          <li className="hover:border-primary flex h-8 w-fit items-center justify-center rounded-full border bg-white/5 px-5 duration-150 hover:cursor-pointer">
            Puzzle
          </li>
          <li className="hover:border-primary flex h-8 w-fit items-center justify-center rounded-full border bg-white/5 px-5 duration-150 hover:cursor-pointer">
            Cards
          </li>
          <li className="hover:border-primary flex h-8 w-fit items-center justify-center rounded-full border bg-white/5 px-5 duration-150 hover:cursor-pointer">
            Adventure
          </li>
          <li className="hover:border-primary flex h-8 w-fit items-center justify-center rounded-full border bg-white/5 px-5 duration-150 hover:cursor-pointer">
            RPG
          </li>
          <li className="hover:border-primary flex h-8 w-fit items-center justify-center rounded-full border bg-white/5 px-5 duration-150 hover:cursor-pointer">
            Shooting
          </li>
          <li className="hover:border-primary flex h-8 w-fit items-center justify-center rounded-full border bg-white/5 px-5 duration-150 hover:cursor-pointer">
            Arcade
          </li>
          <li className="hover:border-primary flex h-8 w-fit items-center justify-center rounded-full border bg-white/5 px-5 duration-150 hover:cursor-pointer">
            Survival
          </li>
        </ul>
      </div>

      <section className="col-span-2 space-y-6 scroll-smooth md:mx-auto md:w-[85%] lg:w-full lg:px-10">
        <div className="lg:border-primary*-* flex flex-col space-y-10 border shadow-md drop-shadow-md md:rounded-lg">
          {/* <Carousel
            arrows={true}
            // autoPlay
            // autoPlaySpeed={5000}
            centerMode={false}
            className=""
            draggable
            infinite
            keyBoardControl
            pauseOnHover
            renderArrowsWhenDisabled={true}
            renderButtonGroupOutside={false}
            renderDotsOutside={true}
            responsive={{
              desktop: {
                breakpoint: {
                  max: 3000,
                  min: 1024,
                },
                items: 2,
                partialVisibilityGutter: 30,
              },
              mobile: {
                breakpoint: {
                  max: 464,
                  min: 0,
                },
                items: 1,
                partialVisibilityGutter: 30,
              },
              tablet: {
                breakpoint: {
                  max: 1024,
                  min: 464,
                },
                items: 2,
                partialVisibilityGutter: 30,
              },
            }}
            rewind={false}
            rewindWithAnimation={false}
            rtl={false}
            shouldResetAutoplay
            showDots={true}
            sliderClass=""
            slidesToSlide={1}
          >
            <GameCard username="user1" />
            <GameCard username="user2" />
            <GameCard username="user3" />
            <GameCard username="user4" />
            <GameCard username="user5" />
          </Carousel> */}
        </div>

        {/* sub-tabs */}
        <Tabs
          defaultTab="Featured"
          tabs={["Featured", "Newest", "Top Rated"]}
        />

        <ul
          className="grid-games mb-25 grid space-y-6 px-10 md:px-0"
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

export default GameJams;
