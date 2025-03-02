import Input from "../components/form/Input";
import Post from "../components/Post";
import Sidebar from "../components/Sidebar";
import Board from "../components/ui/Board";

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
          <i className="fa-solid fa-circle-user mr-6 text-4xl"></i>

          {/* <input
            placeholder="What's on your mind?"
            className="w-full rounded-lg border border-gray-500 px-4 py-2"
          /> */}
          <Input
            placeholder="What's on your mind?"
            className="w-full border-gray-500"
          />
        </div>

        <ul className="h-80 space-y-6">
          <Post username="user1" />
          <Post username="user2" />
          <Post username="user3" />
          <Post username="user4" />
          <Post username="user5" />
          <li className="invisible h-8"></li>
        </ul>

        {/* <div className="absolute bottom-10 h-10 w-135 shadow-[inset_0_-20px_20px_-20px_rgba(0,0,0,0.5)]"></div> */}
      </main>

      <Board title="Leaderboard" className="h-[240px]" height="h-[400px]" />
    </div>
  );
};

export default Home;
