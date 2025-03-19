import { EllipsisVertical, MessageSquare, Trophy } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface IUser {
  id?: number;
  name: string;
  email: string;
  image?: string;
}

interface IProps {
  user: IUser;
}

const Profile = ({ user }: IProps) => {
  const [profileSelectedTab, setProfileSelectedTab] = useState("posts");
  const iRef = useRef<HTMLDivElement>(null);

  function handleTabClick(tab: string) {
    setProfileSelectedTab(tab);
  }

  useEffect(() => {
    const MSection = document.getElementById("MSection");
    const LSection = document.getElementById("LSection");
    const currentRef = iRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const bounds = entry.target.getBoundingClientRect();

        if (bounds.top <= 100) {
          if (currentRef) {
            currentRef.classList.remove("before:hidden");
            currentRef.style.transform = "translateY(5rem)";
            currentRef.style.opacity = "100";

            if (LSection) {
              LSection.style.paddingTop = "6rem";
              LSection.style.transform = "translateY(1.2rem)";
            }
          }
        } else {
          if (currentRef) {
            currentRef.classList.add("before:hidden");
            currentRef.style.transform = "translateY(0)";
            currentRef.style.opacity = "0";

            if (LSection) {
              LSection.style.paddingTop = "1rem";
              LSection.style.transform = "translateY(0rem)";
            }
          }
        }
      },
      {
        root: null,
        threshold: Array.from({ length: 100 }, (_, i) => i / 100), // Create thresholds from 0 to 1
        rootMargin: "0px",
      },
    );

    if (currentRef) {
      console.log("observed");
      observer.observe(MSection as Element);
    }

    return () => {
      if (currentRef) {
        console.log("unobserved");
        observer.unobserve(MSection as Element);
      }
    };
  }, []);

  return (
    <div
      className="flex w-full flex-col items-center justify-between overflow-auto"
      id="profile"
    >
      <header className="bgs-[#201D27] flex w-full items-center gap-x-5 bg-red-950 pl-20">
        {/* <img
          src={user.image}
          alt="profile"
          className="h-20 w-20 rounded-full bg-gray-500"
        /> */}
        <i className="fa-solid fa-circle-user relative top-8 text-9xl"></i>
        <div className="flex flex-col pt-10">
          <div className="text-3xl font-bold">
            {user.name} dohn&nbsp; | &nbsp;<small>@{user.name}Dohn</small>
          </div>

          <div className="my-2 flex items-center gap-x-2 text-base">
            Joined 3 months ago
            <span className="mt-1 inline-block h-1 w-1 rounded-full bg-white"></span>
            <ul className="flex space-x-2 text-xs">
              <li className="bg-primary rounded px-1.5 py-1 font-bold">GMR</li>
              <li className="bg-primary rounded px-1.5 py-1 font-bold">
                Online
              </li>
            </ul>
          </div>
        </div>
      </header>

      <section className="mt-15 grid w-full gap-x-10 px-10">
        {/* Left Section */}
        <div
          className="bg-gray-60 sticky top-20 h-fit space-y-10 rounded-lg bg-white/5 py-10 duration-250"
          id="LSection"
        >
          <div className="grid w-full grid-cols-3 gap-x-4 px-5 text-center">
            <div
              ref={iRef}
              className="relative -top-24 col-span-3 flex flex-col items-center"
            >
              <i
                ref={iRef}
                className="fa-solid fa-circle-user absolute -top-35 text-9xl"
              />
              <ul className="flex space-x-2 text-xs">
                <li className="bg-primary rounded px-1.5 py-1 font-bold">
                  GMR
                </li>
                <li className="bg-primary rounded px-1.5 py-1 font-bold">
                  Online
                </li>
              </ul>
            </div>

            <small className="flex flex-col">
              <span className="text-xl font-bold">0</span>
              <span className="opacity-50">Following</span>
            </small>
            <small className="flex flex-col">
              <span className="text-xl font-bold">0</span>
              <span className="opacity-50">Followers</span>
            </small>
            <small className="flex flex-col">
              <span className="text-xl font-bold">0</span>
              <span className="opacity-50">Likes</span>
            </small>
          </div>

          <hr className="opacity-15" />

          <div className="grid w-full grid-cols-2 place-items-center gap-x-4 px-5 font-medium">
            <small className="flex w-fit flex-col items-center">
              <MessageSquare size={30} className="rotate-y-[-180deg]" />
              <span>Shouts</span>
            </small>
            <small className="flex w-fit flex-col items-center">
              <Trophy size={30} />
              <span>Trophies</span>
            </small>
          </div>
        </div>

        {/* Mid Section */}
        <div className="h-screen" id="MSection">
          <div className="flex items-start space-x-5 rounded-xl bg-white/5 px-5 py-5 shadow-md drop-shadow-md">
            <i className="fa-solid fa-circle-user underlineNav relative w-10 text-5xl after:-bottom-5.5" />
            <div className="flex w-full -translate-y-2 flex-col space-y-2">
              <small className="text-xs">Hey @username</small>
              <input
                type="text"
                className="w-full rounded border px-3 py-1.5 text-sm"
                placeholder="Create a new post..."
              />
            </div>
          </div>

          <ul className="relative mt-10 flex items-center space-x-3 px-6 text-sm font-bold before:absolute before:bottom-0 before:left-0 before:w-full before:border">
            <li
              className={`relative z-1 cursor-pointer rounded-t-lg border ${
                profileSelectedTab === "posts"
                  ? "border-b-transparent bg-[#23202A]"
                  : ""
              } px-4 py-2`}
              onClick={() => handleTabClick("posts")}
            >
              <span
                className={`${
                  profileSelectedTab === "posts" ? "text-primary" : ""
                } duration-150`}
              >
                Posts
              </span>
            </li>
            <li
              className={`relativetop-2 z-1 cursor-pointer rounded-t-lg border ${
                profileSelectedTab === "Likes"
                  ? "border-b-transparent bg-[#23202A]"
                  : ""
              } px-4 py-2`}
              onClick={() => handleTabClick("Likes")}
            >
              <span
                className={`${
                  profileSelectedTab === "Likes" ? "text-primary" : ""
                } duration-150`}
              >
                Likes
              </span>
            </li>
            <li
              className={`relativetop-2 z-1 cursor-pointer rounded-t-lg border ${
                profileSelectedTab === "Draft posts"
                  ? "border-b-transparent bg-[#23202A]"
                  : ""
              } px-4 py-2`}
              onClick={() => handleTabClick("Draft posts")}
            >
              <span
                className={`${
                  profileSelectedTab === "Draft posts" ? "text-primary" : ""
                } duration-150`}
              >
                Draft posts
              </span>
            </li>
            <li
              className={`relativetop-2 z-1 cursor-pointer rounded-t-lg border ${
                profileSelectedTab === "Scheduled posts"
                  ? "border-b-transparent bg-[#23202A]"
                  : ""
              } px-4 py-2`}
              onClick={() => handleTabClick("Scheduled posts")}
            >
              <span
                className={`${
                  profileSelectedTab === "Scheduled posts" ? "text-primary" : ""
                } duration-150`}
              >
                Scheduled posts
              </span>
            </li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="bg-gray-60 sticky top-10 h-fit space-y-10">
          <div className="flex items-center justify-between space-x-2">
            <a
              href="/settings"
              className="border-primary hover:bg-primary w-full rounded border-2 py-2 text-center text-sm font-bold duration-150 hover:text-black"
            >
              Edit profile
            </a>

            <div>
              <button className="rounded border p-1.5">
                <EllipsisVertical />
              </button>
            </div>
          </div>

          <div className="flex w-full flex-col space-y-3 rounded-lg bg-white/5 px-5 py-5">
            <h1 className="text-lg font-bold">Your invite link</h1>
            <div className="flex items-center gap-x-3">
              <input
                type="text"
                value={"AFK@T.com/invite/username"}
                readOnly
                className="w-full rounded border border-white/15 px-3 py-1.5 text-sm"
              />
              <button className="rounded border px-3 py-1.5 text-sm font-medium">
                Copy
              </button>
            </div>
            <p className="text-sm">
              Accounts created using your invite link automatically become your
              followers.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
