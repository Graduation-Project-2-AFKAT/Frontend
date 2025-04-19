import Board from "../components/ui/Board";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { downloadAGame, loadAGame } from "../redux/modules/games";
import {
  Download,
  Heart,
  MessageSquare,
  Star,
  ThumbsDown,
  ThumbsUp,
  Undo2,
} from "lucide-react";

const Game = () => {
  const location = useLocation();
  const Game = useSelector((state: RootState) => state.games.Game);
  const { isLoading, type } = useAppSelector((state) => state.loading);
  const { downloadProgress, estimatedTime } = useAppSelector(
    (state) => state.games,
  );
  const {
    id = "",
    title = "",
    description = "",
    creator = "",
    rating = 0,
    game_file = "",
    thumbnail = "",
    tags = [],
    user_rating = 0,
    download_count = 0,
  } = Game || {};
  const dispatch = useAppDispatch();

  const [favorite, setFavorite] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [stars, setStars] = useState({
    one: false,
    two: false,
    three: false,
    four: false,
    five: false,
  });

  useEffect(() => {
    if (!Game) {
      const pathParts = location.pathname.split("/");
      const gameId = pathParts[pathParts.length - 1];
      dispatch(loadAGame(gameId));
    }
  }, [Game]);

  const handleRating = (rate: keyof typeof stars) => {
    const index = Object.keys(stars).indexOf(rate);

    if (stars[rate]) {
      const hasHigherRatedStars = Object.keys(stars).some((s, indx) => {
        return stars[s as keyof typeof stars] === true && indx > index;
      });

      if (hasHigherRatedStars) {
        const updatedStars = { ...stars };
        Object.keys(stars).forEach((s, indx) => {
          if (indx > index) {
            updatedStars[s as keyof typeof stars] = false;
          }
        });
        setStars(updatedStars);
        return;
      }

      setStars({
        one: false,
        two: false,
        three: false,
        four: false,
        five: false,
      });
    } else {
      const updatedStars = { ...stars };
      Object.keys(stars).forEach((s, indx) => {
        if (indx <= index) {
          updatedStars[s as keyof typeof stars] = true;
        }
      });
      setStars(updatedStars);
    }
  };

  const handleDownload = () => {
    if (id) {
      dispatch(
        downloadAGame({ id: id, gameTitle: title, gameFile: game_file }),
      );
    }
  };

  return (
    <div className="game-grid grid w-full grid-cols-2 gap-x-10 overflow-y-auto px-10 py-5">
      {/* Left Section */}
      <div className="col-span-2 h-fit pt-5 pb-2 xl:col-span-1 xl:py-0">
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
              className={`${isLoading && type === "games/download" ? "bg-primary/70 cursor-not-allowed!" : "bg-primary"} my-1 flex items-center gap-x-2 rounded px-4 py-2 text-sm font-bold text-black duration-150 ${!(isLoading && type === "games") && "hover:scale-95"}`}
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
                value={`AFK@T.com/games/${id}`}
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
              className={`${isLoading && type === "games/download" ? "bg-primary/70 cursor-wait" : "bg-primary"} my-1 flex items-center gap-x-2 rounded px-4 py-2 text-sm font-bold text-black duration-150 ${!(isLoading && type === "games") && "hover:scale-95"}`}
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

        <div className="aspect-video rounded-lg border">
          {thumbnail ? (
            <img src={thumbnail} alt={title} />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-[#1A191F]">
              <div className="border-primary h-10 w-10 animate-spin rounded-full border-t-2 border-b-2" />
            </div>
          )}
        </div>

        <div className="my-5 flex justify-between border px-5">
          <div className="flex gap-x-5">
            <div
              className="flex cursor-pointer gap-2"
              onClick={() => setFavorite((prev) => !prev)}
            >
              <Heart fill={`${favorite ? "white" : "transparent"}`} />
              Favorite
            </div>

            <div
              className="flex cursor-pointer gap-2"
              onClick={() => setShowDialog(true)}
            >
              <MessageSquare />
              Comment
            </div>

            {showDialog && (
              <div
                className="absolute inset-0 top-0 z-50 items-center justify-center overflow-y-auto bg-black/50"
                onClick={() => setShowDialog(false)}
              >
                <div
                  className="relative mx-auto w-full overflow-hidden bg-[#29282D] py-5 shadow-lg sm:my-20 sm:w-[38rem] sm:rounded-lg"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    className="group absolute top-5 right-0 translate-x-20.5 space-x-4 rounded-l-lg border border-r-0 py-2 pr-10 pl-4 text-xs font-extrabold tracking-wider text-white duration-200 hover:-translate-x-0 hover:border-red-400 hover:bg-red-400 hover:text-black hover:shadow-md hover:shadow-black/100"
                    onClick={() => setShowDialog(false)}
                  >
                    <span className="duration-50 group-hover:opacity-0">X</span>
                    <span className="text-sm text-black">Close</span>
                  </button>

                  <h2 className="my-5 px-5 text-lg font-bold">Add a Comment</h2>

                  <div className="flex h-fit items-center gap-x-5 px-5">
                    <i className="fa-solid fa-circle-user text-5xl" />
                    <textarea
                      className="w-full rounded-md border border-white/25 p-3 text-sm duration-300 outline-none focus-within:border-white/100"
                      rows={1}
                      placeholder="Leave a comment..."
                      onInput={(e) => {
                        const target = e.target as HTMLTextAreaElement;
                        target.style.height = "auto";
                        target.style.height = `${target.scrollHeight}px`;
                      }}
                      style={{ overflow: "hidden", resize: "none" }}
                    ></textarea>
                  </div>

                  <div className="mt-5 space-y-5 py-5">
                    <hr className="w-full opacity-15" />

                    <div className="flex gap-x-2 rounded px-10 py-3">
                      <i className="fa-solid fa-circle-user text-4xl" />

                      <div className="flex flex-col justify-between gap-y-5">
                        <div>
                          <p className="text-sm font-bold">
                            User1{" "}
                            <span className="font-extralight opacity-50">
                              @user
                            </span>
                          </p>
                          <small className="text-xs opacity-50">
                            almost 2 years ago
                          </small>
                        </div>

                        <p className="text-sm">This is a great game!</p>

                        <div className="flex items-center gap-x-5">
                          <div className="flex gap-x-2">
                            <ThumbsUp
                              size={25}
                              className="relative origin-left duration-250 hover:-rotate-10"
                              style={{
                                transitionTimingFunction:
                                  "cubic-bezier(0.438, 3, 0.64, 1)",
                              }}
                            />
                            <span>15</span>
                          </div>
                          <ThumbsDown
                            size={25}
                            className="relative top-0.5 origin-right duration-250 hover:-rotate-10"
                            style={{
                              transitionTimingFunction:
                                "cubic-bezier(0.438, 3, 0.64, 1)",
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    <hr className="w-full opacity-15" />

                    <div className="flex gap-x-2 rounded px-10 py-3">
                      <i className="fa-solid fa-circle-user text-4xl" />

                      <div className="flex flex-col justify-between gap-y-5">
                        <div>
                          <p className="text-sm font-bold">
                            User2{" "}
                            <span className="font-extralight opacity-50">
                              @user
                            </span>
                          </p>
                          <small className="text-xs opacity-50">
                            almost 2 years ago
                          </small>
                        </div>

                        <p className="text-sm">I really enjoyed playing it.</p>

                        <div className="flex items-center gap-x-5">
                          <div className="flex gap-x-2">
                            <ThumbsUp
                              size={25}
                              className="relative origin-left duration-250 hover:-rotate-10"
                              style={{
                                transitionTimingFunction:
                                  "cubic-bezier(0.438, 3, 0.64, 1)",
                              }}
                            />
                            <span>10</span>
                          </div>
                          <ThumbsDown
                            size={25}
                            className="relative top-0.5 origin-right duration-250 hover:-rotate-10"
                            style={{
                              transitionTimingFunction:
                                "cubic-bezier(0.438, 3, 0.64, 1)",
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    <hr className="w-full opacity-15" />

                    <div className="flex gap-x-2 rounded px-10 py-3">
                      <i className="fa-solid fa-circle-user text-4xl" />

                      <div className="flex flex-col justify-between gap-y-5">
                        <div>
                          <p className="text-sm font-bold">
                            User3{" "}
                            <span className="font-extralight opacity-50">
                              @user
                            </span>
                          </p>
                          <small className="text-xs opacity-50">
                            almost 2 years ago
                          </small>
                        </div>

                        <p className="text-sm">
                          Looking forward to more updates!
                        </p>

                        <div className="flex items-center gap-x-5">
                          <div className="flex gap-x-2">
                            <ThumbsUp
                              size={25}
                              className="relative origin-left duration-250 hover:-rotate-10"
                              style={{
                                transitionTimingFunction:
                                  "cubic-bezier(0.438, 3, 0.64, 1)",
                              }}
                            />
                            <span>8</span>
                          </div>
                          <ThumbsDown
                            size={25}
                            className="relative top-0.5 origin-right duration-250 hover:-rotate-10"
                            style={{
                              transitionTimingFunction:
                                "cubic-bezier(0.438, 3, 0.64, 1)",
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    <hr className="w-full opacity-15" />

                    <div className="flex gap-x-2 rounded px-10 py-3">
                      <i className="fa-solid fa-circle-user text-4xl" />

                      <div className="flex flex-col justify-between gap-y-5">
                        <div>
                          <p className="text-sm font-bold">
                            User3{" "}
                            <span className="font-extralight opacity-50">
                              @user
                            </span>
                          </p>
                          <small className="text-xs opacity-50">
                            almost 2 years ago
                          </small>
                        </div>

                        <p className="text-sm">
                          Looking forward to more updates!
                        </p>

                        <div className="flex items-center gap-x-5">
                          <div className="flex gap-x-2">
                            <ThumbsUp
                              size={25}
                              className="relative origin-left duration-250 hover:-rotate-10"
                              style={{
                                transitionTimingFunction:
                                  "cubic-bezier(0.438, 3, 0.64, 1)",
                              }}
                            />
                            <span>8</span>
                          </div>
                          <ThumbsDown
                            size={25}
                            className="relative top-0.5 origin-right duration-250 hover:-rotate-10"
                            style={{
                              transitionTimingFunction:
                                "cubic-bezier(0.438, 3, 0.64, 1)",
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    <hr className="w-full opacity-15" />

                    <div className="flex gap-x-2 rounded px-10 py-3">
                      <i className="fa-solid fa-circle-user text-4xl" />

                      <div className="flex flex-col justify-between gap-y-5">
                        <div>
                          <p className="text-sm font-bold">
                            User3{" "}
                            <span className="font-extralight opacity-50">
                              @user
                            </span>
                          </p>
                          <small className="text-xs opacity-50">
                            almost 2 years ago
                          </small>
                        </div>

                        <p className="text-sm">
                          Looking forward to more updates!
                        </p>

                        <div className="flex items-center gap-x-5">
                          <div className="flex gap-x-2">
                            <ThumbsUp
                              size={25}
                              className="relative origin-left duration-250 hover:-rotate-10"
                              style={{
                                transitionTimingFunction:
                                  "cubic-bezier(0.438, 3, 0.64, 1)",
                              }}
                            />
                            <span>8</span>
                          </div>
                          <ThumbsDown
                            size={25}
                            className="relative top-0.5 origin-right duration-250 hover:-rotate-10"
                            style={{
                              transitionTimingFunction:
                                "cubic-bezier(0.438, 3, 0.64, 1)",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-end gap-x-5">
            <p className="text-sm">( {rating} / 5 )</p>
            <div className="flex">
              <Star
                id="one"
                fill={`${stars.one ? "white" : "transparent"}`}
                className="cursor-pointer duration-50 hover:opacity-80"
                onClick={() => handleRating("one")}
              />
              <Star
                id="two"
                fill={`${stars.two ? "white" : "transparent"}`}
                className="cursor-pointer duration-50 hover:opacity-80"
                onClick={() => handleRating("two")}
              />
              <Star
                id="three"
                fill={`${stars.three ? "white" : "transparent"}`}
                className="cursor-pointer duration-50 hover:opacity-80"
                onClick={() => handleRating("three")}
              />
              <Star
                id="four"
                fill={`${stars.four ? "white" : "transparent"}`}
                className="cursor-pointer duration-50 hover:opacity-80"
                onClick={() => handleRating("four")}
              />
              <Star
                id="five"
                fill={`${stars.five ? "white" : "transparent"}`}
                className="cursor-pointer duration-50 hover:opacity-80"
                onClick={() => handleRating("five")}
              />
            </div>
          </div>
        </div>

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
