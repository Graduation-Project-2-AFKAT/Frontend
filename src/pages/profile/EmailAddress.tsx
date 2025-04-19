import { useEffect, useState } from "react";
import Input from "../../components/ui/Input";
import { useAppSelector } from "../../redux/hooks";

const EmailAddress = () => {
  const { user } = useAppSelector((state) => state.users);

  const [email, setEmail] = useState<string>(user?.email || "");

  useEffect(() => {
    if (user) {
      setEmail(user.email);
    }
  }, [user]);

  return (
    <div>
      <div className="flex flex-col space-y-3">
        <label htmlFor="email">Email Address</label>
        <Input
          type="email"
          id="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <hr className="my-20 opacity-25" />
    </div>
  );
};

export default EmailAddress;
