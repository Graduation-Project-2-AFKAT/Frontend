import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useLocation } from "react-router";
import Input from "./Input";
import { IInputs } from "../../interfaces";
import getValidationSchema from "./validationSchema";
import useYupValidationResolver from "./userYupValidationResolver";
import { loginUser, registerUser } from "../../redux/modules/users";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

interface IProps {
  label: string;
  redirect: string;
}

const Form = ({ label, redirect }: IProps) => {
  const location = useLocation();
  const { isLoading } = useAppSelector((state) => state.loading);
  const dispatch = useAppDispatch();

  const resolver = useYupValidationResolver(
    getValidationSchema(location.pathname),
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IInputs>({
    resolver,
    defaultValues: {
      email: localStorage.getItem("email") || "",
      username: localStorage.getItem("username") || "",
    },
  });

  const onSubmit: SubmitHandler<IInputs> = (data) => {
    const email = watch("email");

    if (location.pathname === "/register") {
      const username = watch("username");

      if (username) {
        localStorage.setItem("username", username);
      }
    }

    if (email) {
      localStorage.setItem("email", email);
    }

    if (location.pathname === "/register") {
      dispatch(registerUser(data));
    } else if (location.pathname === "/login") {
      dispatch(loginUser(data));
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="group border-primary relative mx-10 my-auto flex min-h-[525px] w-[min(100%,350px)] flex-col items-center rounded-2xl border-2 bg-[#121015] shadow-md duration-500 focus-within:shadow-lg focus-within:shadow-teal-400/25"
    >
      <div className="mb-4 flex flex-1 flex-col">
        <img
          src="/images/AFK_Buttons.svg"
          alt="AFK Buttons Logo"
          className="mt-10 h-24 w-auto duration-300 group-focus-within:mt-8 group-focus-within:h-27"
        />
      </div>

      <div className="flex w-full flex-1 flex-col items-center justify-center duration-500 [&>*:not(:last-child)]:mb-5">
        {location.pathname === "/register" && (
          <div className="mt-5 flex flex-col space-y-1">
            <Input
              placeholder="username"
              register={register}
              errorMsg={errors.username?.message}
            />
          </div>
        )}

        <div className="flex flex-col space-y-1">
          <Input
            placeholder="email"
            register={register}
            errorMsg={errors.email?.message}
          />
        </div>

        <div className="flex flex-col space-y-1">
          <Input
            placeholder="password"
            type="password"
            register={register}
            errorMsg={errors.password?.message}
          />
        </div>

        {location.pathname === "/register" && (
          <div className="flex flex-col space-y-1">
            <Input
              placeholder="confirm_password"
              type="password"
              register={register}
              errorMsg={errors.confirm_password?.message}
            />
          </div>
        )}
      </div>
      <Link to={redirect} className="text-primary mt-8 text-xs duration-150">
        {redirect === "/register"
          ? "Don't have an account?"
          : "Already have an account?"}
      </Link>

      <div className="my-8 flex flex-1 items-center">
        <button
          type="submit"
          disabled={isLoading}
          className={`rounded-md border-2 border-gray-200 px-4 py-2 font-bold duration-300 ${
            isLoading
              ? "cursor-not-allowed opacity-60"
              : "cursor-pointer hover:bg-gray-200 hover:text-[#23202A]"
          }`}
        >
          {isLoading ? "Loading..." : label}
        </button>
      </div>
    </form>
  );
};

export default Form;
