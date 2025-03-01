const Sidebar = () => {
  return (
    <div className="border-primary fixed top-0 z-1 flex h-screen flex-col items-center justify-between border-r-2 bg-[#121015] p-10 px-4 pt-28">
      <div className="relative -top-4 cursor-pointer space-y-6 rounded-lg border-2 border-dashed p-3">
        <div className="hover:bg-primary flex h-12 w-12 items-center justify-center rounded-full border duration-150 hover:cursor-pointer">
          1
        </div>
        <div className="hover:bg-primary flex h-12 w-12 items-center justify-center rounded-full border duration-150 hover:cursor-pointer">
          2
        </div>
        <div className="hover:bg-primary flex h-12 w-12 items-center justify-center rounded-full border duration-150 hover:cursor-pointer">
          3
        </div>
        <div className="hover:bg-primary flex h-12 w-12 items-center justify-center rounded-full border duration-150 hover:cursor-pointer">
          4
        </div>
        <hr />
        <div className="hover:bg-primary flex h-12 w-12 items-center justify-center rounded-full border-2 border-dashed duration-150 hover:cursor-pointer">
          5
        </div>
      </div>
      <div>Bottom</div>
    </div>
  );
};

export default Sidebar;
