import Input from "../../components/ui/Input";

interface IProps {}

const ChangePassword = ({}: IProps) => {
  return (
    <div className="space-y-10">
      <div className="flex flex-col space-y-3">
        <label htmlFor="current-password">Current Password</label>
        <Input type="password" id="current-password" />
      </div>
      <div className="flex flex-col space-y-3">
        <label htmlFor="new-password">New Password</label>
        <Input type="password" id="new-password" />
      </div>
      <div className="flex flex-col space-y-3">
        <label htmlFor="confirm-new-password">Confirm New Password</label>
        <Input type="password" id="confirm-new-password" />
      </div>

      <button className="bg-primary mt-5 cursor-pointer rounded-lg px-5 py-2.5 text-sm font-bold text-black duration-50 hover:opacity-80">
        Change Account Password
      </button>
    </div>
  );
};

export default ChangePassword;
