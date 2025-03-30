import { EllipsisVertical, MessageSquare, Trophy } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { IUser } from "../interfaces";
import { toast } from "react-toastify";
import { joinName } from "../utils";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Tabs from "../components/Tabs";

const Profile = () => {
  const [profileSelectedTab, setProfileSelectedTab] = useState("posts");
  const [userData, setUserData] = useState<IUser[]>([]);
  const users = useSelector((state: RootState) => state.users);

  const iRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const MSection = document.getElementById("MSection");
    const LSection = document.getElementById("LSection");
    const currentRef = iRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const bounds = entry.target.getBoundingClientRect();

        const isDesktop = window.innerWidth >= 1280;
        if (bounds.top <= 100) {
          if (currentRef) {
            // Update currentRef styles
            currentRef.style.opacity = "100";
            currentRef.style.transform = isDesktop ? "translateY(5rem)" : "";

            // Update LSection styles if it exists
            if (LSection) {
              if (isDesktop) {
                LSection.style.paddingTop = "5rem";
                LSection.style.transform = "translateY(2.2rem)";
              } else {
                LSection.classList.remove("pt-0");
                LSection.classList.add("mt-20", "pt-20");
              }
            }
          }
        } else {
          if (currentRef) {
            console.log(currentRef);
            // Reset currentRef styles
            currentRef.style.opacity = "0";
            currentRef.style.transform = isDesktop ? "translateY(0)" : "";

            // Reset LSection styles if it exists
            if (LSection) {
              if (isDesktop) {
                LSection.style.paddingTop = "1rem";
                LSection.style.transform = "translateY(0)";
              } else {
                LSection.classList.add("pt-0");
                LSection.classList.remove("mt-20", "pt-20");
              }
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
      observer.observe(MSection as Element);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(MSection as Element);
      }
    };
  }, []);

  return (
    <div
      className="flex w-full flex-col items-center justify-between overflow-auto md:px-15 lg:px-10"
      id="profile"
    >
      {/* Header */}
      <header className="bgs-[#201D27] w-full lg:pl-20">
        <div className="hidden items-center gap-x-5 lg:flex">
          {/* <i className="fa-solid fa-circle-user relative top-8 text-9xl" /> */}
          <img
            src={users.user?.avatar}
            alt="profile avatar"
            className="aspect-square w-20 self-end rounded-full border object-cover"
          />

          <div className="flex flex-col pt-10">
            <div className="text-3xl font-bold">
              @{users.user?.username}&nbsp; | &nbsp;
              <small>{users.user?.email}</small>
            </div>

            <div className="my-2 flex items-center gap-x-2 text-base">
              Joined 3 months ago
              <span className="mt-1 inline-block h-1 w-1 rounded-full bg-white"></span>
              <ul className="grid grid-cols-2 gap-x-2 text-center text-xs">
                <li className="bg-primary rounded px-1 py-1 font-bold">GMR</li>
                <li className="bg-primary rounded px-1 py-1 font-bold">
                  Online
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center space-y-5 pt-10 pb-5 lg:hidden">
          {/* <i className="fa-solid fa-circle-user text-7xl" /> */}
          <img
            src={users.user?.avatar}
            alt="profile avatar"
            className="aspect-square w-20 rounded-full border object-cover"
          />

          <div className="space-y- flex flex-col items-center">
            <ul className="grid grid-cols-2 gap-x-2 pb-2 text-center text-xs">
              <li className="bg-primary rounded px-1 py-1 font-bold">GMR</li>
              <li className="bg-primary rounded px-1 py-1 font-bold">Online</li>
            </ul>

            <small className="font-bold">@{users.user?.username}</small>
            <small className="font-light">{users.user?.email}</small>
          </div>

          <div className="grid w-full grid-cols-3 text-center">
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

          <div className="flex w-full items-center justify-between space-x-2 px-5 md:px-0">
            <a
              href={`${window.location.pathname}/edit`}
              className="border-primary hover:bg-primary w-full rounded-md border py-2 text-center text-sm font-bold duration-100 hover:text-black"
            >
              Edit profile
            </a>

            <button
              onClick={() =>
                (
                  document.getElementById("profile-dialog") as HTMLDialogElement
                )?.showModal()
              }
              className="hover:bg-primary hover:border-primary w-full rounded-md border py-2 text-center text-sm font-bold duration-100 hover:text-black"
            >
              About
            </button>
            <dialog
              id="profile-dialog"
              className="absolute m-auto rounded-lg p-6 backdrop:bg-black/50"
            >
              <h2 className="mb-4 text-xl font-bold">Edit Profile</h2>
              <form method="dialog">
                <button className="cursor-pointer rounded border px-4 py-2">
                  Close
                </button>
              </form>
            </dialog>

            <div>
              <button className="rounded-md border p-1.5">
                <EllipsisVertical />
              </button>
            </div>
          </div>
        </div>
      </header>

      <section className="grid w-full gap-x-10 lg:mt-15">
        {/* Left Section */}
        <div
          className="bg-gray-60 sticky top-20 hidden h-fit translate-y-0 space-y-10 rounded-lg bg-white/5 py-10 pt-4 duration-250 xl:block"
          id={window.innerWidth >= 1280 ? "LSection" : undefined}
        >
          <div className="flex w-full flex-col gap-x-4 px-5 text-center">
            <div
              ref={window.innerWidth >= 1280 ? iRef : undefined}
              className="duration-150*-* relative -top-26 col-span-3 flex translate-y-0 flex-col items-center opacity-0"
            >
              {/* <i
                ref={window.innerWidth >= 1280 ? iRef : undefined}
                className="fa-solid fa-circle-user absolute -top-28 text-8xl"
              /> */}
              <img
                src={users.user?.avatar}
                alt="profile avatar"
                ref={window.innerWidth >= 1280 ? iRef : undefined}
                className="absolute -top-28 aspect-square w-20 rounded-full border object-cover"
              />

              <ul className="grid grid-cols-2 gap-x-2 text-xs">
                <li className="bg-primary rounded px-1 py-1 font-bold">GMR</li>
                <li className="bg-primary rounded px-1 py-1 font-bold">
                  Online
                </li>
              </ul>
            </div>

            <div className="grid grid-cols-3">
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
          </div>

          <hr className="opacity-15" />

          <div className="flex w-full items-center justify-between px-15 text-xl font-bold">
            <small className="flex w-fit flex-col items-center">
              <MessageSquare size={35} className="rotate-y-[-180deg]" />
              <span className="pt-2">Shouts</span>
            </small>
            <small className="flex w-fit flex-col items-center">
              <Trophy size={35} />
              <span className="pt-2">Trophies</span>
            </small>
          </div>
        </div>

        {/* Mid Section */}
        <div className="h-screen" id="MSection">
          <div className="flex items-center space-x-5 bg-white/5 px-5 py-5 shadow-md drop-shadow-md md:rounded-xl">
            {/* <i className="fa-solid fa-circle-user relative w-10 text-5xl" /> */}
            <img
              src={users.user?.avatar}
              alt="profile avatar"
              className="aspect-square w-20 rounded-full border object-cover"
            />

            <div className="flex w-full -translate-y-1 flex-col space-y-2">
              <small className="text-xs">
                Hey @{joinName(users.user?.username)}
              </small>
              <input
                type="text"
                className="w-full rounded border px-4 py-2 text-sm"
                placeholder="Create a new post..."
              />
            </div>
          </div>

          <Tabs
            defaultTab="Posts"
            tabs={["Posts", "Likes", "Draft Posts", "Scheduled Posts"]}
          />

          <div className="flex h-full flex-col items-center py-10 text-xl font-light">
            You haven't anything yet.
          </div>
        </div>

        {/* Right Section */}
        <div className="bg-gray-60 sticky top-10 hidden h-fit lg:block">
          <div className="space-y-8 xl:space-y-10">
            <div className="flex items-center justify-between space-x-2">
              <a
                href={`${window.location.pathname}/edit`}
                className="border-primary hover:bg-primary w-full rounded border-2 py-2 text-center text-sm font-bold duration-100 hover:text-black"
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
                  id="invite-link"
                  value={`AFK@T.com/invite/${joinName(users.user?.username)}`}
                  className="w-full rounded border border-white/15 px-3 py-1.5 text-sm"
                  readOnly
                />
                <button
                  className="hover:bg-primary hover:border-primary cursor-pointer rounded border px-3 py-1.5 text-sm font-medium duration-150 hover:text-black"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      (
                        document.getElementById(
                          "invite-link",
                        ) as HTMLInputElement
                      ).value,
                    );
                    toast("Copied to clipboard");
                  }}
                >
                  Copy
                </button>
              </div>
              <p className="text-sm">
                Accounts created using your invite link automatically become
                your followers.
              </p>
            </div>

            {/* left section to right on smaller screens */}
            <div
              className="bg-gray-60 sticky top-20 h-fit translate-y-0 space-y-5 rounded-lg bg-white/5 py-5 pt-0 duration-300 xl:hidden"
              id={window.innerWidth < 1280 ? "LSection" : undefined}
            >
              <div className="flex w-full flex-col gap-x-4 px-5 text-center">
                <div
                  ref={window.innerWidth < 1280 ? iRef : undefined}
                  className="relative -top-24 col-span-3 flex translate-y-20 flex-col items-center opacity-0 duration-150"
                >
                  {/* <i
                    ref={window.innerWidth < 1280 ? iRef : undefined}
                    className="fa-solid fa-circle-user absolute -top-28 text-8xl"
                  /> */}
                  <img
                    src={users.user?.avatar}
                    alt="profile avatar"
                    ref={window.innerWidth < 1280 ? iRef : undefined}
                    className="absolute -top-28 aspect-square w-20 rounded-full border object-cover"
                  />

                  <ul className="grid grid-cols-2 gap-x-2 text-xs">
                    <li className="bg-primary rounded px-1 py-1 font-bold">
                      GMR
                    </li>
                    <li className="bg-primary rounded px-1 py-1 font-bold">
                      Online
                    </li>
                  </ul>
                </div>

                <div className="grid grid-cols-3">
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
              </div>

              <hr className="opacity-15" />

              <div className="flex w-full items-center justify-between px-15 text-base font-bold">
                <small className="flex w-fit flex-col items-center">
                  <MessageSquare size={28} className="rotate-y-[-180deg]" />
                  <span className="pt-2">Shouts</span>
                </small>
                <small className="flex w-fit flex-col items-center">
                  <Trophy size={28} />
                  <span className="pt-2">Trophies</span>
                </small>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
