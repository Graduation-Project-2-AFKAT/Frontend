interface IProps {
  className?: string;
}

const Divider = ({ className }: IProps) => {
  return <span className={`${className} h-full w-px bg-amber-50`}></span>;
};

export default Divider;
