import { ThumbsDown, ThumbsUp } from "lucide-react";
import moment from "moment";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { loadAssetComments } from "../../redux/modules/assets";

const ArtComments = () => {
  const dispatch = useAppDispatch();
  const { Asset, Comments } = useAppSelector((state) => state.assets);

  useEffect(() => {
    if (Asset && Comments.length === 0) {
      dispatch(loadAssetComments(Asset.id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Asset]);

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

  if (Comments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-white/10 bg-[#16141C] p-10 text-center">
        <p className="text-lg font-medium">No comments yet</p>
        <p className="mt-2 text-white/70">
          Be the first to share your thoughts about this asset!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Comments ({Comments.length})</h3>

      {Comments.length > 0 &&
        Comments.map(({ id, username, content, created_at, updated_at }) => (
          <div
            key={id}
            className="rounded-lg border border-white/10 bg-[#16141C] p-5"
          >
            <div className="flex gap-x-4">
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`}
                alt={username}
                className="h-10 w-10 rounded-full"
              />

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{username}</p>
                    <p className="text-xs text-white/50">@{username}</p>
                  </div>
                  <span className="text-xs text-white/50">
                    {formatCommentTime(created_at, updated_at)}
                  </span>
                </div>

                <p className="mt-3 text-white/90">{content}</p>

                <div className="mt-4 flex items-center gap-6">
                  <button className="flex items-center gap-1.5 text-white/70 hover:text-white">
                    <ThumbsUp
                      size={16}
                      className="transition-transform hover:-translate-y-0.5"
                    />
                    <span className="text-xs">{15 - id}</span>
                  </button>

                  <button className="flex items-center gap-1.5 text-white/70 hover:text-white">
                    <ThumbsDown
                      size={16}
                      className="transition-transform hover:translate-y-0.5"
                    />
                  </button>

                  <button className="text-xs text-white/70 hover:text-white">
                    Reply
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ArtComments;
