const Sidebar = () => {
  return (
    <div className="border-r-primary group fixed top-0 -left-72 z-1 flex h-screen w-96 flex-col items-end justify-between border-r-2 bg-[#121015] p-10 px-4 pt-28 duration-300 ease-in hover:translate-x-40">
      <div className="border-primary hover:shadow-primary/25 relative -top-4 space-y-6 rounded-lg border-2 p-3 text-xl duration-300 ease-in group-hover:-translate-x-1 group-hover:pr-40 hover:shadow-lg">
        <div className="hover:text-primary group relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#292929] duration-150 hover:cursor-pointer">
          <i className="fa-solid fa-house"></i>
          <span className="absolute left-14 -translate-x-10 text-xs whitespace-nowrap opacity-0 transition-all duration-300 ease-in group-hover:translate-x-0 group-hover:text-lg group-hover:opacity-100 group-[.group:hover]:translate-x-0 group-[.group:hover]:opacity-100">
            Home
          </span>
        </div>
        <div className="hover:text-primary group relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#292929] duration-150 hover:cursor-pointer">
          <i className="fa-solid fa-gamepad"></i>
          <span className="absolute left-14 -translate-x-10 text-xs whitespace-nowrap opacity-0 transition-all duration-300 ease-in group-hover:translate-x-0 group-hover:text-lg group-hover:opacity-100 group-[.group:hover]:translate-x-0 group-[.group:hover]:opacity-100">
            Games
          </span>
        </div>
        <div className="hover:text-primary group relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#292929] duration-150 hover:cursor-pointer">
          <i className="fa-solid fa-paintbrush"></i>
          <span className="absolute left-14 -translate-x-10 text-xs whitespace-nowrap opacity-0 transition-all duration-300 ease-in group-hover:translate-x-0 group-hover:text-lg group-hover:opacity-100 group-[.group:hover]:translate-x-0 group-[.group:hover]:opacity-100">
            Art
          </span>
        </div>
        <div className="hover:text-primary group relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#292929] duration-150 hover:cursor-pointer">
          <i className="fa-solid fa-award"></i>
          <span className="absolute left-14 -translate-x-10 text-xs whitespace-nowrap opacity-0 transition-all duration-300 ease-in group-hover:translate-x-0 group-hover:text-lg group-hover:opacity-100 group-[.group:hover]:translate-x-0 group-[.group:hover]:opacity-100">
            Awards
          </span>
        </div>
        <hr />
        <div className="hover:text-primary group relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 border-dashed duration-150 hover:cursor-pointer">
          <i className="fa-solid fa-plus"></i>
          <span className="absolute left-14 -translate-x-10 text-xs whitespace-nowrap opacity-0 transition-all duration-300 ease-in group-hover:translate-x-0 group-hover:text-lg group-hover:opacity-100 group-[.group:hover]:translate-x-0 group-[.group:hover]:opacity-100">
            Add New
          </span>
        </div>
      </div>

      <div className="flex flex-col items-center space-y-6 pr-5 text-2xl duration-300 ease-in group-hover:-translate-x-38">
        <a href="">
          <i className="fa-solid fa-earth-americas"></i>
          <span className="absolute left-14 -translate-x-10 pt-0.5 text-xs whitespace-nowrap opacity-0 transition-all duration-300 ease-in group-hover:translate-x-0 group-hover:text-lg group-hover:opacity-100 group-[.group:hover]:translate-x-0 group-[.group:hover]:opacity-100">
            Language
          </span>
        </a>
        <a href="">
          <i className="fa-solid fa-gear"></i>
          <span className="absolute left-14 -translate-x-10 pt-0.5 text-xs whitespace-nowrap opacity-0 transition-all duration-300 ease-in group-hover:translate-x-0 group-hover:text-lg group-hover:opacity-100 group-[.group:hover]:translate-x-0 group-[.group:hover]:opacity-100">
            Settings
          </span>
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
