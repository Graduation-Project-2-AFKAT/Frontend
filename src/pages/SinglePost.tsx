import { ArrowLeft, Heart, MessageSquare, Share2 } from "lucide-react";
import moment from "moment";
import { Suspense, lazy, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  clearPostComments,
  loadPostById,
  likePost,
} from "../redux/modules/posts";

const PostCommentDialog = lazy(() => import("../components/PostCommentDialog"));

const SinglePost = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { isLoading } = useAppSelector((state) => state.loading);
  const { currentPost } = useAppSelector((state) => state.posts);

  const [showCommentDialog, setShowCommentDialog] = useState<boolean>(false);
  const [showShareModal, setShowShareModal] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likesCount, setLikesCount] = useState<number>(0);

  useEffect(() => {
    if (id) {
      dispatch(loadPostById(parseInt(id)));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (currentPost) {
      setIsLiked(currentPost.is_liked_by_user);
      setLikesCount(currentPost.likes_count);
    }
  }, [currentPost]);

  const handleLikePost = () => {
    if (currentPost) {
      const likes = isLiked ? likesCount - 1 : likesCount + 1;
      setLikesCount(likes);
      setIsLiked((prev) => !prev);
      dispatch(likePost(currentPost.id.toString()));
    }
  };

  const handleShare = () => {
    setShowShareModal(true);
  };

  if (isLoading) {
    return (
      <main className="h-full w-full overflow-y-auto">
        <div className="mx-auto max-w-4xl px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className="bg-base-300 h-8 w-32 rounded" />
            <div className="bg-base-200 rounded-lg p-6">
              <div className="bg-base-300 mb-4 h-6 w-3/4 rounded" />
              <div className="bg-base-300 mb-4 h-64 w-full rounded" />
              <div className="space-y-2">
                <div className="bg-base-300 h-4 w-full rounded" />
                <div className="bg-base-300 h-4 w-5/6 rounded" />
                <div className="bg-base-300 h-4 w-4/6 rounded" />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!currentPost) {
    return (
      <main className="h-full w-full overflow-y-auto">
        <div className="mx-auto max-w-4xl px-4 py-8">
          <div className="text-center">
            <h1 className="mb-4 text-3xl font-bold">Post Not Found</h1>
            <p className="text-base-content/70 mb-6">
              The post you're looking for doesn't exist or has been removed.
            </p>
            <Link
              to="/"
              className="bg-primary hover:bg-primary/80 text-primary-content inline-flex items-center gap-2 rounded-lg px-6 py-3 font-medium"
            >
              <ArrowLeft size={20} />
              Back to Home
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const {
    username,
    user_id,
    created_at,
    modified_at,
    published_at,
    user_profile_image,
    title,
    content,
    image,
    theme,
    theme_zoom_number,
  } = currentPost;

  const modified = new Date(modified_at).toLocaleString();
  const created = new Date(created_at).toLocaleString();

  const isScheduled = !moment(published_at)
    .fromNow()
    .split(" ")
    .includes("ago");

  return (
    <main className="h-full w-full overflow-y-auto">
      <div className="mx-auto max-w-4xl px-4 py-8">
        {/* Back button */}
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="text-primary hover:text-primary/80 flex items-center gap-2 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>
        </div>

        {/* Post content */}
        <article
          className={`${!theme ? "border-white/10" : "border-0"} bg-base-content/5 overflow-hidden rounded-xl border bg-cover shadow-lg`}
          style={{
            backgroundImage: theme ? `url('${theme}')` : "none",
            backgroundPosition: "center",
            backgroundSize: `${theme_zoom_number}%`,
          }}
        >
          {theme && (
            <div className="absolute inset-0 -z-1 rounded-xl bg-black/50" />
          )}

          {/* Header */}
          <div className={`${theme ? "bg-black/50" : ""} p-6`}>
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link to={`/profile/${user_id}`}>
                  <img
                    src={user_profile_image}
                    alt={`${username}'s profile`}
                    className={`${theme ? "drop-shadow-[1px_1px_3px_rgba(0,0,0,1)]" : ""} h-12 w-12 rounded-full border border-white object-cover`}
                  />
                </Link>
                <div>
                  <Link
                    to={`/profile/${user_id}`}
                    className={`${theme ? "drop-shadow-[1px_1px_1px_rgba(0,0,0,1)]" : ""} font-bold hover:underline`}
                  >
                    @{username}
                  </Link>
                  <div
                    className={`${theme ? "drop-shadow-[1px_1px_2px_rgba(0,0,0,1)]" : ""} text-base-content/70 text-sm`}
                  >
                    {isScheduled ? (
                      <span>Coming {moment(published_at).fromNow()}</span>
                    ) : (
                      <span>
                        {modified !== created
                          ? `(Edited) ${moment(modified_at).fromNow()}`
                          : moment(created_at).fromNow()}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <button
                onClick={handleShare}
                className={`${theme ? "drop-shadow-[1px_1px_5px_rgba(0,0,0,1)]" : ""} rounded-full p-2 transition-colors hover:bg-white/10`}
              >
                <Share2 size={20} />
              </button>
            </div>

            {/* Title */}
            <h1
              className={`${theme ? "font-bold drop-shadow-[1px_1px_3px_rgba(0,0,0,1)]" : ""} mb-6 text-center text-3xl font-bold`}
            >
              {title}
            </h1>
          </div>

          {/* Image */}
          {image && (
            <div className="px-6">
              <img
                src={image}
                alt={image.split("/").pop()}
                className="max-h-96 w-full rounded-lg border border-white/20 object-cover"
                loading="lazy"
              />
            </div>
          )}

          {/* Content */}
          {content && (
            <div
              className={`${theme ? "drop-shadow-[1px_4px_2px_rgba(0,0,0,0.7)]" : ""} ${image ? "bg-neutral-content/5 backdrop-blur-lg" : "bg-base-content/5"} mx-6 my-6 rounded-lg border border-white/20 p-6 text-lg leading-relaxed backdrop-blur-md`}
            >
              <div className="break-words whitespace-pre-wrap">{content}</div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between p-6">
            <div className="flex items-center gap-6">
              <button
                onClick={handleLikePost}
                className={`${theme ? "drop-shadow-[1px_1px_5px_rgba(0,0,0,1)]" : ""} flex items-center gap-2 transition-transform hover:scale-105`}
              >
                <Heart
                  fill={isLiked ? "white" : "transparent"}
                  className="h-6 w-6"
                />
                <span
                  className={`${theme ? "font-bold drop-shadow-[1px_1px_1px_rgba(0,0,0,1)]" : ""} font-medium`}
                >
                  {likesCount}
                </span>
              </button>

              <button
                onClick={() => setShowCommentDialog(true)}
                className={`${theme ? "drop-shadow-[1px_1px_5px_rgba(0,0,0,1)]" : ""} flex items-center gap-2 transition-transform hover:scale-105`}
              >
                <MessageSquare
                  fill={showCommentDialog ? "white" : "transparent"}
                  className="h-6 w-6"
                />
                <span
                  className={`${theme ? "font-bold drop-shadow-[1px_1px_1px_rgba(0,0,0,1)]" : ""}`}
                >
                  Comments
                </span>
              </button>
            </div>
          </div>
        </article>
      </div>

      {/* Comment Dialog */}
      {showCommentDialog && (
        <Suspense
          fallback={
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
              <div className="flex items-center gap-2">
                <div className="border-primary h-6 w-6 animate-spin rounded-full border-t-2 border-b-2"></div>
                <span>Loading comments...</span>
              </div>
            </div>
          }
        >
          <PostCommentDialog
            post={currentPost}
            onClose={() => {
              dispatch(clearPostComments());
              setShowCommentDialog(false);
            }}
          />
        </Suspense>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setShowShareModal(false)}
        >
          <div
            className="w-80 rounded-lg bg-[#29282D] p-6 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold">Share Post</h3>
              <button
                className="hover:bg-error/50 h-8 w-8 rounded-full border p-1"
                onClick={() => setShowShareModal(false)}
              >
                <i className="fa-solid fa-times"></i>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                className="flex items-center justify-center gap-2 rounded-lg bg-[#1877F2] p-3 text-white hover:bg-[#1877F2]/90"
                onClick={() => {
                  window.open(
                    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                      window.location.href,
                    )}`,
                    "_blank",
                  );
                  setShowShareModal(false);
                }}
              >
                <i className="fa-brands fa-facebook text-xl"></i>
                <span>Facebook</span>
              </button>

              <button
                className="flex items-center justify-center gap-2 rounded-lg bg-[#1DA1F2] p-3 text-white hover:bg-[#1DA1F2]/90"
                onClick={() => {
                  window.open(
                    `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                      window.location.href,
                    )}&text=${encodeURIComponent(`Check out this post: ${title}`)}`,
                    "_blank",
                  );
                  setShowShareModal(false);
                }}
              >
                <i className="fa-brands fa-twitter text-xl"></i>
                <span>Twitter</span>
              </button>

              <button
                className="flex items-center justify-center gap-2 rounded-lg bg-[#FF4500] p-3 text-white hover:bg-[#FF4500]/90"
                onClick={() => {
                  window.open(
                    `https://www.reddit.com/submit?url=${encodeURIComponent(
                      window.location.href,
                    )}&title=${encodeURIComponent(title)}`,
                    "_blank",
                  );
                  setShowShareModal(false);
                }}
              >
                <i className="fa-brands fa-reddit text-xl"></i>
                <span>Reddit</span>
              </button>

              <button
                className="flex items-center justify-center gap-2 rounded-lg bg-[#0077B5] p-3 text-white hover:bg-[#0077B5]/90"
                onClick={() => {
                  window.open(
                    `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                      window.location.href,
                    )}&title=${encodeURIComponent(title)}`,
                    "_blank",
                  );
                  setShowShareModal(false);
                }}
              >
                <i className="fa-brands fa-linkedin text-xl"></i>
                <span>LinkedIn</span>
              </button>

              <button
                className="col-span-2 flex items-center justify-center gap-2 rounded-lg bg-[#D44638] p-3 text-white hover:bg-[#D44638]/90"
                onClick={() => {
                  window.location.href = `mailto:?subject=${encodeURIComponent(
                    `Check out this post: ${title}`,
                  )}&body=${encodeURIComponent(
                    `I thought you might be interested in this post: ${window.location.href}`,
                  )}`;
                  setShowShareModal(false);
                }}
              >
                <i className="fa-solid fa-envelope text-xl"></i>
                <span>Email</span>
              </button>

              <button
                className="col-span-2 flex items-center justify-center gap-2 rounded-lg border border-white/20 p-3 hover:bg-white/10"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  setShowShareModal(false);
                }}
              >
                <i className="fa-solid fa-link text-xl"></i>
                <span>Copy Link</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default SinglePost;
