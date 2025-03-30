interface IProps {
  tabs: string[];
  activeTab: string;
  handleTabClick: (tab: string) => void;
}

const SideTabs = ({ handleTabClick, tabs, activeTab }: IProps) => {
  return (
    <ul className="w-[60%] space-y-5 text-nowrap">
      {tabs.map((tab) => {
        if (tab === ",") {
          return (
            <hr key={`separator-${tabs.indexOf(tab)}`} className="opacity-25" />
          );
        } else {
          return (
            <li
              key={tab}
              className={`${activeTab === tab && "text-primary border-l-primary border-l-2 pl-4 font-bold"} cursor-pointer px-2 py-1 duration-50 hover:border-l-2`}
              onClick={() => handleTabClick(tab)}
            >
              {tab}
            </li>
          );
        }
      })}
    </ul>
  );
};

export default SideTabs;
