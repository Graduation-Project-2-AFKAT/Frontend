import { IAsset } from "../../interfaces";

interface IProps {
  asset: IAsset;
}

const ArtCard = ({ asset }: IProps) => {
  const { title, author, download_count, model_file, thumbnail } = asset;

  return (
    <div className="overflow-hidden rounded-lg border border-white/10 bg-[#2A2731] transition-all hover:border-teal-400/50 hover:shadow-lg hover:shadow-teal-400/10">
      <div className="relative aspect-video overflow-hidden">
        <img
          src={thumbnail}
          alt={title}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute top-2 right-2 rounded bg-[#121015]/80 px-3 py-1 text-sm">
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
  );
};

export default ArtCard;
