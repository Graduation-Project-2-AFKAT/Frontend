import { useEffect, useState, FormEvent } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { updateUserProfile } from "../../redux/modules/users";
import Input from "../../components/ui/Input";

const ProfileInfo = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.users);
  const { isLoading } = useAppSelector((state) => state.loading);

  // Form state
  const [nickname, setNickname] = useState<string>(user?.username || "");
  const [githubLink, setGithubLink] = useState<string>("");
  const [linkedInLink, setLinkedInLink] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [theme, setTheme] = useState<string>("#00a1a1");

  // Track if form has been modified
  const [isFormDirty, setIsFormDirty] = useState<boolean>(false);

  // Update form when user data loads
  useEffect(() => {
    if (user) {
      setNickname(user.username);
    }
  }, [user]);

  // Mark form as dirty when any field changes
  useEffect(() => {
    if (user) {
      const isDirty =
        nickname !== user.username ||
        githubLink !== "" ||
        linkedInLink !== "" ||
        bio !== "" ||
        theme !== "#00a1a1";

      setIsFormDirty(isDirty);
    }
  }, [nickname, githubLink, linkedInLink, bio, theme, user]);

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    await dispatch(
      updateUserProfile({
        username: nickname,
      }),
    );

    setIsFormDirty(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative -left-10 space-y-10 pb-25"
    >
      {/* Color Theme section */}
      <div className="flex flex-col space-y-3">
        <div className="flex items-center justify-between">
          <p className="font-bold">Color Theme</p>
          <div
            className="relative h-8 w-8 cursor-pointer overflow-hidden rounded-full border-1"
            style={{ backgroundColor: theme }}
          >
            <input
              type="color"
              name="theme"
              id="theme"
              value={theme}
              onChange={(e) => {
                setTheme(e.target.value);
              }}
              className="absolute -top-5 -left-5 h-15 w-15 cursor-pointer"
            />
          </div>
        </div>
        <small className="font-extralight text-white/50">
          Setting a theme will change how AFKAT looks for you. When other people
          view your profile, they'll also be switched to your theme.
        </small>
      </div>

      {/* Username section */}
      <div className="flex flex-col space-y-3">
        <label className="font-bold" htmlFor="username">
          Username
        </label>
        <Input
          id="username"
          placeholder="Enter your username"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          minLength={5}
          maxLength={20}
          pattern="[a-zA-Z0-9_]+"
          title="Username can only contain letters, numbers and underscores"
          required
        />
        <p className="font-extralight tracking-wide text-white/50">
          Profile URL:{" "}
          <span className="rounded-full bg-black/20 px-2 py-1 text-sm">
            https://AFKAT.com/@
            <span className="font-medium text-white">{nickname}</span>
          </span>
        </p>
        <small className="font-extralight text-white/50">
          Changing your username will change your public profile URL. Any
          current links to your old profile URL will not automatically redirect
          to your new profile URL.
        </small>
      </div>

      {/* Github Link section */}
      <div className="flex flex-col space-y-3">
        <label className="font-bold" htmlFor="github-link">
          Github Link{" "}
          <span className="font-light text-white/50">(optional)</span>
        </label>
        <Input
          id="github-link"
          placeholder="Enter your github link"
          value={githubLink}
          onChange={(e) => setGithubLink(e.target.value)}
        />
        <small className="font-extralight text-white/50">
          Adding your GitHub profile link will allow others to see your projects
          and contributions. This will be displayed on your public profile.
        </small>
      </div>

      {/* LinkedIn Link section */}
      <div className="flex flex-col space-y-3">
        <label className="font-bold" htmlFor="linkedIn-link">
          LinkedIn Link{" "}
          <span className="font-light text-white/50">(optional)</span>
        </label>
        <Input
          id="linkedIn-link"
          placeholder="Enter your linkedIn link"
          value={linkedInLink}
          onChange={(e) => setLinkedInLink(e.target.value)}
        />
        <small className="font-extralight text-white/50">
          Adding your LinkedIn profile link will allow others to connect with
          you professionally. This will be displayed on your public profile.
        </small>
      </div>

      {/* Bio section */}
      <div className="flex flex-col space-y-3">
        <label className="font-bold" htmlFor="profile-bio">
          Profile Bio{" "}
          <span className="font-light text-white/50">(optional)</span>
        </label>
        <textarea
          id="profile-bio"
          placeholder="Enter your profile bio"
          className="w-full rounded-lg border border-white/25 px-4 py-2 duration-300 outline-none focus-within:border-white/100"
          rows={4}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          maxLength={500}
        />
        <small className="text-text-white/50 font-extralight">
          <span className="text-white/70">{bio.length}/500</span> characters
        </small>
      </div>

      <div className="flex w-full justify-end">
        <button
          type="submit"
          disabled={!isFormDirty || isLoading}
          className="disabled:bg-primary/50 bg-primary hover:bg-primary/70 flex items-center gap-2 rounded px-5 py-3 text-sm font-bold text-black transition-colors duration-250 disabled:cursor-not-allowed!"
        >
          {isLoading ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-transparent border-t-black"></span>
              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </button>
      </div>
    </form>
  );
};

export default ProfileInfo;
