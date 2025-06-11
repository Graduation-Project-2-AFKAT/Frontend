interface IProps {
  label: string;
  content: string;
  maxLength?: number;
}

const HP = ({ label, content, maxLength = 256 }: IProps) => {
  return (
    <div className="flex items-center gap-x-3 px-8">
      <label htmlFor={label} className="text-sm font-bold text-white">
        {label}
      </label>

      <div className="w-full overflow-hidden rounded-full border border-white/15 bg-[#2A2731]">
        <div
          className="bg-primary h-1.5 rounded-full"
          style={{
            width: `${Math.max(((maxLength - content.length) / maxLength) * 100, 1.5)}%`,
          }}
        />
      </div>

      {maxLength - content.length <= 25 && (
        <div className="font-bold text-red-500">
          {maxLength - content.length}
        </div>
      )}
    </div>
  );
};

export default HP;
