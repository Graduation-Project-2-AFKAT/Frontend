import { ThumbsDown, ThumbsUp } from "lucide-react";
import { useState } from "react";

interface GameCommentDialogProps {
  onClose: () => void;
  gameId?: string;
}

const GameCommentDialog = ({
  onClose,
  gameId = "1",
}: GameCommentDialogProps) => {
  const [comment, setComment] = useState("");

  const handleSubmitComment = () => {
    // Here you would handle the comment submission
    console.log("Submitting comment:", comment, "for game:", gameId);
    // Clear the comment input
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

        <div className="flex h-fit items-center gap-x-5 px-5">
          <i className="fa-solid fa-circle-user text-5xl" />
          <textarea
            className="w-full rounded-md border border-white/25 p-3 text-sm duration-300 outline-none focus-within:border-white/100"
            rows={1}
            placeholder="Leave a comment..."
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

        {/* Mock comments */}
        <div className="mt-5 py-5">
          <hr className="w-full opacity-15" />

          {/* Comment items - you could map these from an array */}
          {[1, 2, 3, 4, 5].map((index) => (
            <div key={index}>
              <div className="flex gap-x-2 rounded px-10 py-7">
                <i className="fa-solid fa-circle-user text-4xl" />

                <div className="flex flex-col justify-between gap-y-5">
                  <div>
                    <p className="text-sm font-bold">
                      User{index}{" "}
                      <span className="font-extralight opacity-50">@user</span>
                    </p>
                    <small className="text-xs opacity-50">
                      almost 2 years ago
                    </small>
                  </div>

                  <p className="text-sm">
                    {index % 2 === 0
                      ? "This is a great game!"
                      : "Looking forward to more updates!"}
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
                      <span>{15 - index}</span>
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
