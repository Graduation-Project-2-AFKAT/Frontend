interface IProps {
  type?: string;
  id?: string;
  placeholder?: string;
  className?: string;
  onChange?: (e: any) => void;
}

const Input = ({
  type = "text",
  id,
  placeholder,
  className,
  onChange,
}: IProps) => {
  return (
    <input
      type={type}
      id={id}
      placeholder={placeholder}
      className={`${className} w-full rounded-lg border border-white/25 px-4 py-2 duration-300 outline-none focus-within:border-white/100`}
      onChange={onChange}
    />
  );
};

export default Input;
