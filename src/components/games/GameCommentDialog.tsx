import { ThumbsDown, ThumbsUp } from "lucide-react";
import moment from "moment";
import { useEffect, useState } from "react";
import api from "../../config/axios.config";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { commentGame, loadGameComments } from "../../redux/modules/games";

interface GameCommentDialogProps {
  onClose: () => void;
}

interface IComment {
  id: number;
  game: number;
  user: number;
  username: string;
  content: string;
  created_at: string;
  updated_at: string;
}

const GameCommentDialog = ({ onClose }: GameCommentDialogProps) => {
  const dispatch = useAppDispatch();
  const { userProfile } = useAppSelector((state) => state.users.user);
  const { Game, Comments } = useAppSelector((state) => state.games);

  const [comment, setComment] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");

  const handleCommentTime = (modified_at: string, created_at: string) => {
    setCreatedAt(new Date(created_at).toLocaleString());
    setUpdatedAt(new Date(modified_at).toLocaleString());
  };

  useEffect(() => {
    dispatch(loadGameComments());
  }, []);

  const handleSubmitComment = () => {
    if (!Game) return;

    const commentData = { comment: comment, gameId: Game.id };
    dispatch(commentGame(commentData));

    setComment("");
  };

  return (
    //TODO Make this Comment component general for games and posts
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
          {/* <i className="fa-solid fa-circle-user text-5xl" /> */}
          <img
            src={userProfile.profile_image}
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
        <div className="mt-3 flex justify-end px-5">
          <button
            onClick={handleSubmitComment}
            disabled={!comment.trim()}
            className="bg-primary rounded px-4 py-1.5 font-medium text-black disabled:opacity-50"
          >
            Submit
          </button>
        </div>

        {/* Comments */}
        <div className="mt-5 py-5">
          <hr className="w-full opacity-15" />

          {Comments.map(({ id, username, content }) => (
            <div key={id}>
              <div className="flex gap-x-5 rounded px-10 py-6">
                <i className="fa-solid fa-circle-user text-4xl" />

                <div className="flex flex-col justify-between gap-y-3">
                  <div>
                    <p className="text-sm font-bold">
                      {username}{" "}
                      <span className="font-extralight opacity-50">
                        @{username}
                      </span>
                    </p>
                    {(createdAt || updatedAt) && (
                      <small>
                        {createdAt !== updatedAt
                          ? `(Edited) ${moment(updatedAt).fromNow()}`
                          : moment(createdAt).fromNow()}
                      </small>
                    )}
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameCommentDialog;
