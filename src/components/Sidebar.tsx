import { useState } from "react";

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
    arts: false,
    gameJams: false,
    create: false,
    language: false,
    settings: false,
  });

  // const handleClick = (tab: keyof typeof select) => {
  //   if (selectedTab === tab) {
  //     if (expandSidebar) {
  //       setExpandSidebar(false);
  //     } else {
  //       setExpandSidebar(true);
  //     }

  //     if (window.innerWidth <= 1023) {
  //       setShowSidebar(false);
  //     }

  //     setSelect((prev) => {
  //       return { ...prev, [tab]: false };
  //     });

  //     return;
  //   }

  //   const newSelected = {
  //     ...select,
  //     [tab]: true,
  //   };

  //   setSelectedTab(tab);
  //   setSelect(newSelected);
  //   setExpandSidebar(true);
  // };

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
      home: false,
      games: false,
      arts: false,
      gameJams: false,
      create: false,
      language: false,
      settings: false,
      [tab]: true,
    };

    setSelectedTab(tab);
    setSelect(newSelected);
    setExpandSidebar(true);
  };

  return (
    <>
      <div
        className={`${expandSidebar ? "fixed" : "hidden"} inset-0 z-5 bg-black/50 duration-300`}
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
        className={`absolute ${expandSidebar ? "md:left-20" : "md:-left-59.5"} ${showSidebar ? "left-20" : "-left-80"} border-r-primary top-0 z-5 h-full w-80 border-r-2 bg-[#2A2731] py-15 pt-30 pl-10 backdrop-blur-[2px] duration-300`}
      >
        <h1>Hi {selectedTab}</h1>
      </div>

      <aside
        className={`group fixed top-0 ${showSidebar ? "-left-0" : "-left-22"} z-10 flex h-screen flex-col items-center justify-between bg-[#121015] px-0 py-20 text-2xl duration-300 md:pb-8`}
      >
        <div
          className={`md:space-y- relative space-y-5 rounded-lg p-4 whitespace-nowrap duration-300 ease-in`}
        >
          <div
            className="group tooltips relative flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-[#292929] before:content-['Home']"
            onClick={() => handleClick("home")}
          >
            <i className="fa-solid fa-house"></i>
          </div>
          <div
            className="group tooltips relative flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-[#292929] before:content-['Games']"
            onClick={() => handleClick("games")}
          >
            <i className="fa-solid fa-gamepad"></i>
          </div>
          <div
            className="group tooltips relative flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-[#292929] before:content-['Arts']"
            onClick={() => handleClick("arts")}
          >
            <i className="fa-solid fa-paintbrush"></i>
          </div>
          <div
            className="group tooltips relative flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-[#292929] before:content-['Game_Jams']"
            onClick={() => handleClick("gameJams")}
          >
            <i className="fa-solid fa-award"></i>
          </div>
          <hr className="mx-2" />
          <div
            className="group tooltips relative flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-[#292929] before:content-['Create_a_community']"
            onClick={() => handleClick("create")}
          >
            <i className="fa-solid fa-plus"></i>
          </div>
        </div>

        <div className="-mx-8 flex w-full flex-col items-center space-y-6 text-center whitespace-nowrap duration-300 ease-in lg:mx-0 lg:w-fit">
          <div
            className="tooltips w-10 cursor-pointer before:content-['Language']"
            onClick={() => handleClick("language")}
          >
            <i className="fa-solid fa-earth-americas"></i>
          </div>

          <div
            className="tooltips w-10 cursor-pointer before:content-['Settings']"
            onClick={() => handleClick("settings")}
          >
            <i className="fa-solid fa-gear"></i>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
