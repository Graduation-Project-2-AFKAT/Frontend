import { memo } from "react";
import { IAchievement } from "../../interfaces";
import { Lock, Trophy } from "lucide-react";

interface IProps {
  achievement: IAchievement;
}

const AchievementCard = ({ achievement }: IProps) => {
  return (
    <div
      className={`bg-base-200 relative rounded-lg border p-4 shadow transition-colors hover:shadow-md ${
        !achievement.isCompleted
          ? "border-white/25 opacity-60 hover:border-white/70"
          : "border-primary/50 hover:border-primary/80"
      }`}
    >
      <div className="flex h-full items-center gap-4">
        <div className="bg-base-300 relative aspect-square w-1/4 flex-shrink-0 self-start rounded-lg">
          {!achievement.isCompleted && (
            <div className="absolute inset-0 z-1 flex items-center justify-center rounded-lg bg-black/50">
              <Lock size={30} />
            </div>
          )}
          <img
            src={achievement.achievementIconURL}
            alt={achievement.achievementName}
            className={`h-full w-full rounded-lg object-cover ${!achievement.isCompleted ? "grayscale filter" : ""}`}
          />
        </div>

        <div className="flex h-full w-full flex-col justify-between">
          <div className="mb-1 flex justify-between">
            <h3 className="text-lg font-bold">{achievement.achievementName}</h3>
            <span className="flex items-center gap-1 text-xs font-bold">
              <Trophy size={12} />
              {`99+`}
            </span>
          </div>

          <div className="h-full text-start text-sm opacity-80">
            {achievement.achievementDescription}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(AchievementCard);
