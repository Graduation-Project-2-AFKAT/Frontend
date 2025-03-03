interface IProps {
  title: string;
  className?: string;
  height?: string;
}

const Board = ({ title = "Default Title", className = "", height }: IProps) => {
  return (
    <aside
      className={`${height} border-primary sticky top-6 flex flex-col space-y-14 rounded-lg border-2 p-8`}
    >
      <div className="text-3xl underline underline-offset-[15px]">{title}</div>

      <div
        className={`${className} scrollbar snap-y snap-mandatory overflow-auto scroll-smooth rounded-b-sm p-1 shadow-[inset_0_-20px_20px_-20px_rgba(0,0,0,0.4)]`}
      >
        <ul className="list-none space-y-10">
          <li className="flex items-center gap-2">
            <span className="h-16 w-16 snap-start bg-white"></span>
            item 1
          </li>
          <li className="flex items-center gap-2">
            <span className="h-16 w-16 snap-start bg-white"></span>
            item 2
          </li>
          <li className="flex items-center gap-2">
            <span className="h-16 w-16 snap-start bg-white"></span>
            item 3
          </li>
          <li className="flex items-center gap-2">
            <span className="h-16 w-16 snap-start bg-white"></span>
            item 4
          </li>
          <li className="flex items-center gap-2">
            <span className="h-16 w-16 snap-start bg-white"></span>
            item 5
          </li>
          <li className="flex items-center gap-2">
            <span className="h-16 w-16 snap-start bg-white"></span>
            item 5
          </li>
          <li className="flex items-center gap-2">
            <span className="h-16 w-16 snap-start bg-white"></span>
            item 5
          </li>
          <li className="flex items-center gap-2">
            <span className="h-16 w-16 snap-start bg-white"></span>
            item 5
          </li>{" "}
          <li className="flex items-center gap-2">
            <span className="h-16 w-16 snap-start bg-white"></span>
            item 5
          </li>{" "}
          <li className="flex items-center gap-2">
            <span className="h-16 w-16 snap-start bg-white"></span>
            item 5
          </li>{" "}
          <li className="flex items-center gap-2">
            <span className="h-16 w-16 snap-start bg-white"></span>
            item 5
          </li>{" "}
          <li className="flex items-center gap-2">
            <span className="h-16 w-16 snap-start bg-white"></span>
            item 5
          </li>{" "}
          <li className="flex items-center gap-2">
            <span className="h-16 w-16 snap-start bg-white"></span>
            item 5
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Board;
