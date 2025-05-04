interface IProps {
  postTheme: string;
  ChangeTheme: (theme: string) => void;
  themeImage: string;
}

const PostTheme = ({ postTheme, ChangeTheme, themeImage }: IProps) => {
  const theme = themeImage.split("/").pop();

  return (
    <div
      className={`${postTheme === themeImage && "border-primary"} group aspect-square w-20 cursor-pointer overflow-hidden rounded-lg border-2 hover:border-2`}
      onClick={() => ChangeTheme(themeImage)}
    >
      <img
        src={`${themeImage}`}
        alt={`pattern ${theme}`}
        className="scale-250 transition-transform"
        loading="lazy"
      />
    </div>
  );
};

export default PostTheme;
