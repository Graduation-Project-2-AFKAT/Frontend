import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { loadMyPosts, loadPosts, loadPostsById } from "../redux/modules/posts";
import Post from "./Post";
import { useLocation } from "react-router";

interface IProps {
  type?: "all" | "mine";
}

const Posts = ({ type = "all" }: IProps) => {
  const { isLoading, type: loadingType } = useAppSelector(
    (state) => state.loading,
  );
  const { Posts, type: postsType } = useAppSelector((state) => state.posts);
  const dispatch = useAppDispatch();

  const location = useLocation();

  useEffect(() => {
    const userId = location.pathname.split("/").pop();
    const isNumber = !isNaN(Number(userId));

    if (type === "all" && (postsType === "mine" || !postsType)) {
      dispatch(loadPosts());
    } else if (type === "mine" && (postsType === "all" || !postsType)) {
      if (userId && isNumber) {
        // dispatch(loadPostsById(userId)); //TODO let 3mmar (the bitch) fix it
        dispatch(loadMyPosts());
      } else {
        dispatch(loadMyPosts());
      }
    }
  }, []);

  return (
    <ul className="mb-25 space-y-6">
      {isLoading && loadingType.startsWith("posts") ? (
        <div className="flex flex-col items-center justify-center space-y-10 pb-12">
          {[1, 2, 3].map((item) => (
            <li
              key={item}
              className="w-full animate-pulse rounded-xl border border-white/25 bg-[#2A2731] p-5"
            >
              <div className="flex items-center space-x-2">
                <div className="h-10 w-10 rounded-full bg-white/10"></div>
                <div className="h-4 w-32 rounded bg-white/10"></div>
                <div className="ml-auto h-6 w-20 rounded bg-white/10"></div>
              </div>

              <div className="mt-4 h-5 w-3/4 rounded bg-white/10"></div>
              <div className="mt-7 h-82 rounded-lg bg-white/5"></div>
              <div className="mt-4 flex justify-end">
                <div className="flex space-x-4">
                  <div className="h-6 w-16 rounded bg-white/10"></div>
                  <div className="h-6 w-24 rounded bg-white/10"></div>
                </div>
              </div>
            </li>
          ))}
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
