import { useMemo } from "react";
import AchievementsTabs from "../components/achievements/AchievementsTabs";

const Achievements = () => {
  const tabs = useMemo(() => {
    return ["All", "Latest", "CS:GO"] as ("All" | "Latest" | "CS:GO")[];
  }, []);

  return (
    <main className="h-full w-full overflow-y-auto">
      <div className="col-span-1 h-full space-y-3 p-15 lg:col-span-3">
        <AchievementsTabs defaultTab="All" tabs={tabs} />
      </div>
    </main>
  );
};

export default Achievements;
