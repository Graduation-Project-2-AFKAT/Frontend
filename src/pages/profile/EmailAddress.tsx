import { FormEvent, useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import Input from "../../components/ui/Input";
import { updateUserProfile } from "../../redux/modules/users";

const EmailAddress = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.users);
  const { isLoading } = useAppSelector((state) => state.loading);

  const [email, setEmail] = useState<string>(user?.email || "");
  const [isFormDirty, setIsFormDirty] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      setEmail(user.email);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      const isDirty = email !== user.email;

      setIsFormDirty(isDirty);
    }
  }, [user, email]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    //TODO: email is not allowed to be changed by the backend
    await dispatch(
      updateUserProfile({
        email: email,
      }),
    );

    setIsFormDirty(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col space-y-3">
        <label htmlFor="email">Email Address</label>
        <Input
          type="email"
          id="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          readOnly
        />
      </div>

      <hr className="my-20 opacity-25" />

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

export default EmailAddress;
