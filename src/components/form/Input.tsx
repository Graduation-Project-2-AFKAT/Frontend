import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  register?: any;
  rules?: {
    [key: string]: string | object;
  };
  errorMsg?: string;
  className?: string;
}

const Input = ({
  placeholder,
  register,
  rules,
  errorMsg,
  className = "",
  type = "text",
  ...rest
}: InputProps) => (
  <>
    <input
      {...(register ? register(placeholder, rules) : {})}
      className={`w-[250px] rounded-md border-1 border-gray-200 p-2 text-sm transition-colors ${className}`}
      placeholder={placeholder}
      type={type}
      {...rest}
    />
    {errorMsg && <small className="self-start text-red-400">{errorMsg}</small>}
  </>
);

export default Input;
