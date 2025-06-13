import moment from "moment";
import { lazy, Suspense, useEffect, useState } from "react";
import Input from "../components/form/Input";
import Posts from "../components/Posts";
import Board from "../components/ui/Board";
import { IPost } from "../interfaces";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { Link } from "react-router";
import { loadPosts } from "../redux/modules/posts";

const CreatePostModal = lazy(
  () => import("../components/modals/CreatePostModal"),
);

const Home = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.users);
  const { Posts: postsList } = useAppSelector((state) => state.posts);

  const [postsToShow, setPostsToShow] = useState<IPost[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    dispatch(loadPosts({}));
  }, []);

  useEffect(() => {
    if (postsToShow) {
      const filteredPosts = postsList.filter((post: IPost) =>
        moment(post.published_at).fromNow().split(" ").includes("ago"),
      );

      setPostsToShow(filteredPosts);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postsList]);

  return (
    <main
      className={`${window.innerWidth < 768 ? "hide-scrollbar" : ""} bg-neutral/5 grid w-full overflow-y-auto pt-10 lg:gap-10 lg:px-10 lg:pl-15`}
    >
      {/*//! You think this is a useless line right ? ...Comment it and see how important it is ;) */}
      {/* <div className="hidden lg:block"></div> */}

      {/* Left */}
      <Board
        title="Suggestion"
        className="h-fit border border-white/10 lg:order-1 xl:order-0"
      />

      {/* Main */}
      <section className="space-y-6 md:mx-auto md:w-[75%] lg:w-full lg:px-0">
        <div className="bg-base-content/5 flex h-25 items-center border border-white/10 px-5 shadow-md drop-shadow-md md:rounded-lg">
          {/* <i className="fa-solid fa-circle-user mr-6 text-4xl" /> */}
          <Link to={"profile"}>
            <img
              src={user?.userProfile.profile_image}
              alt="profile pfp"
              className="aspect-square w-15 rounded-full border text-xs"
            />
          </Link>

          <div className="ml-5 w-full">
            <Link
              to={`/profile`}
              className="text-xs tracking-wide text-white/50"
            >
              Hey @{user?.username}
            </Link>
            <Input
              id="search-bar-posts"
              placeholder="What's on your mind?"
              className="mt-1 w-full cursor-pointer border-white/25 transition-colors outline-none focus-within:px-2! hover:border-white"
              onClick={() => setIsCreateModalOpen(true)}
              readOnly
            />
          </div>

          {isCreateModalOpen && (
            <Suspense
              fallback={
                <div className="fixed inset-0 z-50 flex items-center justify-center rounded-lg bg-black/50">
                  <div className="flex flex-col items-center gap-3">
                    <div className="border-t-primary h-10 w-10 animate-spin rounded-full border-4 border-r-transparent border-b-white/30 border-l-white/30"></div>
                    <p className="text-lg">Loading...</p>
                  </div>
                </div>
              }
            >
              <CreatePostModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
              />
            </Suspense>
          )}

          {/* <CreatePostModal
            isOpen={isCreateModalOpen}
            onClose={() => setIsCreateModalOpen(false)}
          /> */}
        </div>

        <div className="text-md flex items-center justify-between space-x-6 px-[4%] font-bold md:px-0 lg:px-[30%] lg:text-base lg:font-medium">
          <div className="flex w-full gap-4">
            <button className="bg-primary hover:bg-primary-focus hover:bg-primary/80 text-primary-content flex-1 rounded-lg py-2 font-semibold transition-colors">
              For You
            </button>
            <button className="border-primary hover:bg-primary/10 flex-1 rounded-lg border-2 py-2 transition-colors">
              Following
            </button>
          </div>
        </div>

        <Posts posts={postsToShow} />
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
