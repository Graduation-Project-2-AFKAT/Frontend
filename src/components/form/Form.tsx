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
      className="border-primary relative mt-10 flex h-[500px] w-[350px] flex-col items-center rounded-2xl border-2 bg-[#121015] shadow-md duration-500 focus-within:shadow-lg focus-within:shadow-teal-400/25"
    >
      <div className="flex flex-1 items-center text-4xl">LOGO</div>

      <div className="flex w-full flex-1 flex-col items-center justify-center space-y-6 duration-500">
        {useLocation().pathname === "/register" && (
          <div className="flex flex-col space-y-1">
            <Input
              label="username"
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
            label="email"
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
            label="password"
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
