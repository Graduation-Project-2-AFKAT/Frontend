interface InputProps {
  placeholder: string;
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
  className,
}: InputProps) => (
  <>
    <input
      {...(register ? register(placeholder, rules) : {})}
      className={`w-[250px] rounded-md border-1 border-gray-200 p-2 text-sm duration-300 focus:px-4 ${className}`}
      placeholder={placeholder}
    />
    {errorMsg && <small className="self-start text-red-400">{errorMsg}</small>}
  </>
);

export default Input;
