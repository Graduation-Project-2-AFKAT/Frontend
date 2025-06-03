import { ThumbsDown, ThumbsUp } from "lucide-react";
import moment from "moment";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { commentGame, loadGameComments } from "../../redux/modules/games";

interface GameCommentDialogProps {
  onClose: () => void;
}

const GameCommentDialog = ({ onClose }: GameCommentDialogProps) => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.loading);
  const { user } = useAppSelector((state) => state.users);
  const { Game, Comments } = useAppSelector((state) => state.games);

  const [comment, setComment] = useState("");

  // This function just formats dates without changing state
  const formatCommentTime = (created: string, updated: string) => {
    const createdMoment = moment(created);
    const updatedMoment = moment(updated);

    if (!createdMoment.isValid() || !updatedMoment.isValid()) {
      return "Invalid date";
    }

    // Check if dates are different (ignoring milliseconds)
    const wasEdited = !createdMoment.isSame(updatedMoment, "second");

    return wasEdited
      ? `(Edited) ${updatedMoment.fromNow()}`
      : createdMoment.fromNow();
  };

  useEffect(() => {
    if (Game && Comments.length === 0) {
      dispatch(loadGameComments(Game.id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Game]);

  const handleSubmitComment = () => {
    if (!Game) return;

    const commentData = { comment: comment, gameId: Game.id };
    dispatch(commentGame(commentData));

    setComment("");
  };

  return (
    <div
      className="absolute inset-0 top-0 z-50 items-center justify-center overflow-y-auto bg-black/50"
      onClick={onClose}
    >
      <div
        className="relative mx-auto w-full overflow-hidden bg-[#29282D] py-5 shadow-lg sm:my-20 sm:w-[38rem] sm:rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="group absolute top-5 right-0 translate-x-21 space-x-5 rounded-l-lg border border-r-0 border-red-400 bg-red-400 py-2 pr-10 pl-4 text-sm font-extrabold tracking-wider text-black duration-300 hover:translate-x-5 hover:shadow-md hover:shadow-black/100"
          onClick={onClose}
        >
          <span>X</span>
          <span>Close</span>
        </button>

        <h2 className="my-5 px-5 text-lg font-bold">Add a Comment</h2>

        <div className="flex h-fit items-start gap-x-5 px-5">
          <img
            src={user?.userProfile.profile_image || "#"}
            className={
              "fa-solid fa-circle-user aspect-square w-12 rounded-full border border-white object-cover"
            }
          />
          <textarea
            className="w-full rounded-md border border-white/25 p-3 text-sm duration-300 outline-none focus-within:border-white/100"
            rows={1}
            placeholder="Leave a comment..."
            name="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = "auto";
              target.style.height = `${target.scrollHeight}px`;
            }}
            style={{ overflow: "hidden", resize: "none" }}
          />
        </div>

        {/* Submit button */}
        <div className="mt-5 flex justify-end px-5">
          <button
            onClick={handleSubmitComment}
            disabled={!comment.trim()}
            className="bg-primary rounded px-4 py-1.5 font-medium text-black disabled:opacity-50"
          >
            Submit
          </button>
        </div>

        {/* Comments */}
        <div className="mt-2 py-5">
          {isLoading ? (
            <>
              <hr className="w-full opacity-15" />
              <div className="flex flex-col gap-4 space-y-3 pt-5">
                {[1, 2, 3].map((index) => (
                  <div key={index}>
                    <div className="flex animate-pulse gap-x-5 px-10 pb-7">
                      <div className="h-10 w-10 rounded-full bg-[#535256]" />
                      <div className="flex-1 space-y-4">
                        <div className="flex justify-between">
                          <div className="h-3 w-24 rounded bg-[#535256]" />
                          <div className="h-3 w-16 rounded bg-[#535256]" />
                        </div>
                        <div className="h-4 w-3/4 rounded bg-[#535256]" />
                        <div className="flex items-center gap-x-5">
                          <div className="h-6 w-16 rounded bg-[#535256]" />
                        </div>
                      </div>
                    </div>
                    <hr className="w-full opacity-15" />
                  </div>
                ))}
              </div>
            </>
          ) : Comments.length > 0 ? (
            <>
              <hr className="w-full opacity-15" />
              {Comments.map(
                ({ id, username, content, created_at, updated_at }) => (
                  <div key={id}>
                    <div className="flex gap-x-5 rounded px-10 py-6">
                      <img
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`}
                        alt={username}
                        className="h-10 w-10 rounded-full"
                      />

                      <div className="flex w-full flex-col justify-between gap-y-3">
                        <div className="flex justify-between">
                          <p className="text-sm font-bold">
                            {username}{" "}
                            <span className="font-extralight opacity-50">
                              @{username}
                            </span>
                          </p>
                          <small className="opacity-50">
                            {formatCommentTime(created_at, updated_at)}
                          </small>
                        </div>

                        <p className="text-sm">{content}</p>

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
                            <span>{15 - id}</span>
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
                  </div>
                ),
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="mb-3 text-5xl opacity-30">💬</div>
              <p className="text-lg font-medium">No Comments Yet</p>
              <p className="mt-2 text-sm opacity-60">
                Be the first to share your thoughts!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameCommentDialog;
