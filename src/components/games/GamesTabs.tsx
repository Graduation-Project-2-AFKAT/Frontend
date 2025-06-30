import { useState, memo } from "react";
import { IGame } from "../../interfaces";
import { useAppSelector } from "../../redux/hooks";

interface IProps {
  defaultTab: "Featured" | "Newest" | "Top Rated";
  tabs: ("Featured" | "Newest" | "Top Rated")[];
  gamesToShow: IGame[];
  filterGamesToShow: (filteredGames: IGame[]) => void;
}

interface ITab {
  tab: "Featured" | "Newest" | "Top Rated";
  title: string;
  selectedTab: "Featured" | "Newest" | "Top Rated";
  handleTabClick: (tab: "Featured" | "Newest" | "Top Rated") => void;
}

const GamesTabs = ({ defaultTab, tabs, filterGamesToShow }: IProps) => {
  const { Games } = useAppSelector((state) => state.games);
  const [profileSelectedTab, setProfileSelectedTab] = useState(defaultTab);

  function handleTabClick(tab: "Featured" | "Newest" | "Top Rated") {
    setProfileSelectedTab(tab);

    switch (tab) {
      case "Top Rated": {
        const filteredGames = [...Games].sort(
          (a, b) => (b.rating || 0) - (a.rating || 0),
        );
        filterGamesToShow(filteredGames);

        break;
      }
      case "Newest": {
        const filteredGames = [...Games].sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
        );
        filterGamesToShow(filteredGames);

        break;
      }
      case "Featured": {
        const filteredGames = Games.filter(
          (game: IGame) => game.user_rating !== null,
        );
        filterGamesToShow(filteredGames);

        break;
      }
      default: {
        filterGamesToShow(Games);
      }
    }
  }

  return (
    <>
      <ul className="relative flex items-center space-x-3 px-6 text-sm font-bold before:absolute before:bottom-0 before:left-0 before:w-full before:border-b before:border-white">
        {tabs.map((tab) => {
          return (
            <Tab
              key={tab}
              tab={tab}
              title={tab}
              selectedTab={profileSelectedTab}
              handleTabClick={handleTabClick}
            />
          );
        })}
      </ul>

      {/* <div className="mt-5">
        {profileSelectedTab === "Posts" ? (
          <Suspense
            fallback={
              <div className="flex h-full flex-col items-center py-10 text-xl font-light">
                You haven't anything yet.
              </div>
            }
          >
            <Posts type="mine" />
          </Suspense>
        ) : (
          <div>bye</div>
        )}
      </div> */}
    </>
  );
};

const Tab = ({ tab, title, selectedTab, handleTabClick }: ITab) => {
  return (
    <li
      className={`relative z-1 cursor-pointer rounded-t-lg border border-white ${
        selectedTab === tab ? "border-b-transparent bg-[#211E29]" : ""
      } px-5 py-2.5`}
      onClick={() => handleTabClick(tab)}
    >
      <span
        className={`${selectedTab === tab ? "text-primary" : ""} duration-150`}
      >
        {title}
      </span>
    </li>
  );
};

export default memo(GamesTabs);
