import { useState } from "react";

interface IProps {
  defaultTab: string;
  tabs: string[];
}

interface ITab {
  tab: string;
  title: string;
  selectedTab: string;
  handleTabClick: (tab: string) => void;
}

const Tabs = ({ defaultTab, tabs }: IProps) => {
  const [profileSelectedTab, setProfileSelectedTab] = useState(defaultTab);

  function handleTabClick(tab: string) {
    setProfileSelectedTab(tab);
  }

  return (
    <ul className="relative mt-10 flex items-center space-x-3 px-6 text-sm font-bold before:absolute before:bottom-0 before:left-0 before:w-full before:border-b before:border-white">
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
      {/* <Tab
        tab="featured"
        title="Featured"
        selectedTab={profileSelectedTab}
        handleTabClick={handleTabClick}
      />
      <Tab
        tab="newest"
        title="Newest"
        selectedTab={profileSelectedTab}
        handleTabClick={handleTabClick}
      />
      <Tab
        tab="top rated"
        title="Top Rated"
        selectedTab={profileSelectedTab}
        handleTabClick={handleTabClick}
      />
      <Tab
        tab="ftp"
        title="Free to Play"
        selectedTab={profileSelectedTab}
        handleTabClick={handleTabClick}
      /> */}
    </ul>
  );
};

const Tab = ({ tab, title, selectedTab, handleTabClick }: ITab) => {
  return (
    <li
      className={`relative z-1 cursor-pointer rounded-t-lg border border-white ${
        selectedTab === tab ? "border-b-transparent bg-[#23202A]" : ""
      } px-4 py-2`}
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
