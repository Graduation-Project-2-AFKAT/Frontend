import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import Post from "./Post";
import { loadPosts } from "../redux/modules/posts";

const Posts = () => {
  const { isLoading } = useAppSelector((state) => state.loading);
  const { Posts } = useAppSelector((state) => state.posts);
  const { user, isAuth } = useAppSelector((state) => state.users);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isAuth) {
      dispatch(loadPosts());
    }
  }, [user, isAuth, dispatch]);

  return (
    <ul className="mb-25 space-y-6">
      {!isLoading &&
        Posts.map((post) => {
          return <Post key={post.id} post={post} />;
        })}
      {/* <Post username="user1" />
          <Post username="user2" />
          <Post username="user3" />
          <Post username="user4" />
          <Post username="user5" /> */}
      {/* <li className="invisible h-8"></li> */}
    </ul>
  );
};

export default Posts;
