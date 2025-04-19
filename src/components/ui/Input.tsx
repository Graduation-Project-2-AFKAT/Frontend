import { InputHTMLAttributes } from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input = ({ type = "text", className = "", ...rest }: IProps) => {
  return (
    <input
      type={type}
      className={`${className} w-full rounded-lg border border-white/25 px-4 py-2 duration-300 outline-none focus-within:border-white/100`}
      {...rest}
    />
  );
};

export default Input;
