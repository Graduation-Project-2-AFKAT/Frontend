import { Boxes, Gamepad2 } from "lucide-react";
import { useEffect, useState } from "react";

interface IProps {
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  expandSidebar: boolean;
  setExpandSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar = ({
  showSidebar,
  setShowSidebar,
  expandSidebar,
  setExpandSidebar,
}: IProps) => {
  const [selectedTab, setSelectedTab] = useState("home");
  const [select, setSelect] = useState({
    //TODO change first true to be the one which match the current page
    home: false,
    games: false,
    assets: false,
    gameJams: false,
    create: false,
    language: false,
    settings: false,
  });

  useEffect(() => {
    if (!expandSidebar) {
      setSelectedTab("");
    }
  }, [expandSidebar]);

  const handleClick = (tab: keyof typeof select) => {
    if (selectedTab === tab) {
      if (expandSidebar) {
        setExpandSidebar(false);
        setSelect((prev) => {
          return { ...prev, [tab]: false };
        });
      } else {
        setExpandSidebar(true);
        setSelect((prev) => {
          return { ...prev, [tab]: true };
        });
      }

      if (window.innerWidth <= 767) {
        setShowSidebar(false);
      }
      return;
    }

    const newSelected = {
      ...select,
      [tab]: true,
    };

    setSelect(newSelected);
    setSelectedTab(tab);
    setExpandSidebar(true);
  };

  return (
    <>
      <div
        className={`${expandSidebar ? "fixed" : "hidden"} inset-0 z-5 bg-black/50 transition-all`}
        onClick={() => {
          //TODO create a function to handle this
          if (expandSidebar) {
            setExpandSidebar(false);

            setSelect((prev) => {
              return {
                ...prev,
                [selectedTab]: false,
              };
            });
          }

          if (window.innerWidth <= 767) {
            setExpandSidebar(false);
            setShowSidebar(false);
          }
        }}
      />

      <div
        className={`absolute ${expandSidebar ? "md:left-20" : "md:-left-60"} ${showSidebar ? "left-20" : "-left-80"} border-r-primary top-0 z-10 h-full w-80 border-r-2 bg-[#2A2731] py-15 pt-30 pl-10 backdrop-blur-[2px] duration-300`}
      >
        <h1>Hi {selectedTab}</h1>
      </div>

      <aside
        className={`group fixed top-0 ${showSidebar ? "-left-0" : "-left-22"} z-10 flex h-screen flex-col items-center justify-between bg-[#121015] px-0 py-20 text-2xl transition-all md:pb-8`}
      >
        <div
          className={`md:space-y- relative space-y-5 rounded-lg p-4 whitespace-nowrap transition-colors ease-in`}
        >
          <div
            className={`${selectedTab === "home" ? "text-primary" : ""} group tooltips relative flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-[#292929] before:font-medium before:content-['Home']`}
            onClick={() => handleClick("home")}
          >
            <i className="fa-solid fa-house" />
          </div>
          <div
            className={`${selectedTab === "games" ? "text-primary" : ""} group tooltips relative flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-[#292929] before:font-medium before:content-['Games']`}
            onClick={() => handleClick("games")}
          >
            <Gamepad2 size={25} />
          </div>
          <div
            className={`${selectedTab === "assets" ? "text-primary" : ""} group tooltips relative flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-[#292929] before:font-medium before:content-['Assets']`}
            onClick={() => handleClick("assets")}
          >
            <Boxes size={25} />
          </div>
          <div
            className={`${selectedTab === "gameJams" ? "text-primary" : ""} group tooltips relative flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-[#292929] before:font-medium before:content-['Game_Jams']`}
            onClick={() => handleClick("gameJams")}
          >
            <i className="fa-solid fa-award" />
          </div>
          <hr className="mx-2 opacity-25" />
          <div
            className={`${selectedTab === "create" ? "text-primary" : ""} group tooltips relative flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-[#292929] before:font-medium before:content-['Create_a_community']`}
            onClick={() => handleClick("create")}
          >
            <i className="fa-solid fa-plus" />
          </div>
        </div>

        <div className="-mx-8 flex w-full flex-col items-center space-y-6 text-center whitespace-nowrap transition-colors ease-in lg:mx-0 lg:w-fit">
          <div
            className={`${selectedTab === "language" ? "text-primary" : ""} tooltips w-10 cursor-pointer before:font-medium before:content-['Language']`}
            onClick={() => handleClick("language")}
          >
            <i className="fa-solid fa-earth-americas" />
          </div>

          <div
            className={`${selectedTab === "settings" ? "text-primary" : ""} tooltips w-10 cursor-pointer before:font-medium before:content-['Settings']`}
            onClick={() => handleClick("settings")}
          >
            <i className="fa-solid fa-gear" />
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
