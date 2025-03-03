interface IProps {
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar = ({ showSidebar, setShowSidebar }: IProps) => {
  return (
    <>
      <div
        className={`${showSidebar ? "opacity-100" : "opacity-0"} fixed inset-0 z-5 bg-black/25 backdrop-blur-[2px] duration-300 ease-in lg:hidden`}
        onClick={() => setShowSidebar(false)}
      />
      <aside
        className={`border-r-primary group fixed top-0 ${showSidebar ? "-left-0" : "-left-72"} text-md z-10 flex h-screen w-70 flex-col items-end justify-between border-r-2 bg-[#121015] p-8 pt-28 duration-300 ease-in lg:-left-64 lg:w-96 lg:text-2xl lg:hover:translate-x-40`}
      >
        <div
          className={`border-primary lg:hover:shadow-primary/25 lg:space-y- relative -top-4 w-full space-y-5 rounded-lg border-2 p-6 whitespace-nowrap duration-300 ease-in lg:left-4 lg:w-fit lg:group-hover:left-0 lg:group-hover:-translate-x-1 lg:group-hover:pr-38 lg:hover:shadow-lg`}
        >
          <div className="lg:hover:text-primary group relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#292929] duration-150 lg:h-12 lg:w-12">
            <i className="fa-solid fa-house"></i>
            <span
              className={`absolute left-26 -translate-x-10 transition-all duration-300 ease-in lg:left-16 lg:text-xs lg:opacity-0 lg:group-hover:translate-x-0 lg:group-hover:text-lg lg:group-hover:opacity-100`}
            >
              Home
            </span>
          </div>
          <div className="lg:hover:text-primary group relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#292929] duration-150 hover:cursor-pointer lg:h-12 lg:w-12">
            <i className="fa-solid fa-gamepad"></i>
            <span className="absolute left-26 -translate-x-10 transition-all duration-300 ease-in lg:left-16 lg:text-xs lg:opacity-0 lg:group-hover:translate-x-0 lg:group-hover:text-lg lg:group-hover:opacity-100">
              Games
            </span>
          </div>
          <div className="lg:hover:text-primary group relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#292929] duration-150 hover:cursor-pointer lg:h-12 lg:w-12">
            <i className="fa-solid fa-paintbrush"></i>
            <span className="absolute left-26 -translate-x-10 transition-all duration-300 ease-in lg:left-16 lg:text-xs lg:opacity-0 lg:group-hover:translate-x-0 lg:group-hover:text-lg lg:group-hover:opacity-100">
              Art
            </span>
          </div>
          <div className="lg:hover:text-primary group relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#292929] duration-150 hover:cursor-pointer lg:h-12 lg:w-12">
            <i className="fa-solid fa-award"></i>
            <span className="absolute left-26 -translate-x-10 transition-all duration-300 ease-in lg:left-16 lg:text-xs lg:opacity-0 lg:group-hover:translate-x-0 lg:group-hover:text-lg lg:group-hover:opacity-100">
              Awards
            </span>
          </div>
          <hr />
          <div className="lg:hover:text-primary group relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 border-dashed duration-150 hover:cursor-pointer lg:h-12 lg:w-12">
            <i className="fa-solid fa-plus"></i>
            <span className="absolute left-26 -translate-x-10 transition-all duration-300 ease-in lg:left-16 lg:text-xs lg:opacity-0 lg:group-hover:translate-x-0 lg:group-hover:text-lg lg:group-hover:opacity-100">
              Add New
            </span>
          </div>
        </div>

        <div className="-mx-8 flex w-full flex-col items-start space-y-6 whitespace-nowrap duration-300 ease-in lg:mx-0 lg:w-fit lg:items-center lg:pr-5 lg:group-hover:-translate-x-38">
          <a href="">
            <i className="fa-solid fa-earth-americas"></i>
            <span className="absolute left-38 -translate-x-10 pt-0.5 transition-all duration-300 ease-in lg:left-16 lg:text-xs lg:opacity-0 lg:group-hover:translate-x-0 lg:group-hover:text-lg lg:group-hover:opacity-100">
              Language
            </span>
          </a>
          <a href="">
            <i className="fa-solid fa-gear"></i>
            <span className="absolute left-38 -translate-x-10 pt-0.5 transition-all duration-300 ease-in lg:left-16 lg:text-xs lg:opacity-0 lg:group-hover:translate-x-0 lg:group-hover:text-lg lg:group-hover:opacity-100">
              Settings
            </span>
          </a>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

//* Original code for lg and above screen
// return (
//   <aside className="border-r-primary group fixed top-0 -left-72 z-1 hidden h-screen w-96 flex-col items-end justify-between border-r-2 bg-[#121015] p-10 px-4 pt-28 duration-300 ease-in hover:translate-x-40 md:flex">
//     <div className="border-primary hover:shadow-primary/25 relative -top-4 space-y-6 rounded-lg border-2 p-3 text-xl duration-300 ease-in group-hover:-translate-x-1 group-hover:pr-40 hover:shadow-lg">
//       <div className="hover:text-primary group relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#292929] duration-150 hover:cursor-pointer">
//         <i className="fa-solid fa-house"></i>
//         <span className="absolute left-14 -translate-x-10 text-xs whitespace-nowrap opacity-0 transition-all duration-300 ease-in group-hover:translate-x-0 group-hover:text-lg group-hover:opacity-100 group-[.group:hover]:translate-x-0 group-[.group:hover]:opacity-100">
//           Home
//         </span>
//       </div>
//       <div className="hover:text-primary group relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#292929] duration-150 hover:cursor-pointer">
//         <i className="fa-solid fa-gamepad"></i>
//         <span className="absolute left-14 -translate-x-10 text-xs whitespace-nowrap opacity-0 transition-all duration-300 ease-in group-hover:translate-x-0 group-hover:text-lg group-hover:opacity-100 group-[.group:hover]:translate-x-0 group-[.group:hover]:opacity-100">
//           Games
//         </span>
//       </div>
//       <div className="hover:text-primary group relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#292929] duration-150 hover:cursor-pointer">
//         <i className="fa-solid fa-paintbrush"></i>
//         <span className="absolute left-14 -translate-x-10 text-xs whitespace-nowrap opacity-0 transition-all duration-300 ease-in group-hover:translate-x-0 group-hover:text-lg group-hover:opacity-100 group-[.group:hover]:translate-x-0 group-[.group:hover]:opacity-100">
//           Art
//         </span>
//       </div>
//       <div className="hover:text-primary group relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#292929] duration-150 hover:cursor-pointer">
//         <i className="fa-solid fa-award"></i>
//         <span className="absolute left-14 -translate-x-10 text-xs whitespace-nowrap opacity-0 transition-all duration-300 ease-in group-hover:translate-x-0 group-hover:text-lg group-hover:opacity-100 group-[.group:hover]:translate-x-0 group-[.group:hover]:opacity-100">
//           Awards
//         </span>
//       </div>
//       <hr />
//       <div className="hover:text-primary group relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 border-dashed duration-150 hover:cursor-pointer">
//         <i className="fa-solid fa-plus"></i>
//         <span className="absolute left-14 -translate-x-10 text-xs whitespace-nowrap opacity-0 transition-all duration-300 ease-in group-hover:translate-x-0 group-hover:text-lg group-hover:opacity-100 group-[.group:hover]:translate-x-0 group-[.group:hover]:opacity-100">
//           Add New
//         </span>
//       </div>
//     </div>

//     <div className="flex flex-col items-center space-y-6 pr-5 text-2xl duration-300 ease-in group-hover:-translate-x-38">
//       <a href="">
//         <i className="fa-solid fa-earth-americas"></i>
//         <span className="absolute left-14 -translate-x-10 pt-0.5 text-xs whitespace-nowrap opacity-0 transition-all duration-300 ease-in group-hover:translate-x-0 group-hover:text-lg group-hover:opacity-100 group-[.group:hover]:translate-x-0 group-[.group:hover]:opacity-100">
//           Language
//         </span>
//       </a>
//       <a href="">
//         <i className="fa-solid fa-gear"></i>
//         <span className="absolute left-14 -translate-x-10 pt-0.5 text-xs whitespace-nowrap opacity-0 transition-all duration-300 ease-in group-hover:translate-x-0 group-hover:text-lg group-hover:opacity-100 group-[.group:hover]:translate-x-0 group-[.group:hover]:opacity-100">
//           Settings
//         </span>
//       </a>
//     </div>
//   </aside>
// );
