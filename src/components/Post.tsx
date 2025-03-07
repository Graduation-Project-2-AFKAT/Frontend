interface IProps {
  username: string;
}

const Post = ({ username }: IProps) => {
  return (
    <li
      className="outline-primary grid aspect-square bg-[#2A2731] shadow-md drop-shadow-md duration-50 md:rounded-lg lg:hover:outline-2 lg:hover:outline-dashed"
      style={{
        gridTemplate: "1fr 1fr 1fr / 1fr 1fr 1fr",
      }}
    >
      <div className="col-span-3 flex h-fit justify-between p-5">
        <div className="group duration-150 hover:hover:opacity-70">
          <i className="fa-solid fa-circle-user text-3xl"></i>
          <span className="pl-2 text-xs font-light">@{username}</span>
        </div>

        <button className="rounded-sm border border-amber-50 px-3 py-1 text-sm font-medium duration-150 hover:opacity-70">
          Follow
        </button>
      </div>

      <div className="col-span-3 self-center text-center">
        <i className="fa-solid fa-play text-5xl text-gray-300 duration-150 ease-in hover:text-gray-300/70"></i>
      </div>

      <div className="col-span-3 flex items-end justify-between p-5">
        <div className="space-x-8 px-2">
          <span className="group space-x-2">
            <i className="fa-regular fa-heart group-hover:text-primary duration-150"></i>
            <span>Like</span>
          </span>

          <span className="group space-x-2">
            <i className="fa-regular fa-message group-hover:text-primary duration-150"></i>
            <span>Comment</span>
          </span>
        </div>

        <div>
          <i className="fa-solid fa-expand px-2 text-2xl duration-150 hover:opacity-75"></i>
        </div>
      </div>
    </li>
  );
};

export default Post;
