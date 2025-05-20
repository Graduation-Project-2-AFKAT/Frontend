import { Heart, MessageSquare } from "lucide-react";
import { IPost } from "../interfaces";
import { Link } from "react-router";
import moment from "moment";
import { useAppSelector } from "../redux/hooks";

interface IProps {
  post: IPost;
  handleFollow?: () => void;
}

const Post = ({ post, handleFollow }: IProps) => {
  const { id } = useAppSelector((state) => state.users.user);
  const { username, user_id, modified_at, created_at, user_profile_image } =
    post;

  const modified = new Date(modified_at).toLocaleString();
  const created = new Date(created_at).toLocaleString();

  return (
    <li
      className="outline-primary grid aspect-[9/10] border border-white/10 bg-[#2A2731] bg-cover shadow-md drop-shadow-md duration-50 md:rounded-xl lg:hover:outline-2 lg:hover:outline-dashed"
      style={{
        gridTemplate: "auto auto 1fr auto auto / 1fr 1fr 1fr",
        backgroundImage: post.theme ? `url('${post.theme}')` : "none",
        backgroundPosition: "center",
        backgroundSize: `${post.theme_zoom_number}%`,
      }}
    >
      <div
        className={`${post.theme ? "bg-black/25" : ""} pointer-events-none fixed inset-0 -z-1 rounded-xl`}
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
            <span>@{username}</span>
          </Link>
        </div>
        <div
          className={`${post.theme ? "drop-shadow-[1px_1px_2px_rgba(0,0,0,1)]" : ""} flex items-center gap-x-3 font-bold`}
        >
          {(modified || created) && (
            <small>
              {modified !== created
                ? `(Edited) ${moment(modified_at).fromNow()}`
                : moment(created_at).fromNow()}
            </small>
          )}
          {user_id !== id && (
            <button
              className="rounded-sm border border-amber-50 bg-black/20 px-3 py-1 text-sm font-medium transition-opacity hover:opacity-70"
              onClick={handleFollow}
            >
              Follow
            </button>
          )}
        </div>
      </div>
      <div className="col-span-3 py-2 pb-3 pl-5 text-center text-2xl font-bold tracking-wide">
        <span
          className={`${post.theme ? "font-bold drop-shadow-[1px_1px_3px_rgba(0,0,0,1)]" : ""} inline-block max-w-full px-2 break-words`}
        >
          {post.title}
        </span>
      </div>
      {post.image && (
        <div className="col-span-3 flex h-full items-center justify-center px-8 py-2 text-center">
          <img
            src={post.image}
            alt={post.image.split("/").pop()}
            className="h-full rounded-lg border border-white/20 object-fill"
          />
        </div>
      )}
      <div
        className={`${post.theme ? "drop-shadow-[1px_4px_2px_rgba(0,0,0,0.7)]" : ""} ${post.image ? "text-md" : "text-xl"} col-span-3 mx-8 my-5 rounded-lg border border-white/20 bg-[#2A2731] px-5 py-4`}
      >
        {post.content}
      </div>
      {/* //TODO */}
      <div className="col-span-3 flex items-end justify-end px-5 pb-7">
        <div className="flex space-x-8 px-2">
          <span className="group flex space-x-2">
            <Heart
              fill="white"
              className={`${post.theme ? "drop-shadow-[1px_1px_5px_rgba(0,0,0,1)]" : ""}`}
            />
            <span
              className={`${post.theme ? "font-bold drop-shadow-[1px_1px_1px_rgba(0,0,0,1)]" : ""}`}
            >
              Like
            </span>
          </span>

          <span className="group flex space-x-2">
            <MessageSquare
              fill="white"
              className={`${post.theme ? "drop-shadow-[1px_1px_5px_rgba(0,0,0,1)]" : ""}`}
            />
            <span
              className={`${post.theme ? "font-bold drop-shadow-[1px_1px_1px_rgba(0,0,0,1)]" : ""}`}
            >
              Comment
            </span>
          </span>
        </div>
      </div>
    </li>
  );
};

export default Post;
