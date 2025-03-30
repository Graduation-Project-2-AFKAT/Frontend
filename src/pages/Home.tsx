import Input from "../components/form/Input";
import Post from "../components/Post";
import Board from "../components/ui/Board";

const Home = () => {
  return (
    <main className="grid w-full overflow-y-auto border pt-10 lg:gap-10 lg:px-10 lg:pl-15">
      {/*//! You think this is a useless line right ? ...Comment it and see how important it is ;) */}
      {/* //* Nah, you can comment it now c: */}
      {/* <div className="hidden lg:block"></div> */}

      <Board
        title="Suggestion"
        className="h-fit border lg:order-1 xl:order-0"
      />

      <section className="space-y-6 scroll-smooth border md:mx-auto md:w-[75%] lg:w-full lg:px-0">
        <div className="lg:border-primary flex h-25 items-center justify-between bg-[#2A2731] px-8 shadow-md drop-shadow-md md:rounded-lg">
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

        <div className="text-md flex items-center justify-between space-x-6 px-[4%] font-bold md:px-0 lg:px-[30%] lg:text-base lg:font-medium">
          <button className="bg-primary w-full rounded-lg py-2">For You</button>
          <button className="border-primary w-full rounded-lg border-2 py-2">
            Following
          </button>
        </div>

        <ul className="mb-25 space-y-6">
          <Post username="user1" />
          <Post username="user2" />
          <Post username="user3" />
          <Post username="user4" />
          <Post username="user5" />
          {/* <li className="invisible h-8"></li> */}
        </ul>

        {/* <div className="absolute bottom-10 h-10 w-135 shadow-[inset_0_-20px_20px_-20px_rgba(0,0,0,0.5)]"></div> */}
      </section>

      <Board
        title="Leaderboard"
        className="h-fit border lg:hidden xl:flex"
        itemsCount={3}
      />
    </main>
  );
};

export default Home;
