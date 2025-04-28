interface IProps {
  postTheme: string;
  ChangeTheme: (theme: string) => void;
  themeImage: string;
}

const PostTheme = ({ postTheme, ChangeTheme, themeImage }: IProps) => {
  const theme = themeImage.split(".")[0];

  return (
    <div
      className={`${postTheme === theme && "border-primary"} group aspect-square w-20 cursor-pointer overflow-hidden rounded-lg border-2 hover:border-2`}
      onClick={() => ChangeTheme(theme)}
    >
      <img
        src={`/patterns/${themeImage}`}
        alt={`pattern ${theme}`}
        className="scale-250 transition-transform"
        loading="lazy"
      />
    </div>
  );
};

export default PostTheme;
