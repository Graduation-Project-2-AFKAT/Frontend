import { lazy, Suspense, useState } from "react";
const Posts = lazy(() => import("../Posts"));

interface IProps {
  defaultTab: "Posts" | "Likes" | "Draft Posts" | "Scheduled Posts";
  tabs: ("Posts" | "Likes" | "Draft Posts" | "Scheduled Posts")[];
}

interface ITab {
  tab: "Posts" | "Likes" | "Draft Posts" | "Scheduled Posts";
  title: string;
  selectedTab: "Posts" | "Likes" | "Draft Posts" | "Scheduled Posts";
  handleTabClick: (
    tab: "Posts" | "Likes" | "Draft Posts" | "Scheduled Posts",
  ) => void;
}

const Tabs = ({ defaultTab, tabs }: IProps) => {
  const [profileSelectedTab, setProfileSelectedTab] = useState(defaultTab);

  function handleTabClick(
    tab: "Posts" | "Likes" | "Draft Posts" | "Scheduled Posts",
  ) {
    setProfileSelectedTab(tab);
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

      <div className="mt-8 px-2">
        {profileSelectedTab === "Posts" ? (
          <Suspense
            fallback={
              <div className="flex h-full flex-col items-center py-10 text-xl font-light">
                You haven't anything yet.
              </div>
            }
          >
            <Posts />
          </Suspense>
        ) : (
          <div>No Results Found</div>
        )}
      </div>
    </>
  );
};

const Tab = ({ tab, title, selectedTab, handleTabClick }: ITab) => {
  return (
    <li
      className={`relative z-1 cursor-pointer rounded-t-lg border border-white ${
        selectedTab === tab ? "border-b-transparent bg-[#23202A]" : ""
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

export default Tabs;
