import { useForm, SubmitHandler } from "react-hook-form";
import Input from "./Input";
import { IInputs } from "../../interfaces";
import { useLocation } from "react-router";

interface IProps {
  label: string;
  redirect: string;
}

const Form = ({ label, redirect }: IProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IInputs>();
  const onSubmit: SubmitHandler<IInputs> = (data) => console.log(data);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="group border-primary relative mt-10 flex h-[525px] w-[350px] flex-col items-center rounded-2xl border-2 bg-[#121015] shadow-md duration-500 focus-within:shadow-lg focus-within:shadow-teal-400/25"
    >
      <div className="mb-4 flex flex-1 flex-col">
        <img
          src="../../public/images/AFK.svg"
          alt="AFK Buttons Logo"
          className="mt-10 h-24 w-auto duration-300 group-focus-within:mt-8 group-focus-within:h-27"
        />
      </div>

      <div className="flex w-full flex-1 flex-col items-center justify-center space-y-4 duration-500">
        {useLocation().pathname === "/register" && (
          <div className="mt-5 flex flex-col space-y-1">
            <Input
              placeholder="username"
              register={register}
              rules={{
                required: {
                  value: true,
                  message: "username is required",
                },
              }}
              errorMsg={errors.username?.message}
            />
          </div>
        )}
        <div className="flex flex-col space-y-1">
          <Input
            placeholder="email"
            register={register}
            rules={{
              required: {
                value: true,
                message: "email is required",
              },
            }}
            errorMsg={errors.email?.message}
          />
        </div>

        <div className="flex flex-col space-y-1">
          <Input
            placeholder="password"
            register={register}
            rules={{
              required: {
                value: true,
                message: "Password is required",
              },
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            }}
            errorMsg={errors.password?.message}
          />
        </div>
        <a href={redirect} className="text-primary -mt-2 text-xs duration-150">
          {redirect === "/register"
            ? "Don't have an account?"
            : "Already have an account?"}
        </a>
      </div>

      <div className="flex flex-1 items-center">
        <button
          type="submit"
          className="cursor-pointer rounded-md border-2 border-gray-200 px-4 py-2 font-bold duration-300 hover:bg-gray-200 hover:text-[#23202A]"
        >
          {label}
        </button>
      </div>
    </form>
  );
};

export default Form;
