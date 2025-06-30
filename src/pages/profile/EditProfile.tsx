import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import ProfileInfo from "./ProfileInfo";
import SideTabs from "./SideTabs";
import BlockedUsers from "./BlockedUsers";
import EmailAddress from "./EmailAddress";
import ChangePassword from "./ChangePassword";
import { defaultImage } from "../../utils";
import { Pencil, Upload, X } from "lucide-react";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../redux/hooks";
import { updateUserProfile } from "../../redux/modules/users";
import Themes from "./Themes";

const EditProfile = () => {
  const dispatch = useAppDispatch();

  const { user } = useSelector((state: RootState) => state.users);

  const profileImageInputRef = useRef<HTMLInputElement>(null);

  const [activeProfileTab, setActiveProfileTab] = useState("Profile");
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleTabClick = (tab: string) => {
    setActiveProfileTab(tab);
  };

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    setProfileImage(file);

    // Create preview
    const reader = new FileReader();
    reader.onload = (event) => {
      setProfilePreview(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);

    if (files.length === 0) return;

    const file = files[0];

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    // Check file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    // Save the actual file for upload
    setProfileImage(file);

    // Create preview
    const reader = new FileReader();
    reader.onload = (event) => {
      setProfilePreview(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleProfileImageSubmit = () => {
    if (!profileImage) {
      toast.error("No image selected");
      return;
    }

    const formData = new FormData();
    formData.append("userProfile.profile_image", profileImage);

    try {
      dispatch(updateUserProfile(formData));

      setProfileModalOpen(false);
      // Reset preview
      setProfileImage(null);
      setProfilePreview(null);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to update profile picture");
    }
  };

  return (
    <div
      className="flex w-full flex-col items-center overflow-auto"
      id="profile"
    >
      {/* Header */}
      <header className="w-full bg-black/10 pl-20">
        <div className="flex items-center gap-x-5 py-5">
          <div className="relative top-8 flex aspect-square w-32 items-center justify-center self-end overflow-hidden rounded-full border bg-black text-white">
            {user?.userProfile?.profile_image ? (
              <img
                src={user?.userProfile?.profile_image}
                alt="profile avatar"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-5xl text-white">
                {user?.username ? defaultImage(user.username) : ""}
              </div>
            )}
            <div
              className="absolute flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-black/50 transition-colors hover:bg-black/65"
              onClick={() => setProfileModalOpen(true)}
            >
              <Pencil size={20} />
            </div>
          </div>

          <div className="flex flex-col pt-10">
            <h1 className="text-3xl font-bold">Edit Your Profile</h1>
            <small className="text-base font-normal italic">
              @{user?.username}
            </small>
          </div>
        </div>
      </header>

      {/* Profile Image Upload Modal */}
      {profileModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="w-full max-w-xl rounded-lg bg-[#2A2731] p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">Update Profile Picture</h2>
              <button
                className="rounded-full p-1 hover:bg-white/10"
                onClick={() => {
                  setProfileModalOpen(false);
                  setProfilePreview(null);
                }}
              >
                <X size={24} />
              </button>
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-center">
                {/* Preview current or new image */}
                <div className="relative h-40 w-40 overflow-hidden rounded-full border-2 border-white/20">
                  {profilePreview ? (
                    <img
                      src={profilePreview}
                      alt="Preview"
                      className="h-full w-full object-cover"
                    />
                  ) : user?.userProfile?.profile_image ? (
                    <img
                      src={user.userProfile.profile_image}
                      alt="Current profile"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-black text-5xl">
                      {user?.username ? defaultImage(user.username) : ""}
                    </div>
                  )}
                </div>
              </div>

              <div
                className={`hover:border-primary mt-5 flex items-center justify-center rounded-lg border-2 border-dashed p-4 transition-colors ${
                  isDragging
                    ? "border-primary bg-primary/10"
                    : "hover:border-primary border-white/20"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onDragEnd={() => setIsDragging(false)}
              >
                <input
                  type="file"
                  id="profile-image-upload"
                  ref={profileImageInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleProfileImageChange}
                />
                <label
                  htmlFor="profile-image-upload"
                  className="flex cursor-pointer flex-col items-center justify-center gap-2"
                >
                  <Upload size={32} className="text-primary" />
                  <span className="text-center">
                    Click to upload or drag and drop
                  </span>
                  <span className="text-xs text-gray-400">
                    PNG, JPG, GIF up to 5MB
                  </span>
                </label>
              </div>
            </div>

            <div className="flex justify-between">
              <button
                className="rounded border border-white/30 px-4 py-2 hover:bg-white/10"
                onClick={() => {
                  setProfileModalOpen(false);
                  setProfilePreview(null);
                }}
              >
                Cancel
              </button>
              <button
                className="bg-primary hover:bg-primary/90 rounded px-4 py-2 text-black disabled:opacity-50"
                onClick={handleProfileImageSubmit}
                disabled={!profilePreview}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      <section className="grid-editprofile grid w-full flex-grow gap-x-10 bg-white/5 pt-10 pl-5 text-xs text-white sm:pl-10 md:px-15 md:text-lg lg:px-20">
        {/* Left Section */}
        <div className="rounded-lg py-10 pt-10 duration-250">
          <SideTabs
            activeTab={activeProfileTab}
            handleTabClick={handleTabClick}
            tabs={[
              "Profile",
              "Themes",
              "Blocked users",
              ",",
              "Email Address",
              "Password",
            ]}
          />
        </div>

        {/* Mid Section */}
        {/* //TODO create form for each component with PATCH request */}
        <div className="tracking-wide">
          {activeProfileTab === "Profile" ? (
            <ProfileInfo />
          ) : activeProfileTab === "Themes" ? (
            <Themes />
          ) : activeProfileTab === "Blocked users" ? (
            <BlockedUsers />
          ) : activeProfileTab === "Email Address" ? (
            <EmailAddress />
          ) : activeProfileTab === "Password" ? (
            <ChangePassword />
          ) : null}
        </div>

        {/* Right Section */}
        <div
          className={`${activeProfileTab !== "Blocked users" ? "lg:hidden" : ""} hidden pt-10 lg:block`}
        >
          <p className="text-sm font-extralight opacity-50">
            When you block someone, that user won't be able to follow you, send
            you a friend request, or reply to your posts and comments.
          </p>
        </div>
      </section>
    </div>
  );
};

export default EditProfile;
