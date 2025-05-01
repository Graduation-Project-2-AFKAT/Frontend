import { Heart, MessageSquare } from "lucide-react";
import { IPost } from "../interfaces";
import moment from "moment";

interface IProps {
  post: IPost;
}

const Post = ({ post }: IProps) => {
  const { username, modified_at, created_at } = post; //TODO created_at or published_at??

  return (
    <li
      className="outline-primary grid aspect-[9/10] bg-[#2A2731] bg-cover shadow-md drop-shadow-md duration-50 md:rounded-xl lg:hover:outline-2 lg:hover:outline-dashed"
      style={{
        gridTemplate: "auto auto 1fr auto auto / 1fr 1fr 1fr",
      }}
    >
      <div className="col-span-3 flex h-fit justify-between px-5 pt-5">
        <div className="group flex items-center duration-150 hover:hover:opacity-70">
          <i className="fa-solid fa-circle-user text-3xl" />
          <span className="pl-2 text-xs font-light">@{username}</span>
        </div>
        <div className="flex items-center gap-x-3">
          {(modified_at || created_at) && (
            <small>
              {modified_at === created_at
                ? `(Edited) ${moment(modified_at).fromNow()}`
                : moment(created_at).fromNow()}
            </small>
          )}
          <button className="rounded-sm border border-amber-50 px-3 py-1 text-sm font-medium duration-150 hover:opacity-70">
            Follow
          </button>
        </div>
      </div>
      <div className="col-span-3 py-2 pl-5 text-2xl font-bold tracking-wide">
        {post.title}
      </div>
      <div className="col-span-3 flex h-full items-center justify-center border text-center">
        <i className="fa-solid fa-play hover:text-primary text-5xl text-gray-300 transition-colors" />
      </div>
      <div className="col-span-3 mx-5 my-5 rounded-lg bg-[#2A2731] px-3 py-4 text-lg">
        {post.content}
      </div>{" "}
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

        {/* <div>
          <i className="fa-solid fa-expand px-2 text-2xl duration-150 hover:opacity-75" />
        </div> */}
      </div>
    </li>
  );
};

export default Post;
