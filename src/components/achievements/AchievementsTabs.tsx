import { lazy, memo, Suspense, useEffect, useState } from "react";
import { IAchievement } from "../../interfaces";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { loadPlayerAchievements } from "../../redux/modules/achievements";

const AchievementCard = lazy(() => import("./AchievementCard"));

interface IProps {
  defaultTab: "All" | "Latest" | "CS:GO";
  tabs: ("All" | "Latest" | "CS:GO")[];
}

interface ITab {
  tab: "All" | "Latest" | "CS:GO";
  title: string;
  selectedTab: "All" | "Latest" | "CS:GO";
  handleTabClick: (tab: "All" | "Latest" | "CS:GO") => void;
}

const AchievementsTabs = ({ defaultTab, tabs }: IProps) => {
  const { user } = useAppSelector((state) => state.users);
  const { Achievements } = useAppSelector((state) => state.achievements);

  const dispatch = useAppDispatch();

  const [achievementsToShow, setAchievementsToShow] = useState<IAchievement[]>(
    [],
  );
  const [selectedTab, setSelectedTab] = useState(defaultTab);

  useEffect(() => {
    if (user && Achievements.length === 0) {
      // TODO use user.id like: loadPlayerAchievements(user.id)
      dispatch(loadPlayerAchievements());
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // TODO fetch data depending on selectedTab
  // useEffect(() => {
  //   dispatch(loadPlayerAchievements(user.id));
  // }, [selectedTab]);

  function handleTabClick(tab: "All" | "Latest" | "CS:GO") {
    setSelectedTab(tab);
  }

  useEffect(() => {
    if (Achievements) {
      const sortedMock = [...Achievements].sort(
        (a, b) => Number(b.isCompleted) - Number(a.isCompleted),
      );

      setAchievementsToShow(sortedMock);
    }
  }, [Achievements]);

  return (
    <>
      <ul className="relative flex items-center justify-center space-x-3 px-6 text-sm font-bold">
        {tabs.map((tab) => {
          return (
            <Tab
              key={tab}
              tab={tab}
              title={tab}
              selectedTab={selectedTab}
              handleTabClick={handleTabClick}
            />
          );
        })}
      </ul>

      <div className="mt-10 text-center">
        {selectedTab === "All" ? (
          <Suspense
            fallback={
              <div className="flex h-full flex-col items-center py-10">
                <div className="border-t-primary mb-4 h-8 w-8 animate-spin rounded-full border-4 border-gray-300"></div>
                <p className="text-xl font-light">Loading achievements...</p>
              </div>
            }
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {achievementsToShow.map((achievement) => (
                <AchievementCard
                  key={achievement.id}
                  achievement={achievement}
                />
              ))}
            </div>
          </Suspense>
        ) : (
          <div className="pt-20 text-xl">There are no achievements yet.</div>
        )}
      </div>
    </>
  );
};

const Tab = ({ tab, title, selectedTab, handleTabClick }: ITab) => {
  return (
    <li
      className={`relative z-1 cursor-pointer rounded-lg border transition-all ${
        selectedTab === tab ? "border-primary scale-110" : ""
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

export default memo(AchievementsTabs);
