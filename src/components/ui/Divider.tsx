interface IProps {
  className?: string;
}
//TODO delete if not used at all
const Divider = ({ className = "" }: IProps) => {
  return <span className={`${className} h-full w-px bg-amber-50`}></span>;
};

export default Divider;
