import { useAppSelector } from "../../redux/hooks";
import Input from "../../components/ui/Input";

const EmailAddress = () => {
  const { user } = useAppSelector((state) => state.users);

  return (
    <div className="flex flex-col space-y-3">
      <label htmlFor="email">Email Address</label>
      <Input
        type="email"
        id="email"
        placeholder="Email Address"
        value={user?.email}
        readOnly
      />

      <small className="text-white/25">Email address can't be changed</small>
    </div>
  );
};

export default EmailAddress;
