import Sidebar from "../ui/Sidebar";
import Board from "../ui/Board";

const Home = () => {
  return (
    <div
      className="grid w-full gap-10 overflow-y-auto pb-15"
      style={{
        gridTemplateColumns: "1.1fr 3fr 6fr 3fr",
      }}
    >
      <Sidebar />
      <div></div>

      {/* <div></div> */}
      <Board title="Suggestion" height="h-[550px]" />

      <main className="no-scrollbar mt-6 flex flex-col space-y-10">
        <div className="border-primary flex h-24 items-center justify-between rounded-lg border-2 px-8">
          <div className="mr-6 aspect-square h-12 w-12 rounded-full bg-amber-50"></div>
          <div className="flex h-12 w-full items-center rounded-lg border-1 border-gray-500 px-4 text-gray-500">
            What's on your mind?
          </div>
        </div>

        <ul className="h-80 space-y-6">
          <li className="border-primary h-full rounded-lg border-2">post 1</li>
          <li className="border-primary h-full rounded-lg border-2">post 2</li>
          <li className="border-primary h-full rounded-lg border-2">post 3</li>
          <li className="border-primary h-full rounded-lg border-2">post 4</li>
          <li className="border-primary h-full rounded-lg border-2">post 5</li>
          <li className="invisible h-8"></li>
        </ul>

        {/* <div className="absolute bottom-10 h-10 w-135 shadow-[inset_0_-20px_20px_-20px_rgba(0,0,0,0.5)]"></div> */}
      </main>

      <Board title="Leaderboard" className="h-[240px]" height="h-[400px]" />
    </div>
  );
};

export default Home;
