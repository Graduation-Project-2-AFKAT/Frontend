import { FormEvent, useEffect, useState } from "react";
import Input from "../../components/ui/Input";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { changePassword } from "../../redux/modules/users";

const ChangePassword = () => {
  const { isLoading } = useAppSelector((state) => state.loading);
  const dispatch = useAppDispatch();

  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isFormDirty, setIsFormDirty] = useState<boolean>(false);
  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true);
  const [formError, setFormError] = useState<string>("");

  // Check if form is dirty
  useEffect(() => {
    const isDirty = newPassword !== "" || confirmNewPassword !== "";
    setIsFormDirty(isDirty);
  }, [newPassword, confirmNewPassword]);

  // Check if passwords match
  useEffect(() => {
    // Only validate when both fields have values
    if (newPassword && confirmNewPassword) {
      const match = newPassword === confirmNewPassword;
      setPasswordsMatch(match);

      if (!match) {
        setFormError("Passwords do not match");
      } else {
        setFormError("");
      }
    } else {
      // Reset the error when fields are empty
      setPasswordsMatch(true);
      setFormError("");
    }
  }, [newPassword, confirmNewPassword]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validate before submission
    if (!newPassword || !confirmNewPassword) {
      setFormError("Both fields are required");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setFormError("Passwords do not match");
      return;
    }

    const formData = new FormData();
    formData.append("new_password1", newPassword);
    formData.append("new_password2", confirmNewPassword);

    await dispatch(changePassword(formData));

    // Reset form after submission
    setNewPassword("");
    setConfirmNewPassword("");
    setIsFormDirty(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      <div className="flex flex-col space-y-3">
        <label htmlFor="new-password">New Password</label>
        <Input
          type="password"
          id="new-password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          minLength={8}
          required
        />
        <small className="text-white/50">
          Password must be at least 8 characters long
        </small>
      </div>

      <div className="flex flex-col space-y-3">
        <label htmlFor="confirm-new-password">Confirm New Password</label>
        <Input
          type="password"
          id="confirm-new-password"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
          className="mb-5"
          required
        />

        {/* <small className="min-h-5 text-red-500">
          {!passwordsMatch && confirmNewPassword && "Passwords do not match"}
        </small> */}

        {/* Form error message */}

        <div
          className={`${!formError && "opacity-0"} min-h-10 rounded bg-red-500/10 px-3 py-2 text-red-500 transition-opacity`}
        >
          {formError ? formError : ""}
        </div>
      </div>

      <div className="flex w-full justify-end">
        <button
          type="submit"
          disabled={
            !isFormDirty ||
            isLoading ||
            !newPassword ||
            !confirmNewPassword ||
            !passwordsMatch
          }
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

export default ChangePassword;
