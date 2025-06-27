import debounce from "lodash.debounce";
import { Heart, MessageSquare } from "lucide-react";
import moment from "moment";
import { Suspense, lazy, memo, useCallback, useEffect, useState } from "react"; // Add useEffect
import { Link } from "react-router";
import { IPost } from "../interfaces";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  clearPostComments,
  deletePost,
  likePost,
} from "../redux/modules/posts";

const PostCommentDialog = lazy(() => import("./PostCommentDialog"));

interface IProps {
  post: IPost;
}

const Post = ({ post }: IProps) => {
  const {
    id,
    username,
    user_id,
    created_at,
    modified_at,
    published_at,
    user_profile_image,
    is_liked_by_user,
    likes_count,
  } = post;

  const modified = new Date(modified_at).toLocaleString();
  const created = new Date(created_at).toLocaleString();

  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.users);

  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(is_liked_by_user);
  const [likesCount, setLikesCount] = useState<number>(likes_count);
  const [debouncedLike, setDebouncedLike] = useState<boolean>(is_liked_by_user);
  const [showShareModal, setShowShareModal] = useState<boolean>(false);

  const debouncedLikeHandler = useCallback(
    (likeState: boolean) => {
      const debouncedFn = debounce((state: boolean) => {
        setDebouncedLike(state);
      }, 500);
      debouncedFn(likeState);
      return debouncedFn;
    },
    [setDebouncedLike],
  );

  useEffect(() => {
    const debouncedFn = debouncedLikeHandler(isLiked);

    return () => {
      debouncedFn.cancel();
    };
  }, [isLiked, debouncedLikeHandler]);

  useEffect(() => {
    if (debouncedLike !== is_liked_by_user) {
      dispatch(likePost(id.toString()));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedLike, id, dispatch]);

  const isScheduled = !moment(published_at)
    .fromNow()
    .split(" ")
    .includes("ago");

  const handleLikePost = () => {
    const likes = isLiked ? likesCount - 1 : likesCount + 1;
    setLikesCount(likes);
    setIsLiked((prev) => !prev);
  };

  const handleDeletePost = () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      dispatch(deletePost(post.id));
      setShowOptions(false);
    }
  };

  const openShareModel = () => {
    setShowShareModal(true);
    setShowOptions(false);
  };

  return (
    <>
      <li
        className={`${!post.theme ? "border-white/10" : "border-0"} outline-primary bg-base-content/5 grid border bg-cover shadow-md drop-shadow-md duration-50 md:rounded-xl lg:hover:outline-2 lg:hover:outline-dashed`}
        style={{
          gridTemplate: `75px auto ${post.image ? "auto" : "auto"} auto auto / 1fr 1fr 1fr`,
          backgroundImage: post.theme ? `url('${post.theme}')` : "none",
          backgroundPosition: "center",
          backgroundSize: `${post.theme_zoom_number}%`,
        }}
      >
        <div
          className={`${post.theme ? "bg-black/50" : ""} pointer-events-none fixed inset-0 -z-1 rounded-xl`}
        />
        <div className="col-span-3 flex h-fit justify-between px-5 pt-5">
          <div className="group flex items-center duration-150">
            <Link to={`/profile/${user_id}`} className="mr-3">
              <img
                src={user_profile_image}
                className={`${post.theme ? "drop-shadow-[1px_1px_3px_rgba(0,0,0,1)]" : ""} fa-solid fa-circle-user aspect-square w-12 rounded-full border border-white object-cover`}
              />
            </Link>
            <Link
              to={`/profile/${user_id}`}
              className={`${post.theme ? "drop-shadow-[1px_1px_1px_rgba(0,0,0,1)]" : ""} cursor-pointer text-sm font-bold hover:underline`}
            >
              <span className="inline-block max-w-[250px] truncate">
                @{username}
              </span>
            </Link>
          </div>
          <div
            className={`${post.theme ? "drop-shadow-[1px_1px_2px_rgba(0,0,0,1)]" : ""} flex items-center gap-x-3 font-bold`}
          >
            {isScheduled ? (
              <small>Coming {moment(published_at).fromNow()}</small>
            ) : (
              (modified || created) && (
                <small>
                  {modified !== created
                    ? `(Edited) ${moment(modified_at).fromNow()}`
                    : moment(created_at).fromNow()}
                </small>
              )
            )}
          </div>
        </div>
        <div className="col-span-3 text-center text-2xl font-bold tracking-wide">
          <span
            className={`${post.theme ? "font-bold drop-shadow-[1px_1px_3px_rgba(0,0,0,1)]" : ""} mt-1 mb-4 inline-block max-w-full break-words`}
          >
            {post.title}
          </span>
        </div>
        {post.image && (
          <div className="col-span-3 mx-7 flex h-full items-center justify-center text-center">
            <img
              src={post.image}
              alt={post.image.split("/").pop()}
              className={`max-h-75 w-auto rounded-lg border border-white/20 object-fill`}
              width={800}
              height={300}
              loading="lazy"
            />
          </div>
        )}
        {post.content && (
          <div
            className={`${post.theme ? "drop-shadow-[1px_4px_2px_rgba(0,0,0,0.7)]" : ""} ${post.image ? "text-md bg-neutral-content/5 backdrop-blur-lg" : "bg-base-content/5 min-h-50 text-xl"} col-span-3 mx-7 my-5 rounded-lg border border-white/20 px-5 py-4 text-base break-words backdrop-blur-md`}
          >
            {post.content}
          </div>
        )}
        <div
          className={`${post.content ? "mt-2" : "mt-6"} col-span-2 flex items-end justify-start px-5 pb-7`}
        >
          <div className="flex space-x-8 px-2">
            <button className="group flex space-x-2" onClick={handleLikePost}>
              <Heart
                fill={`${isLiked ? "white" : "transparent"}`}
                className={`${post.theme ? "drop-shadow-[1px_1px_5px_rgba(0,0,0,1)]" : ""}`}
              />
              <span
                className={`${post.theme ? "font-bold drop-shadow-[1px_1px_1px_rgba(0,0,0,1)]" : ""}`}
              >
                {likesCount}
              </span>
            </button>

            <button
              aria-label="View comments"
              className="group flex space-x-2"
              onClick={() => setShowDialog(true)}
            >
              <MessageSquare
                fill={showDialog ? "white" : "transparent"}
                className={`${post.theme ? "drop-shadow-[1px_1px_5px_rgba(0,0,0,1)]" : ""}`}
              />
            </button>
          </div>
        </div>
        <div className="relative mt-2 flex items-end justify-end px-10 pb-7">
          <button
            onClick={() => setShowOptions(!showOptions)}
            className="focus:outline-none"
          >
            <i
              className={`${post.theme ? "drop-shadow-[1px_1px_5px_rgba(0,0,0,1)]" : ""} fa-solid fa-ellipsis-vertical cursor-pointer`}
            />
          </button>

          {showOptions && (
            <div className="absolute right-8 bottom-full mb-1 w-32 rounded-md border border-white/20 bg-[#29282D] shadow-lg">
              <ul>
                <li
                  className="cursor-pointer px-4 py-2 text-sm hover:bg-blue-500/20"
                  onClick={openShareModel}
                >
                  <i className="fa-solid fa-share mr-2 text-blue-500"></i>
                  Share
                </li>
                {post.user_id === user?.id && (
                  <li
                    className="cursor-pointer px-4 py-2 text-sm hover:bg-red-500/20"
                    onClick={handleDeletePost}
                  >
                    <i className="fa-solid fa-trash-can mr-2 text-red-500"></i>
                    Delete Post
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </li>
      {showDialog && (
        <Suspense
          fallback={
            <div className="absolute inset-0 top-0 z-50 mb-0 flex items-center justify-center bg-black/50">
              <div className="flex items-center gap-2">
                <div className="border-primary h-6 w-6 animate-spin rounded-full border-t-2 border-b-2"></div>
                <span>Loading comments...</span>
              </div>
            </div>
          }
        >
          <PostCommentDialog
            post={post}
            onClose={() => {
              dispatch(clearPostComments());
              setShowDialog(false);
            }}
          />
        </Suspense>
      )}
      {showShareModal && (
        <div
          className="fixed inset-0 z-50 mb-0 flex items-center justify-center bg-black/50"
          onClick={() => setShowShareModal(false)}
        >
          <div
            className="w-80 rounded-lg bg-[#29282D] p-4 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-lg font-bold">Share Post</h3>
              <button
                className="hover:bg-error/50 h-8 w-8 rounded-full border p-1"
                onClick={() => setShowShareModal(false)}
              >
                <i className="fa-solid fa-times"></i>
              </button>
            </div>

            <div className="grid grid-cols-2! gap-3">
              <button
                className="flex items-center justify-center gap-2 rounded-lg bg-[#1877F2] p-3 text-white hover:bg-[#1877F2]/90"
                onClick={() => {
                  window.open(
                    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                      window.location.origin + `/post/${post.id}`,
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
                      window.location.origin + `/post/${post.id}`,
                    )}&text=${encodeURIComponent(`Check out this post: ${post.title}`)}`,
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
                      window.location.origin + `/post/${post.id}`,
                    )}&title=${encodeURIComponent(post.title)}`,
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
                      window.location.origin + `/post/${post.id}`,
                    )}&title=${encodeURIComponent(post.title)}`,
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
                    `Check out this post: ${post.title}`,
                  )}&body=${encodeURIComponent(
                    `I thought you might be interested in this post: ${window.location.origin}/posts/${post.id}`,
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
                  navigator.clipboard.writeText(
                    window.location.origin + `/post/${post.id}`,
                  );
                  // You could add a toast notification here
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
    </>
  );
};

export default memo(Post);
