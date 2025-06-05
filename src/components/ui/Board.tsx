interface IProps {
  title?: string;
  className?: string;
  headerSize?: string;
  itemsDirection?: "row" | "col";
  itemsCount?: number;
}

const Board = ({
  title = "Default Title",
  className = "",
  headerSize,
  itemsDirection,
  itemsCount = 4, //TODO make maximum itemsCount 4
}: IProps) => {
  return (
    <aside
      className={`sticky top-0 hidden flex-col space-y-10 rounded-lg bg-[#2A2731] p-8 pb-10 shadow-md drop-shadow-md lg:flex ${className}`}
    >
      <div
        className={`${headerSize ? headerSize : "text-2xl"} underline underline-offset-[15px]`}
      >
        {title}
      </div>

      <div>
        <ul
          className={`${itemsDirection === "row" && "no-scrollbar flex justify-around space-x-20 overflow-x-auto px-5 lg:justify-normal lg:px-0"} list-none space-y-5 px-2 xl:block`}
        >
          {Array.from({ length: itemsCount }).map((_, index) => (
            <li key={index} className="flex flex-col items-start gap-2">
              <span className="h-16 w-16 bg-white"></span>
              item {index + 1}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Board;
