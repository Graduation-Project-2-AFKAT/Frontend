import Board from "../components/ui/Board";
import { toast } from "react-toastify";
import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { downloadAGame, loadGame, resetGame } from "../redux/modules/games";
import { Download, Heart, MessageSquare, Star, Undo2 } from "lucide-react";
import { lazy, Suspense } from "react";

const GameCommentDialog = lazy(
  () => import("../components/games/GameCommentDialog"), //TODO this is only mocking comments, replace it with comment fetched from server
);

const Game = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { Game } = useAppSelector((state) => state.games);
  const { isLoading, type } = useAppSelector((state) => state.loading);
  const { downloadProgress, estimatedTime } = useAppSelector(
    (state) => state.games,
  );
  const {
    id = "",
    title = "",
    description = "",
    creator = "",
    rating = 3.3,
    game_file = "",
    thumbnail = "",
    tags = [],
    user_rating = 0,
    download_count = 0,
  } = Game || {};

  const [favorite, setFavorite] = useState(false);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [userRating, setUserRating] = useState<number>(rating);
  const [isGameLoaded, setIsGameLoaded] = useState(false);

  useEffect(() => {
    if (!Game) {
      const pathParts = location.pathname.split("/");
      const gameId = pathParts[pathParts.length - 1];
      dispatch(loadGame(gameId));
    } else if (id) {
      dispatch(loadGame(id.toString()));
    }

    return () => {
      dispatch(resetGame());
    };
  }, []);

  const handleRating = useCallback(
    (value: number) => {
      if (userRating === value) {
        setUserRating(0);
      } else {
        setUserRating(value);
      }
    },
    [userRating],
  );

  const handleDownload = () => {
    if (id) {
      dispatch(
        downloadAGame({ id: id, gameTitle: title, gameFile: game_file }),
      );
    }
  };

  return (
    <div className="grid-game grid w-full grid-cols-2 gap-x-10 overflow-y-auto px-10 py-5">
      {/* Left Section */}
      <div className="col-span-2 mt-3 h-fit pt-5 pb-2 xl:col-span-1 xl:py-0">
        <div className="flex items-center justify-between px-2 xl:px-0">
          <button
            onClick={() => window.history.back()}
            className="m-0 flex items-center gap-2 text-lg font-bold text-white hover:opacity-80 xl:m-5"
          >
            <Undo2 />
            Go Back
          </button>

          <div className="flex flex-col items-center xl:hidden">
            <h1 className="text-2xl">{title}</h1>
            <div>
              by:{" "}
              <a href="">
                <span className="font-extralight underline-offset-2 hover:underline">
                  @{creator}
                </span>
              </a>
            </div>
          </div>

          <div className="flex flex-col items-end xl:hidden">
            <button
              onClick={handleDownload}
              disabled={isLoading && type === "games/download"}
              className={`"disabled:bg-primary/70 bg-primary my-1 flex items-center gap-x-2 rounded px-4 py-2 text-sm font-bold text-black duration-150 disabled:cursor-not-allowed! ${!(isLoading && type === "games/download") && "hover:scale-95"}`}
            >
              {isLoading && type === "games/download"
                ? `Downloading...`
                : `Download`}
              <Download width={18} />
            </button>

            {/* Progress bar - only show when downloading */}
            {isLoading && type === "games/download" && downloadProgress > 0 && (
              <div className="mt-2 w-full max-w-[150px] xl:hidden">
                <div className="h-1.5 w-full rounded-full bg-gray-700">
                  <div
                    className="bg-primary h-1.5 rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${downloadProgress}%` }}
                  />
                </div>
                <div className="mt-1 flex justify-between text-xs">
                  <p>~{estimatedTime || 0}s left</p>
                  <p>{downloadProgress}%</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="hidden space-y-10 xl:block">
          <Board
            title="Suggestion"
            headerSize="text-xl"
            itemsCount={3}
            className="!static border border-white/10 px-5"
          />

          <div className="hidden w-full flex-col space-y-5 rounded-lg border border-white/10 bg-white/5 p-5 shadow-md shadow-black/50 xl:flex">
            <h2 className="font-bold">
              <i className="font-light">Don't be AFK, </i>
              <span className="text-primary font-bold text-nowrap">
                SHARE IT!
              </span>
            </h2>
            <div className="flex items-center gap-x-2">
              <input
                type="text"
                id="invite-link"
                // value={`AFK@T.com/games/${id}`}
                value={window.location.href}
                className="w-full rounded border border-white/15 px-3 py-1.5"
                readOnly
              />
              <button
                className="hover:bg-primary hover:border-primary cursor-pointer rounded border px-2 py-1.5 font-medium duration-150 hover:text-black"
                onClick={() => {
                  navigator.clipboard.writeText(
                    (document.getElementById("invite-link") as HTMLInputElement)
                      .value,
                  );
                  toast("Copied to clipboard");
                }}
              >
                Copy
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="col-span-2 flex flex-col space-y-3 pt-3 pb-20">
        <div className="hidden justify-between px-2 xl:flex">
          <div>
            <h1 className="text-2xl">{title}</h1>
            <div>
              by:{" "}
              <a href="">
                <span className="font-extralight underline-offset-2 hover:underline">
                  @{creator}
                </span>
              </a>
            </div>
          </div>

          <div className="flex flex-col items-end">
            <button
              onClick={handleDownload}
              disabled={isLoading && type === "games/download"}
              className={`"disabled:bg-primary/70 bg-primary my-1 flex items-center gap-x-2 rounded px-4 py-2 text-sm font-bold text-black duration-150 disabled:cursor-wait ${!(isLoading && type === "games") && "hover:scale-95"}`}
            >
              {isLoading && type === "games/download"
                ? `Downloading...`
                : `Download`}
              <Download width={18} />
            </button>

            {/* Progress bar - only show when downloading */}
            {isLoading && type === "games/download" && downloadProgress > 0 && (
              <div className="mt-2 hidden w-full max-w-[150px] xl:block">
                <div className="h-1.5 w-full rounded-full bg-gray-700">
                  <div
                    className="bg-primary h-1.5 rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${downloadProgress}%` }}
                  />
                </div>
                <div className="mt-1 flex justify-between text-xs">
                  <p>~{estimatedTime || 0}s left</p>
                  <p>{downloadProgress}%</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="relative aspect-video w-full rounded-lg border">
          {!isGameLoaded ? (
            <div
              className="flex h-full w-full flex-col items-center justify-center rounded-lg bg-[#1A191F]"
              style={{
                backgroundImage: thumbnail ? `url(${thumbnail})` : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/50">
                <button
                  onClick={() => setIsGameLoaded(true)}
                  className="group flex flex-col items-center gap-2 transition-transform duration-200 hover:scale-105"
                >
                  <div className="bg-primary hover:bg-primary/90 shadow-primary/30 flex h-20 w-20 items-center justify-center rounded-full shadow-lg">
                    <i className="fa-solid fa-play translate-x-0.5 text-4xl text-gray-300 transition-colors" />
                  </div>
                  <span className="group-hover:text-primary text-2xl font-medium text-white transition-colors">
                    Play Game
                  </span>
                </button>
              </div>
            </div>
          ) : (
            <div className="h-full w-full">
              <iframe
                src={`https://afkat-bucket.s3.amazonaws.com/games/${id}/index.html`}
                className="h-full w-full rounded-lg"
                title={title || "Game view"}
                loading="lazy"
                allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                sandbox="allow-scripts allow-same-origin"
              />
            </div>
          )}

          {/* //TODO Full screen button */}
          {/* <button
            className="absolute border"
            onClick={() => {
              const iframe = document.querySelector("iframe");

              if (iframe) {
                if (!document.fullscreenElement) {
                  iframe.requestFullscreen();
                } else {
                  document.exitFullscreen();
                }
              }
            }}
          >
            Full screen
          </button> */}
        </div>

        <div className="my-2 flex justify-between rounded-md border border-white/10 bg-[#2E2B35] px-5 py-2.5">
          <div className="flex gap-x-5">
            <div
              className="flex cursor-pointer gap-2 transition-opacity hover:opacity-80"
              onClick={() => setFavorite((prev) => !prev)}
            >
              {/* //TODO call favorite api when clicked */}
              <Heart fill={`${favorite ? "white" : "transparent"}`} />
              Favorite
            </div>

            <div
              className="flex cursor-pointer gap-2 transition-opacity hover:opacity-80"
              onClick={() => setShowDialog(true)}
            >
              <MessageSquare />
              Comment
            </div>

            {/* Replace the dialog with lazy-loaded component */}
            {showDialog && (
              <Suspense
                fallback={
                  <div className="absolute inset-0 top-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="flex items-center gap-2">
                      <div className="border-primary h-6 w-6 animate-spin rounded-full border-t-2 border-b-2"></div>
                      <span>Loading comments...</span>
                    </div>
                  </div>
                }
              >
                <GameCommentDialog
                  onClose={() => setShowDialog(false)}
                  gameId={id?.toString()}
                />
              </Suspense>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-end gap-x-5">
            <p className="text-sm">( {userRating} / 5 )</p>
            <div className="relative flex">
              {/* Empty/background stars */}
              {[1, 2, 3, 4, 5].map((value) => (
                <Star
                  key={value}
                  fill={"transparent"}
                  className="cursor-pointer duration-50 hover:opacity-80"
                  onClick={() => handleRating(value)}
                />
              ))}

              {/* Optimized filled stars with clipping */}
              <div
                className="pointer-events-none absolute flex overflow-hidden"
                style={{
                  width: `${(userRating / 5) * 100}%`,
                  willChange: "width",
                  transition: "width 0.2s ease-out",
                }}
              >
                {[1, 2, 3, 4, 5].map((value) => (
                  <Star
                    key={value}
                    fill={"white"}
                    className="min-w-6" // Ensure consistent width
                    style={{
                      width: "24px", // Explicit width for consistency
                      height: "24px", // Explicit height for consistency
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* How to Play */}
        <div>
          <h2 className="mt-5 text-xl font-bold">How to Play</h2>

          <div className="p-3 font-light">
            To play this game, follow these simple steps:
            <ol className="list-decimal py-3 pl-10">
              <li>
                Open the game in your web browser. Ensure you have a stable
                internet connection for the best experience.
              </li>
              <li>
                Use your keyboard or mouse to navigate through the game.
                Specific controls will be displayed on the screen as you
                progress.
              </li>
              <li>
                Complete the objectives or challenges presented in each level to
                advance further.
              </li>
              <li>
                Keep an eye on your score and try to beat your personal best or
                compete with friends.
              </li>
              <li>
                If you encounter any difficulties, refer to the in-game tutorial
                or help section for guidance.
              </li>
            </ol>
            Enjoy the game and have fun!
          </div>
        </div>

        <div>
          <h2 className="mt-5 text-xl font-bold">Description</h2>

          <p className="p-3 font-light">{description}</p>
        </div>

        {/* small screens (aside -> below) */}
        <div className="mt-10 flex flex-col gap-y-10 xl:hidden">
          <Board
            title="Suggestion"
            headerSize="text-xl"
            itemsDirection="row"
            itemsCount={10}
            className="!static !flex border border-white/10 !pb-5"
          />

          <div className="flex w-full flex-col space-y-5 rounded-lg border border-white/10 bg-white/5 p-5 shadow-md shadow-black/50">
            <h2 className="font-bold">
              <i className="font-light">
                Don't be AFK,{" "}
                <span className="text-primary font-bold">SHARE IT!</span>
              </i>
            </h2>
            <div className="flex items-center gap-x-2">
              <input
                type="text"
                id="invite-link-sm"
                value={`AFK@T.com/games/${id}`}
                className="w-full rounded border border-white/15 px-3 py-1.5"
                readOnly
              />
              <button
                className="hover:bg-primary hover:border-primary cursor-pointer rounded border px-3 py-1.5 font-medium duration-150 hover:text-black"
                onClick={() => {
                  navigator.clipboard.writeText(
                    (
                      document.getElementById(
                        "invite-link-sm",
                      ) as HTMLInputElement
                    ).value,
                  );
                  toast("Copied to clipboard");
                }}
              >
                Copy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
