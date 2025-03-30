import Input from "../../components/ui/Input";

interface IProps {
  nickname: string;
  setNickname: (nickname: string) => void;
}

const ProfileInfo = ({ nickname, setNickname }: IProps) => {
  return (
    <div className="relative -left-10 space-y-10 pb-25">
      <div className="flex flex-col space-y-3">
        <div className="flex items-center justify-between">
          <p className="font-bold">Color Theme</p>
          <div className="relative h-8 w-8 cursor-pointer overflow-hidden rounded-full border-1">
            <input
              type="color"
              name="theme"
              id="theme"
              className="absolute -top-5 -left-5 h-15 w-15"
            />
          </div>
        </div>
        <small className="font-extralight text-white/50">
          Setting a theme will change how Game Jolt looks for you. When other
          people view your profile, they'll also be switched to your theme.
        </small>
      </div>

      <div className="flex flex-col space-y-3">
        <label className="font-bold" htmlFor="username">
          Username
        </label>
        <Input
          id="username"
          placeholder="Enter your username"
          onChange={(e) => setNickname(e.target.value)}
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

      <div className="flex flex-col space-y-3">
        <label className="font-bold" htmlFor="display-name">
          Display Name{" "}
          <span className="font-light text-white/50">(optional)</span>
        </label>
        <Input id="display-name" placeholder="Enter your display name" />

        <small className="font-extralight text-white/50">
          Your display name is an optional personal identifier (such as a
          company name or real name). Unlike usernames, display names can
          contain spaces and special characters.
        </small>
      </div>

      <div className="flex flex-col space-y-3">
        <label className="font-bold" htmlFor="profile-bio">
          Profile Bio{" "}
          <span className="font-light text-white/50">(optional)</span>
        </label>
        <Input id="profile-bio" placeholder="Enter your profile bio" />
      </div>

      <div className="flex flex-col space-y-3">
        <label className="font-bold" htmlFor="website">
          Website <span className="font-light text-white/50">(optional)</span>
        </label>
        <Input id="website" placeholder="Enter your website URL" />
      </div>
    </div>
  );
};

export default ProfileInfo;
