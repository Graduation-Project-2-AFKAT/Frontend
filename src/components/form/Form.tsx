import { useForm, SubmitHandler } from "react-hook-form";
import { useLocation } from "react-router";
import Input from "./Input";
import { IInputs } from "../../interfaces";
import getValidationSchema from "./validationSchema";
import useYupValidationResolver from "./userYupValidationResolver";
import { useSelector, useDispatch } from "react-redux";
import { userLogin, userRegister } from "../../redux/modules/users";
import { IUser } from "../../interfaces";

interface RootState {
  users: IUser;
}

interface IProps {
  label: string;
  redirect: string;
}

const Form = ({ label, redirect }: IProps) => {
  const location = useLocation();

  const user = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch();

  const resolver = useYupValidationResolver(
    getValidationSchema(location.pathname),
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IInputs>({ resolver });

  const onSubmit: SubmitHandler<IInputs> = (data) => {
    if (location.pathname === "/register") {
      dispatch(userRegister(data));
    } else if (location.pathname === "/login") {
      dispatch(userLogin(data));
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="group border-primary relative mx-10 my-auto flex min-h-[525px] w-[min(100%,350px)] flex-col items-center rounded-2xl border-2 bg-[#121015] shadow-md duration-500 focus-within:shadow-lg focus-within:shadow-teal-400/25"
    >
      <div className="mb-4 flex flex-1 flex-col">
        <img
          src="../../public/images/AFK.svg"
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
            type="email"
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
      <a href={redirect} className="text-primary mt-8 text-xs duration-150">
        {redirect === "/register"
          ? "Don't have an account?"
          : "Already have an account?"}
      </a>

      <div className="my-8 flex flex-1 items-center">
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
