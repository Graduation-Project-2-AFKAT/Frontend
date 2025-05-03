import Input from "../components/form/Input";
import Board from "../components/ui/Board";
import Posts from "../components/Posts";
import CreatePostModal from "../components/modals/CreatePostModal";
import { useState } from "react";
import { useAppSelector } from "../redux/hooks";

const Home = () => {
  const { user } = useAppSelector((state) => state.users);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <main className="grid w-full overflow-y-auto pt-10 lg:gap-10 lg:px-10 lg:pl-15">
      {/*//! You think this is a useless line right ? ...Comment it and see how important it is ;) */}
      {/* <div className="hidden lg:block"></div> */}

      {/* Left */}
      <Board
        title="Suggestion"
        className="h-fit border border-white/10 lg:order-1 xl:order-0"
      />

      {/* Main */}
      <section className="space-y-6 md:mx-auto md:w-[75%] lg:w-full lg:px-0">
        <div className="lg:border-primary flex h-25 items-center border border-white/10 bg-[#2A2731] px-5 shadow-md drop-shadow-md md:rounded-lg">
          {/* <i className="fa-solid fa-circle-user mr-6 text-4xl" /> */}
          <img
            src={user?.userProfile.profile_image}
            alt="profile pfp"
            className="w-15 rounded-full"
          />

          <div className="ml-5 w-full">
            <div className="mb-2 text-xs tracking-wide text-white/50">
              Hey @{user?.username}
            </div>
            <Input
              id="search-bar-posts"
              placeholder="What's on your mind?"
              className="w-full cursor-pointer border-white/50 transition-colors outline-none focus-within:px-2! hover:border-white/100"
              onClick={() => setIsCreateModalOpen(true)}
              readOnly
            />
          </div>

          <CreatePostModal
            isOpen={isCreateModalOpen}
            onClose={() => setIsCreateModalOpen(false)}
          />
        </div>

        <div className="text-md flex items-center justify-between space-x-6 px-[4%] font-bold md:px-0 lg:px-[30%] lg:text-base lg:font-medium">
          <button className="bg-primary w-full rounded-lg py-2">For You</button>
          <button className="border-primary w-full rounded-lg border-2 py-2">
            Following
          </button>
        </div>

        <Posts />
      </section>

      {/* Right */}
      <Board
        title="Leaderboard"
        className="h-fit border border-white/10 lg:hidden xl:flex"
        itemsCount={3}
      />
    </main>
  );
};

export default Home;
