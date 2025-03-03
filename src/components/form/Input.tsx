interface InputProps {
  placeholder: string;
  register?: any;
  rules?: {
    [key: string]: string | object;
  };
  errorMsg?: string;
  className?: string;
  type?: string;
}

const Input = ({
  placeholder,
  register,
  rules,
  errorMsg,
  className = "",
  type = "text",
}: InputProps) => (
  <>
    <input
      {...(register ? register(placeholder, rules) : {})}
      className={`w-[250px] rounded-md border-1 border-gray-200 p-2 text-sm duration-300 focus:px-4 ${className}`}
      placeholder={placeholder}
      type={type}
    />
    {errorMsg && <small className="self-start text-red-400">{errorMsg}</small>}
  </>
);

export default Input;
