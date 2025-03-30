import { EllipsisVertical } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import ProfileInfo from "./ProfileInfo";
import SideTabs from "./SideTabs";
import BlockedUsers from "./BlockedUsers";
import EmailAddress from "./EmailAddress";
import Password from "./Password";

const EditProfile = () => {
  const [profileSelectedTab, setProfileSelectedTab] = useState("Profile"); //TODO create content based on this state
  const [nickname, setNickname] = useState<string>("");
  const users = useSelector((state: RootState) => state.users);

  const handleTabClick = (tab: string) => {
    setProfileSelectedTab(tab);
  };

  return (
    <div
      className="flex w-full flex-col items-center overflow-auto"
      id="profile"
    >
      {/* Header */}
      <header className="w-full bg-[#201D27] lg:pl-20">
        <div className="hidden items-center gap-x-5 py-5 lg:flex">
          {/* <i className="fa-solid fa-circle-user relative top-8 text-9xl" /> */}
          <img
            src={users.user?.avatar}
            alt="profile avatar"
            className="relative top-10 aspect-square w-25 self-end rounded-full border object-cover"
          />

          <div className="flex flex-col pt-10">
            <h1 className="text-3xl font-bold">Edit Your Profile</h1>
            <small className="text-base font-normal">@Username</small>
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

      {/* <section className="min-h-50 w-full bg-red-400">
        <div
          className="flex h-full cursor-pointer items-center justify-center bg-black/50 text-white hover:bg-black/60"
          onClick={() => {
            const dialog = document.getElementById(
              "header-image-dialog",
            ) as HTMLDialogElement;
            dialog?.showModal();
          }}
        >
          <div className="flex flex-col items-center justify-center space-y-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-pen-icon lucide-pen"
            >
              <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
            </svg>
            <p className="font-bold">Change profile header</p>
          </div>
        </div>
      </section> */}

      {/* <dialog id="header-image-dialog" className="place-self-center rounded-lg bg-[#2A2731] p-6 text-white backdrop:bg-black/50">
        <div className="mb-4 flex max-w-150 flex-col items-center justify-between">
          <form method="dialog" className="self-end">
            <button className="rounded-full p-1 hover:bg-white/10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-x"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </form>
          <div className="space-y-5">
            <h2 className="text-base font-bold">Upload New Header</h2>
            <div className="space-y-5 text-sm font-extralight text-white/50">
              <p>
                Headers are the big, banner-like images that adorn the tops of
                pages. For your header to look its best on all devices, make
                sure anything important is located near the center of the image.
              </p>

              <div className="flex flex-col space-y-5">
                <p className="flex flex-col">
                  Your image must be a PNG or JPG.
                  <span className="font-medium">
                    PNGs are highly recommended as they produce a lossless
                    image.
                  </span>
                </p>
                <span className="font-bold">
                  The recommended size for a header image is{" "}
                  <span className="rounded-lg bg-black/20 p-0.5 text-xs text-white">
                    2000×500
                  </span>{" "}
                  (ratio of 4 ÷ 1).
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4 space-y-4">
          <div className="rounded-2xl border-2 border-dashed border-white/15 p-8 text-center">
            <input
              type="file"
              id="header-image-upload"
              className="hidden"
              accept="image/*"
            />
            <label htmlFor="header-image-upload" className="cursor-pointer">
              <div className="flex flex-col items-center space-y-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-upload"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" x2="12" y1="3" y2="15" />
                </svg>
                <span className="text-sm">
                  Click to upload image or drag and drop
                </span>
                <span className="text-xs text-gray-400">
                  PNG, JPG, GIF up to 5MB
                </span>
              </div>
            </label>
          </div>

          <div className="flex justify-between">
            <button
              className="rounded border border-white/30 px-4 py-2 hover:bg-white/10"
              onClick={() => {
                (
                  document.getElementById(
                    "header-image-dialog",
                  ) as HTMLDialogElement
                )?.close();
              }}
            >
              Cancel
            </button>
            <button className="rounded bg-[#3ec28f] px-4 py-2 text-black hover:bg-[#3ec28f]/90">
              Upload
            </button>
          </div>
        </div>
      </dialog> */}

      <section className="grid w-full flex-grow gap-x-10 bg-white/5 px-10 text-white md:px-15 lg:px-20 lg:pt-10">
        {/* Left Section */}
        <div className="sticky top-10 rounded-lg py-10 pt-4 duration-250 lg:pt-15">
          <SideTabs
            activeTab={profileSelectedTab}
            handleTabClick={handleTabClick}
            tabs={[
              "Profile",
              "Blocked users",
              ",",
              "Email Address",
              "Password",
            ]}
          />
        </div>

        {/* Mid Section */}
        {profileSelectedTab === "Profile" ? (
          <ProfileInfo nickname={nickname} setNickname={setNickname} />
        ) : profileSelectedTab === "Blocked users" ? (
          <BlockedUsers />
        ) : profileSelectedTab === "Email Address" ? (
          <EmailAddress />
        ) : profileSelectedTab === "Password" ? (
          <Password />
        ) : null}
      </section>
    </div>
  );
};

export default EditProfile;
