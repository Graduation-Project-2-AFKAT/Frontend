import { Link } from "react-router";
import { IAsset } from "../../interfaces";

interface IProps {
  asset: IAsset;
}

const ArtCard = ({ asset }: IProps) => {
  const { title, author, download_count, model_file, thumbnail } = asset;

  return (
    <Link
      to={`${asset.id}`}
      className="outline-primary bg-secondary/5 border-primary/25 aspect-[4/5] rounded-2xl border shadow-md drop-shadow-md duration-50 md:rounded-lg lg:hover:outline-2 lg:hover:outline-dashed"
    >
      <div className="flex h-full flex-col justify-between">
        <div className="relative h-full overflow-hidden">
          <img
            src={thumbnail}
            alt={title}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute top-2 right-2 rounded bg-white/10 px-3 py-1 text-sm">
            FREE
          </div>
        </div>
        <div className="p-4">
          <h3 className="group-hover:text-primary text-lg font-bold transition-colors">
            {title}
          </h3>
          <div className="mt-2 flex items-center text-sm text-white/70">
            <span>by {author}</span>
            <span className="mx-2">•</span>
            <span>category</span>
          </div>
          <div className="mt-4 flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <span className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-1 h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                {download_count}
              </span>
            </div>
            <span className="rounded bg-white/10 px-2 py-1 text-xs">
              {model_file.split(".").pop()?.toUpperCase()}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ArtCard;
