import { lazy, Suspense, useEffect, useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { IPost } from "../../interfaces";
import moment from "moment";

const Posts = lazy(() => import("../Posts"));

interface IProps {
  defaultTab: string;
  tabs: string[];
}

interface ITab {
  tab: string;
  title: string;
  selectedTab: string;
  handleTabClick: (tab: string) => void;
}

const Tabs = ({ defaultTab, tabs }: IProps) => {
  const { Posts: postsList } = useAppSelector((state) => state.posts);

  const [postsToShow, setPostsToShow] = useState<IPost[]>([]);
  const [scheduledPosts, setScheduledPosts] = useState<IPost[]>([]);
  const [profileSelectedTab, setProfileSelectedTab] = useState(defaultTab);

  useEffect(() => {
    if (postsToShow) {
      const filteredPosts = [] as IPost[];
      const filteredScheduledPosts = [] as IPost[];

      postsList.map((post: IPost) => {
        if (moment(post.published_at).fromNow().split(" ").includes("ago")) {
          filteredPosts.push(post);
        } else {
          filteredScheduledPosts.push(post);
        }
      });

      setPostsToShow(filteredPosts);
      setScheduledPosts(filteredScheduledPosts);
    }
  }, [postsList]);

  function handleTabClick(tab: string) {
    setProfileSelectedTab(tab);
  }

  return (
    <>
      <ul className="relative flex items-center space-x-3 px-6 text-sm font-bold before:absolute before:bottom-0 before:left-0 before:w-full before:border-b before:border-white">
        {tabs.map((tab) => {
          return (
            <Tab
              key={tab}
              tab={tab}
              title={tab}
              selectedTab={profileSelectedTab}
              handleTabClick={handleTabClick}
            />
          );
        })}
      </ul>

      <div className="mt-8 px-2">
        {profileSelectedTab === "Posts" ? (
          <Suspense
            fallback={
              <div className="flex h-full flex-col items-center py-10 text-xl font-light">
                Loading...
              </div>
            }
          >
            <Posts posts={postsToShow} />
          </Suspense>
        ) : profileSelectedTab === "Scheduled Posts" ? (
          <Suspense
            fallback={
              <div className="flex h-full flex-col items-center py-10 text-xl font-light">
                Loading...
              </div>
            }
          >
            <Posts posts={scheduledPosts} />
          </Suspense>
        ) : (
          <div>You haven't anything yet.</div>
        )}
      </div>
    </>
  );
};

const Tab = ({ tab, title, selectedTab, handleTabClick }: ITab) => {
  return (
    <li
      className={`relative z-1 cursor-pointer rounded-t-lg border border-white ${
        selectedTab === tab ? "border-b-transparent bg-[#23202A]" : ""
      } px-5 py-2.5`}
      onClick={() => handleTabClick(tab)}
    >
      <span
        className={`${selectedTab === tab ? "text-primary" : ""} duration-150`}
      >
        {title}
      </span>
    </li>
  );
};

export default Tabs;
