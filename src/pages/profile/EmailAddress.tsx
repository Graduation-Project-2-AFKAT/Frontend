import Input from "../../components/ui/Input";

interface IProps {}

const EmailAddress = ({}: IProps) => {
  return (
    <div>
      <div className="flex flex-col space-y-3">
        <label htmlFor="email">Email Address</label>
        <Input type="email" id="email" placeholder="Email Address" />
      </div>

      <hr className="my-20 opacity-25" />
    </div>
  );
};

export default EmailAddress;
