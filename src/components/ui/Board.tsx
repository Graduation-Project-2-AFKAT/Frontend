import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { loadLeaderboards } from "../../redux/modules/leaderboards";
import { loadGames } from "../../redux/modules/games";
import { Link } from "react-router";

interface IProps {
  title?: string;
  className?: string;
  headerSize?: string;
  itemsDirection?: "row" | "col";
  itemsCount?: number;
}

const Board = ({
  title = "Default Title",
  className = "",
  headerSize,
  itemsDirection,
  itemsCount = 4, //TODO make maximum itemsCount 4
}: IProps) => {
  const dispatch = useAppDispatch();
  const { Leaderboards } = useAppSelector((state) => state.leaderboards);
  const { Games } = useAppSelector((state) => state.games);

  useEffect(() => {
    if (title === "Leaderboard") {
      dispatch(loadLeaderboards());
    } else if (title === "Suggestion") {
      dispatch(loadGames());
    }
  }, []);

  return (
    <aside
      className={`${className} bg-base-content/5 sticky top-0 hidden flex-col space-y-10 rounded-lg p-8 pb-10 shadow-md drop-shadow-md lg:flex`}
    >
      <div
        className={`${headerSize ? headerSize : "text-2xl"} underline underline-offset-[15px]`}
      >
        {title}
      </div>

      <div>
        <ul
          className={`${itemsDirection === "row" && "no-scrollbar flex justify-around space-x-10 overflow-x-auto px-5 lg:justify-normal lg:px-0"} list-none space-y-10 px-2 xl:block`}
        >
          {title === "Leaderboard" &&
            Leaderboards.length > 0 &&
            Leaderboards.slice(0, 3).map((leaderboard, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="from-primary/70 to-secondary/70 flex h-16 w-16 items-center justify-center overflow-hidden rounded-md bg-gradient-to-br font-bold text-white">
                  #{index + 1}
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold">
                    {leaderboard.leaderboardName}
                  </span>
                  <span className="text-base-content/70 text-xs">
                    {leaderboard?.score || "99+"} points
                  </span>
                </div>
              </li>
            ))}
          {title !== "Leaderboard" &&
            Games.slice(0, itemsCount).map((game, index) => (
              <li key={index} className="flex items-start gap-3 text-nowrap">
                <Link className="avatar" to={`/games/${game.id}`}>
                  <div className="h-16 w-16 rounded-md">
                    <img src={`${game.thumbnail}`} alt="Profile avatar" />
                  </div>
                </Link>

                <div className="flex flex-col">
                  <Link to={`/games/${game.id}`} className="font-semibold">
                    {game.title}
                  </Link>
                  <Link
                    to={`/profile/${game.user_id}`}
                    className="text-base-content/70 max-w-[120px] truncate text-xs"
                  >
                    {game.username}
                  </Link>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </aside>
  );
};

export default Board;
