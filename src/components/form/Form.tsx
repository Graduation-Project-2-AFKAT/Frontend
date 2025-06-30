import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useLocation } from "react-router";
import Input from "./Input";
import { IForm } from "../../interfaces";
import { loginUser, registerUser } from "../../redux/modules/users";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema, registerSchema } from "../../validation";

interface IProps {
  label: string;
  redirect: string;
}

const Form = ({ label, redirect }: IProps) => {
  const location = useLocation();

  const { isLoading } = useAppSelector((state) => state.loading);
  const dispatch = useAppDispatch();

  const resolver =
    location.pathname === "/login" ? loginSchema : registerSchema;

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IForm>({
    resolver: yupResolver(resolver),
    defaultValues: {
      email: localStorage.getItem("email") || "",
      username: localStorage.getItem("username") || "",
    },
  });

  const onSubmit: SubmitHandler<IForm> = (data) => {
    const email = watch("email");
    if (email) {
      localStorage.setItem("email", email);
    }

    if (location.pathname === "/register") {
      const username = watch("username");

      if (username) {
        localStorage.setItem("username", username);
      }
      dispatch(registerUser(data));
    } else if (location.pathname === "/login") {
      dispatch(loginUser(data));
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="group relative mx-10 my-auto flex min-h-[525px] w-[min(100%,350px)] flex-col items-center rounded-2xl border-2 border-teal-400 bg-[#121015] shadow-md duration-500 focus-within:shadow-lg focus-within:shadow-teal-400/25"
    >
      <div className="mb-4 flex flex-1 flex-col">
        <img
          src="/images/AFK_Buttons.webp"
          alt="AFK Buttons Logo"
          className="mt-10 h-24 w-auto duration-300 group-focus-within:scale-110"
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
      <Link
        to={redirect}
        className="mt-8 text-xs duration-150"
        onClick={() => {
          localStorage.removeItem("email");
          localStorage.removeItem("username");
        }}
      >
        {redirect === "/register"
          ? "Don't have an account?"
          : "Already have an account?"}
      </Link>

      <div className="my-8 flex flex-1 items-center">
        <button
          type="submit"
          disabled={isLoading}
          className="flex items-center justify-center rounded-md border-2 border-gray-200 px-4 py-2 font-bold duration-300 hover:bg-gray-200 hover:text-[#23202A] disabled:cursor-not-allowed! disabled:opacity-60"
        >
          {isLoading && (
            <svg
              className="mr-3 -ml-1 size-5 animate-spin text-teal-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          )}
          {label}
        </button>
      </div>
    </form>
  );
};

export default Form;
