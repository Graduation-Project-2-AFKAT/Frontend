import {
  Download,
  Edit,
  Heart,
  MessageSquare,
  Star,
  Trash,
  Undo2,
} from "lucide-react";
import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { toast } from "react-toastify";
import Board from "../components/ui/Board";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  deleteGame,
  downloadGame,
  // gameRatings,
  loadGameById,
  rateGame,
  resetGame,
} from "../redux/modules/games";
import debounce from "lodash.debounce";

const GameCommentDialog = lazy(
  () => import("../components/games/GameCommentDialog"),
);

const Game = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { Game } = useAppSelector((state) => state.games);
  const { user } = useAppSelector((state) => state.users);
  const { isLoading, type } = useAppSelector((state) => state.loading);
  const { type: alertType } = useAppSelector((state) => state.alerts);
  const { downloadProgress, estimatedTime } = useAppSelector(
    (state) => state.games,
  );
  const {
    id = "",
    title = "",
    description = "",
    username: creator = "",
    rating = 0,
    thumbnail = "",
    // tags = [],
    user_rating = 0,
    game_file_win = "",
    webgl_index_path = "",
    // download_count = 0,
  } = Game || {};

  const [favorite, setFavorite] = useState(false);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [showFullButton, setShowFullButton] = useState(true);
  const [userRating, setUserRating] = useState<number>(user_rating);
  const [isGameLoaded, setIsGameLoaded] = useState(false);
  const [debouncedRating, setDebouncedRating] = useState<number>(user_rating);

  const debouncedRatingHandler = useCallback(
    (ratingValue: number) => {
      const debouncedFn = debounce((value: number) => {
        setDebouncedRating(value);
      }, 500);
      debouncedFn(ratingValue);
      return debouncedFn;
    },
    [setDebouncedRating],
  );

  const handleRating = useCallback(
    (value: number) => {
      if (!Game) return;

      setUserRating(value);
    },
    [Game],
  );

  const handleDownload = () => {
    if (id) {
      dispatch(
        downloadGame({ id: id, gameTitle: title, gameFile: game_file_win }),
      );
    }
  };

  const handleDelete = () => {
    if (
      window.confirm(
        "Are you sure you want to delete this game? This action cannot be undone.",
      )
    ) {
      dispatch(deleteGame(Game?.id));
    }
  };

  useEffect(() => {
    if (!Game) {
      const pathParts = location.pathname.split("/");
      const gameId = pathParts[pathParts.length - 1];

      dispatch(loadGameById(gameId));
    } else if (id) {
      dispatch(loadGameById(id.toString()));
    }

    if (location.state?.permissionDenied) {
      toast.warn(location.state?.message);
    }

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setShowFullButton(true);
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      dispatch(resetGame());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (userRating === 0) {
      setUserRating(user_rating);
      setDebouncedRating(user_rating);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user_rating]);

  useEffect(() => {
    const endPath = location.pathname.split("/").pop();
    const isNumber = endPath && !isNaN(Number(endPath));

    if (isNumber) {
      dispatch(loadGameById(endPath.toString()));
      setIsGameLoaded(false);
    }
  }, [dispatch, location.pathname]);

  useEffect(() => {
    const debouncedFn = debouncedRatingHandler(userRating);

    return () => {
      debouncedFn.cancel();
    };
  }, [userRating, debouncedRatingHandler]);

  useEffect(() => {
    if (Game?.id && debouncedRating !== user_rating) {
      dispatch(rateGame({ rate: debouncedRating, gameId: Game.id }));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedRating, dispatch]);

  useEffect(() => {
    if (alertType === "error" && type === "games/rate") {
      setUserRating(user_rating);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, alertType]);

  return (
    <div className="w-full overflow-y-auto">
      {isLoading && type === "games/loadById" ? (
        <div className="flex h-full w-full items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="border-primary h-10 w-10 animate-spin rounded-full border-4 border-t-transparent"></div>
            <p className="text-lg">Loading game...</p>
          </div>
        </div>
      ) : (
        <div className="grid-game grid grid-cols-2 gap-x-10 px-10 py-5">
          {/* Left Section */}
          <div className="col-span-2 mt-3 h-fit pt-5 pb-2 xl:col-span-1 xl:py-0">
            <div className="grid grid-cols-3 items-center justify-between px-2 xl:px-0">
              <Link
                to={`/games`}
                className="m-0 flex items-center gap-2 text-lg font-bold text-nowrap text-white hover:opacity-80 xl:col-span-2 xl:mx-2 xl:my-5"
              >
                <Undo2 size={20} className="w-10" />
                Go Back
              </Link>

              <div className="flex flex-col items-center xl:hidden">
                <h1 className="text-center text-2xl">{title}</h1>
                <div>
                  by:{" "}
                  <Link to={`/profile/${Game?.user_id}`}>
                    <span className="text-primary underline-offset-2 hover:underline">
                      @{creator}
                    </span>
                  </Link>
                </div>
              </div>

              <div className="flex flex-col items-end justify-end gap-x-2 gap-y-1 xl:flex-row xl:items-center">
                <div className="flex flex-col items-end xl:hidden">
                  {game_file_win && (
                    <button
                      className={`"disabled:bg-primary/70 bg-primary text-primary-content my-1 flex items-center gap-x-2 rounded px-4 py-2 text-sm font-bold duration-150 hover:opacity-80 disabled:cursor-not-allowed! ${!(isLoading && type === "games/download") && "active:scale-95"}`}
                      onClick={handleDownload}
                      disabled={isLoading && type === "games/download"}
                    >
                      {isLoading && type === "games/download"
                        ? `Downloading...`
                        : `Download`}
                      <Download width={18} />
                    </button>
                  )}
                </div>

                {/* Progress bar - only show when downloading */}
                {isLoading &&
                  type === "games/download" &&
                  downloadProgress > 0 && (
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

                {Game?.user_id === user?.id && (
                  <div className="inline-flex gap-x-2 xl:hidden">
                    <Link
                      to={"edit"}
                      className="inline-flex rounded border border-white/20 px-3 py-2.5 hover:border-white/50"
                    >
                      <Edit size={20} />
                    </Link>
                    <button
                      className="text-error hover:border-error/50 inline-flex rounded border border-white/20 px-3 py-2"
                      onClick={handleDelete}
                    >
                      <Trash size={20} />
                    </button>
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
                    value={window.location.href}
                    className="w-full rounded border border-white/15 px-3 py-1.5"
                    readOnly
                  />
                  <button
                    className="hover:bg-primary hover:border-primary cursor-pointer rounded border px-2 py-1.5 font-medium duration-150 hover:text-black"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        (
                          document.getElementById(
                            "invite-link",
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

          {/* Main */}
          <div className="col-span-2 flex flex-col space-y-3 pt-3 pb-20">
            <div className="hidden justify-between px-2 xl:flex">
              <div>
                <h1 className="text-2xl">{title}</h1>
                <div>
                  by:{" "}
                  <Link to={`/profile/${Game?.user_id}`}>
                    <span className="text-primary underline-offset-2 hover:underline">
                      @{creator}
                    </span>
                  </Link>
                </div>
              </div>

              <div className="flex items-center gap-x-2">
                <div className="flex flex-col items-end">
                  {game_file_win && (
                    <button
                      className={`"disabled:bg-primary/70 bg-primary text-primary-content my-1 flex items-center gap-x-2 rounded px-4 py-2 text-sm font-bold duration-150 hover:opacity-80 disabled:cursor-wait ${!(isLoading && type === "games") && "active:scale-95"}`}
                      onClick={handleDownload}
                      disabled={isLoading && type === "games/download"}
                    >
                      {isLoading && type === "games/download"
                        ? `Downloading...`
                        : `Download`}
                      <Download width={18} />
                    </button>
                  )}

                  {/* Progress bar - only show when downloading */}
                  {isLoading &&
                    type === "games/download" &&
                    downloadProgress > 0 && (
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

                {Game?.user_id === user?.id && (
                  <>
                    <Link
                      to={"edit"}
                      className="inline-flex rounded border border-white/20 px-3 py-2 hover:border-white/50"
                    >
                      <Edit size={20} />
                    </Link>
                    <button
                      className="text-error hover:border-error/50 inline-flex rounded border border-white/20 px-3 py-2"
                      onClick={handleDelete}
                    >
                      <Trash size={20} />
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="relative aspect-video w-full rounded-lg border">
              {webgl_index_path ? (
                !isGameLoaded ? (
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
                        className="group flex flex-col items-center gap-2 transition-transform duration-200 hover:scale-105"
                        onClick={() => setIsGameLoaded(true)}
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
                  <div className="relative h-full w-full">
                    <iframe
                      src={webgl_index_path}
                      className="h-full w-full rounded-lg"
                      title={title || "Game view"}
                      loading="lazy"
                      allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                      allowFullScreen
                      sandbox="allow-scripts allow-same-origin allow-popups allow-presentation allow-forms allow-fullscreen"
                    />

                    {showFullButton && (
                      <button
                        className={`${document.fullscreenElement ? "hidden" : ""} absolute right-4 bottom-4 rounded-full bg-black/60 p-2 transition-colors hover:bg-black/80`}
                        onClick={() => {
                          const iframeContainer = document.querySelector(
                            ".relative.h-full.w-full",
                          );
                          const iframe = document.querySelector("iframe");

                          if (document.fullscreenElement) {
                            setShowFullButton(true);
                            document.exitFullscreen();
                          } else if (iframe && iframeContainer) {
                            setShowFullButton(false);
                            iframe.focus();
                            iframeContainer
                              .requestFullscreen({ navigationUI: "hide" })
                              .catch((err) => {
                                toast.error(
                                  "Fullscreen failed: " + err.message,
                                );
                              });
                          }
                        }}
                        aria-label="Toggle fullscreen"
                      >
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
                        >
                          <path d="M8 3H5a2 2 0 0 0-2 2v3"></path>
                          <path d="M21 8V5a2 2 0 0 0-2-2h-3"></path>
                          <path d="M3 16v3a2 2 0 0 0 2 2h3"></path>
                          <path d="M16 21h3a2 2 0 0 0 2-2v-3"></path>
                        </svg>
                      </button>
                    )}
                  </div>
                )
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center rounded-lg bg-[#1A191F]">
                  <div className="flex flex-col items-center gap-4 p-6 text-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="64"
                      height="64"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-gray-400"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                    </svg>
                    <h3 className="text-xl font-semibold text-white">
                      No WebGL Available
                    </h3>
                    <p className="max-w-md text-gray-400">
                      This game doesn't have a WebGL version available for
                      browser play. Please download the game to play on your
                      computer.
                    </p>
                  </div>
                </div>
              )}
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
                    <GameCommentDialog onClose={() => setShowDialog(false)} />
                  </Suspense>
                )}
              </div>

              {/* Rating */}
              <div className="flex items-end gap-x-5">
                <p className="text-sm">( {rating} / 5 )</p>
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
                    Complete the objectives or challenges presented in each
                    level to advance further.
                  </li>
                  <li>
                    Keep an eye on your score and try to beat your personal best
                    or compete with friends.
                  </li>
                  <li>
                    If you encounter any difficulties, refer to the in-game
                    tutorial or help section for guidance.
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
                    value={window.location.href}
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
      )}
    </div>
  );
};

export default Game;
