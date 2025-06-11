import { memo } from "react";
import { Link } from "react-router";
import { IGame } from "../interfaces";

interface IProps {
  game: IGame;
  className?: string;
}

const GameCard = ({ game, className }: IProps) => {
  const { id, title, username, tags, thumbnail } = game;

  return (
    <Link
      to={`${id}`}
      className={`${className} outline-primary bg-base-content/2.5 border-primary/25 aspect-[4/5] rounded-2xl border shadow-md drop-shadow-md duration-50 md:rounded-lg lg:hover:outline-2 lg:hover:outline-dashed`}
    >
      <div className="flex h-full flex-col justify-between">
        <div className="h-full overflow-hidden">
          <img
            src={thumbnail}
            alt="title"
            className="h-full w-full rounded-t-lg object-cover"
          />
        </div>

        <div className="space-y-5 px-3 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <i className="fa-solid fa-circle-user w-10 cursor-pointer text-4xl" />

              <div className="ml-2 flex flex-col">
                <small className="font-bold opacity-70">{username}</small>
                <span className="block max-w-[120px] truncate font-bold">
                  {title}
                </span>
              </div>
            </div>

            <div className="bg-neutral/20 self-start rounded-md border border-white/25 px-3 py-1.5 text-sm font-bold">
              FREE
            </div>
          </div>

          <div className="flex items-center justify-between space-x-2 pl-1">
            <div className="flex gap-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-gamepad2-icon lucide-gamepad-2"
              >
                <line x1="6" x2="10" y1="11" y2="11" />
                <line x1="8" x2="8" y1="9" y2="13" />
                <line x1="15" x2="15.01" y1="12" y2="12" />
                <line x1="18" x2="18.01" y1="10" y2="10" />
                <path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z" />
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-swords-icon lucide-swords"
              >
                <polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5" />
                <line x1="13" x2="19" y1="19" y2="13" />
                <line x1="16" x2="20" y1="16" y2="20" />
                <line x1="19" x2="21" y1="21" y2="19" />
                <polyline points="14.5 6.5 18 3 21 3 21 6 17.5 9.5" />
                <line x1="5" x2="9" y1="14" y2="18" />
                <line x1="7" x2="4" y1="17" y2="20" />
                <line x1="3" x2="5" y1="19" y2="21" />
              </svg>
            </div>
            {tags.length > 0 && (
              <button
                // href={
                //   window.location.origin +
                //   window.location.pathname +
                //   `?tag=${tag}`
                // } //TODO tag button filter games
                className={`hover:border-primary bg-primary-content/5 rounded-full border border-white/75 px-4 py-1 text-sm transition-colors`}
              >
                {tags[0]}
              </button>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default memo(GameCard);
