import { EllipsisVertical, MessageSquare, Trophy } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { defaultImage } from "../utils";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { Link, useLocation } from "react-router";
import { loadUserById } from "../redux/modules/users";
import { IUser } from "../interfaces";
import Tabs from "../components/profile/ProfileTabs";

const Profile = () => {
  const dispatch = useAppDispatch();
  const { isLoading, type } = useAppSelector((state) => state.loading);
  const { user, author } = useAppSelector((state) => state.users);

  const [userData, setUserData] = useState<IUser | null>(null);
  const [isOwner, setIsOwner] = useState<boolean>(true);

  const location = useLocation();

  const iRef = useRef<HTMLImageElement>(null);

  // Intersection Observer
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
  }, [isLoading]);

  useEffect(() => {
    const userId = location.pathname.split("/").pop();
    const isNumber = !isNaN(Number(userId));

    if (userId && isNumber) {
      const isLoadingDifferentUser = user && userId !== user.id.toString();
      const isFirstLoad = !user;

      if (isLoadingDifferentUser || isFirstLoad) {
        dispatch(loadUserById(userId));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const userId = location.pathname.split("/").pop();
      const isNumber = !isNaN(Number(userId));

      if (userId && isNumber) {
        const isCurrentUserProfile = user && userId === user.id.toString();
        setUserData(isCurrentUserProfile ? user : author);
        setIsOwner(!!isCurrentUserProfile);
      } else {
        setUserData(user);
        setIsOwner(true);
      }
    }
  }, [location.pathname, isLoading, author, user]);
  return (
    <div className="" id="profile">
      {isLoading && !type.startsWith("posts") ? (
        <div className="absolute inset-0 top-0 z-50 flex items-center justify-center bg-black/50">
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="border-primary h-15 w-15 animate-spin rounded-full border-t-2 border-b-2" />
            <span>Loading...</span>
          </div>
        </div>
      ) : (
        <>
          {/* Header */}
          <header className="w-full bg-black/10 px-10 lg:pt-5 lg:pb-5 lg:pl-20">
            <div className="hidden items-center gap-x-5 lg:flex">
              <div className="relative top-8 flex aspect-square w-32 items-center justify-center self-end overflow-hidden rounded-full border-2 bg-black text-white">
                {userData ? (
                  <img
                    src={userData?.userProfile?.profile_image}
                    alt="profile avatar"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-5xl text-white">
                    {defaultImage(userData?.username)}
                  </div>
                )}
              </div>

              <div className="flex flex-col pt-10">
                <div className="text-3xl font-bold">
                  @{userData?.username}&nbsp; | &nbsp;
                  <small>{userData?.email}</small>
                </div>

                <div className="my-2 flex items-center gap-x-2 text-base">
                  Joined 3 months ago
                  <span className="mt-1 inline-block h-1 w-1 rounded-full bg-white"></span>
                  <ul className="grid grid-cols-2 gap-x-2 text-center text-xs">
                    <li className="bg-primary rounded px-1 py-1 font-bold">
                      GMR
                    </li>
                    <li className="bg-primary rounded px-1 py-1 font-bold">
                      Online
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center space-y-5 pt-10 pb-5 lg:hidden">
              {/* <i className="fa-solid fa-circle-user text-7xl" /> */}

              {userData ? (
                <img
                  src={userData?.userProfile?.profile_image || "#"}
                  alt="profile avatar"
                  className="aspect-square w-30 rounded-full border-2 object-cover"
                />
              ) : (
                <div className="flex h-30 w-30 items-center justify-center rounded-full border-2 bg-black text-5xl text-white">
                  {defaultImage(userData?.username)}
                </div>
              )}

              <div className="space-y- flex flex-col items-center">
                <ul className="grid grid-cols-2 gap-x-2 pb-2 text-center text-xs">
                  <li className="bg-primary rounded px-1 py-1 font-bold">
                    GMR
                  </li>
                  <li className="bg-primary rounded px-1 py-1 font-bold">
                    Online
                  </li>
                </ul>

                <small className="font-bold">@{userData?.username}</small>
                <small className="font-light">{userData?.email}</small>
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
                {isOwner ? (
                  <Link
                    to={`/profile/edit`}
                    className="border-primary hover:bg-primary w-full rounded-md border py-2 text-center text-sm font-bold duration-100 hover:text-black"
                  >
                    Edit profile
                  </Link>
                ) : (
                  <button className="border-primary hover:bg-primary w-full rounded-md border py-2 text-center text-sm font-bold duration-100 hover:text-black">
                    Follow
                  </button>
                )}

                <button
                  onClick={() =>
                    (
                      document.getElementById(
                        "profile-dialog",
                      ) as HTMLDialogElement
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

          <section className="grid min-h-screen w-full gap-x-10 bg-white/5 px-10 pt-10 xl:px-15 xl:pt-12">
            {/* Left Section */}
            <div
              className="sticky top-20 hidden h-fit translate-y-0 space-y-10 rounded-lg border border-white/25 bg-black/25 py-10 pt-4 duration-250 xl:block"
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
                    src={userData?.userProfile?.profile_image || "#"}
                    alt="profile avatar"
                    ref={window.innerWidth >= 1280 ? iRef : undefined}
                    className="absolute -top-28 aspect-square w-25 rounded-full border-2 object-cover"
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
            <div className="" id="MSection">
              <Tabs
                defaultTab="Posts"
                tabs={["Posts", "Likes", "Draft Posts", "Scheduled Posts"]}
              />

              {/* {isLoading ? <Posts type="mine" /> : <div>Loading...</div>} */}
              {/* <div className="flex h-full flex-col items-center py-10 text-xl font-light">
                You haven't anything yet.
              </div> */}
            </div>

            {/* Right Section */}
            <div className="sticky top-10 hidden h-fit lg:block">
              <div className="space-y-8 xl:space-y-8">
                <div className="flex items-center justify-between space-x-2">
                  {isOwner ? (
                    <Link
                      to={`/profile/edit`}
                      className="border-primary hover:bg-primary w-full rounded-md border-2 py-2 text-center text-sm font-bold duration-100 hover:text-black"
                    >
                      Edit profile
                    </Link>
                  ) : (
                    <button className="border-primary hover:bg-primary w-full rounded-md border py-2 text-center text-sm font-bold duration-100 hover:text-black">
                      Follow
                    </button>
                  )}

                  {/* <div>
                <button className="rounded-md border p-1.5">
                  <EllipsisVertical />
                </button>
              </div> */}
                </div>

                <div className="flex w-full flex-col space-y-3 rounded-lg border border-white/25 bg-black/25 px-5 py-5">
                  <h1 className="text-lg font-bold">Your invite link</h1>
                  <div className="flex items-center gap-x-2">
                    <input
                      type="text"
                      id="invite-link"
                      value={`AFK@T.com/profile/${userData?.username}`}
                      className="w-full rounded border border-white/15 px-3 py-1.5 text-sm transition-colors outline-none focus-within:border-white"
                      readOnly
                    />
                    <button
                      className="hover:bg-primary hover:border-primary cursor-pointer rounded border px-3 py-1.5 text-sm font-medium transition-colors hover:text-black"
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
                  className="sticky top-20 h-fit translate-y-0 space-y-5 rounded-lg border border-white/25 bg-black/25 py-5 pt-0 duration-300 xl:hidden"
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
                        src={userData?.userProfile?.profile_image || "#"}
                        alt="profile avatar"
                        ref={window.innerWidth < 1280 ? iRef : undefined}
                        className="absolute aspect-square w-20 -translate-y-28 rounded-full border object-cover"
                      />

                      <ul className="grid -translate-y-3 grid-cols-2 gap-x-2 text-xs">
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
        </>
      )}
    </div>
  );
};

export default Profile;
