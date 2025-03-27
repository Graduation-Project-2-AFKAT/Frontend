interface IProps {
  title: string;
  className?: string;
  itemsCount?: number;
}

const Board = ({
  title = "Default Title",
  className = "",
  itemsCount = 4,
}: IProps) => {
  return (
    <aside
      className={`sticky top-0 hidden flex-col space-y-14 rounded-lg bg-[#2A2731] p-8 pb-10 shadow-md drop-shadow-md lg:flex ${className}`}
    >
      <div className="text-3xl underline underline-offset-[15px]">{title}</div>

      <div className={`px-4`}>
        <ul className="list-none space-y-10">
          {Array.from({ length: itemsCount }).map((_, index) => (
            <li key={index} className="flex items-center gap-2">
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
