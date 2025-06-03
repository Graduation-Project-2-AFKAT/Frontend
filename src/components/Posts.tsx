import { useEffect } from "react";
import { useLocation } from "react-router";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { loadMyPosts, loadPosts, loadPostsById } from "../redux/modules/posts";
import Post from "./Post";
import SkeletonPosts from "./ui/SkeletonPosts";

const Posts = () => {
  const { isLoading, type } = useAppSelector((state) => state.loading);
  const { Posts } = useAppSelector((state) => state.posts);
  const dispatch = useAppDispatch();

  const location = useLocation();

  useEffect(() => {
    const userId = location.pathname.split("/").pop();
    const isNumber = !isNaN(Number(userId));

    if (location.pathname.split("/").some((word) => word === "profile")) {
      if (userId && isNumber) {
        dispatch(loadPostsById(userId));
      } else {
        dispatch(loadMyPosts());
      }
    } else {
      dispatch(loadPosts());
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <ul className="mb-25 space-y-10">
      {isLoading && type.startsWith("posts") ? (
        <div className="flex flex-col items-center justify-center space-y-10 pb-12">
          <SkeletonPosts />
        </div>
      ) : Posts.length > 0 ? (
        Posts.map((post) => {
          return <Post key={post.id} post={post} />;
        })
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="mb-4 rounded-full bg-[#2A2731]/50 p-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white/60"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <h3 className="mb-2 text-xl font-semibold">No posts yet</h3>
          <p className="text-white/60">
            Follow some creators to see their posts here
          </p>
        </div>
      )}
    </ul>
  );
};

export default Posts;
