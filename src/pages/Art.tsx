import { Download, Edit, Flag, Trash } from "lucide-react";
import moment from "moment";
import {
  lazy,
  MouseEvent as ReactMouseEvent,
  Suspense,
  useEffect,
  useState,
} from "react";
import { Link, useLocation } from "react-router";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  commentAsset,
  deleteAsset,
  downloadAsset,
  loadAssetById,
  resetAsset,
} from "../redux/modules/assets";
import ModelCanvas from "./ModelCanvas";

const ArtComments = lazy(() => import("../components/Arts/ArtComments"));

const Art = () => {
  const { user } = useAppSelector((state) => state.users);
  const { Asset, downloadProgress, estimatedTime } = useAppSelector(
    (state) => state.assets,
  );
  const { isLoading, type } = useAppSelector((state) => state.loading);
  const dispatch = useAppDispatch();

  const {
    id,
    user_id,
    title,
    description,
    author,
    tags,
    created_at,
    download_count,
    model_file,
  } = Asset || {};

  const location = useLocation();

  const [comment, setComment] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"details" | "comments">("details");
  const [isReportLoading, setIsReportLoading] = useState<boolean>(false);

  useEffect(() => {
    if (location.state?.permissionDenied) {
      toast.warn(location.state?.message);
    }

    const id = location.pathname.split("/").pop();

    dispatch(loadAssetById(id!));

    return () => {
      dispatch(resetAsset());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDownload = () => {
    if (id) {
      dispatch(
        downloadAsset({ id: id, assetTitle: title!, assetFile: model_file! }),
      );
    }
  };

  const handleDelete = () => {
    if (
      window.confirm(
        "Are you sure you want to delete this game? This action cannot be undone.",
      )
    ) {
      dispatch(deleteAsset(Asset?.id));
    }
  };

  const handleReport = () => {
    setIsReportLoading(true);
    setTimeout(() => {
      toast.info("Your report has been sent successfully");
      setIsReportLoading(false);
    }, 1000);
  };

  const handleSubmitComment = (e: ReactMouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!Asset) return;

    const commentData = { comment: comment, assetId: Asset.id };
    dispatch(commentAsset(commentData));

    setComment("");
  };

  return (
    <div className="w-full overflow-y-auto">
      <div className="space-y-8 px-15 pt-8 pb-20">
        {/* Header */}
        <header className="mx-auto flex max-w-[68rem] items-center justify-between">
          <div className="flex flex-col space-y-3">
            <h1 className="text-3xl font-bold">{title}</h1>
            <div className="flex items-center">
              <Link to={`/profile/${user_id}`}>
                <img
                  src={`${user?.userProfile.profile_image}`}
                  alt="avatar"
                  className="mr-2 h-10 w-10 rounded-full"
                />
              </Link>

              <span className="text-white/70">by</span>
              <Link
                to={`/profile/${user_id}`}
                className="hover:text-primary ml-1 font-medium"
              >
                {author}
              </Link>
            </div>
          </div>

          <div className="flex flex-col items-end gap-x-3 gap-y-2 sm:flex-row">
            <div className="relative flex flex-col items-end">
              <button
                onClick={handleDownload}
                disabled={isLoading && type === "assets/download"}
                className={`"disabled:bg-primary/70 bg-primary text-primary-content flex items-center gap-x-2 rounded px-4 py-2 text-sm font-bold duration-150 disabled:cursor-not-allowed! ${!(isLoading && type === "assets/download") && "hover:scale-95"}`}
              >
                {isLoading && type === "assets/download"
                  ? `Downloading...`
                  : `Download`}
                <Download width={18} />
              </button>

              {/* Progress bar - only show when downloading */}
              {isLoading &&
                type === "assets/download" &&
                downloadProgress > 0 && (
                  <div className="absolute bottom-0 mt-2 w-full max-w-[150px] translate-y-8">
                    <div className="h-1.5 w-full rounded-full bg-gray-700">
                      <div
                        className="bg-primary h-1.5 rounded-full transition-all duration-300 ease-out"
                        style={{ width: `${downloadProgress}%` }}
                      />
                    </div>
                    <div className="mt-1 flex justify-between text-xs">
                      <p>~{estimatedTime || 0}s left</p>
                      <p>{downloadProgress}%</p>
                    </div>
                  </div>
                )}
            </div>
            <div className="flex gap-x-2">
              {user_id === user?.id && (
                <>
                  <Link
                    to={"edit"}
                    className="inline-flex rounded border border-white/20 px-3 py-2.5 hover:border-white/50"
                  >
                    <Edit size={20} />
                  </Link>
                  <button
                    className="text-error hover:border-error/50 inline-flex rounded border border-white/20 px-3 py-2"
                    onClick={handleDelete}
                  >
                    <Trash size={20} />
                  </button>
                </>
              )}
            </div>
          </div>
        </header>

        {/* 3D Model Viewer */}
        {model_file && <ModelCanvas model_file={model_file} />}

        {/* Tabs */}
        <div className="border-b border-white/10">
          <div className="flex">
            <button
              className={`px-5 py-3 font-medium ${activeTab === "details" ? "border-primary text-primary border-b-2" : "text-white/70"}`}
              onClick={() => setActiveTab("details")}
            >
              Details
            </button>
            <button
              className={`px-5 py-3 font-medium ${activeTab === "comments" ? "border-primary text-primary border-b-2" : "text-white/70"}`}
              onClick={() => setActiveTab("comments")}
            >
              Comments
            </button>
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === "details" ? (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h2 className="mb-3 text-xl font-semibold">Description</h2>
              <p className="mb-10 pl-3 leading-relaxed text-white/80">
                {description}
              </p>

              <div>
                <h3 className="mb-3 text-lg font-medium">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {tags &&
                    tags.map((tag: string) => (
                      <a
                        key={tag}
                        href={`/arts?tag=${tag}`}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm transition-colors hover:border-teal-400/50"
                      >
                        {tag}
                      </a>
                    ))}
                </div>
              </div>
            </div>

            <div className="h-fit rounded-lg border border-white/10 bg-[#16141C] p-6">
              <h2 className="mb-4 text-xl font-semibold">Asset Information</h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-white/70">File Format</span>
                  <span className="font-medium">
                    {model_file?.split(".").pop()?.toUpperCase()}
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-white/70">License</span>
                  <span className="text-end font-medium">
                    Standard Commercial License
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-white/70">Downloads</span>
                  <span className="font-medium">{`${download_count ? download_count + "+" : 0}`}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-white/70">Published</span>
                  <span className="font-medium">
                    {moment(created_at).format("l")}
                  </span>
                </div>
              </div>

              <div className="mt-6 border-t border-white/10 pt-6">
                <button
                  className="flex w-full items-center justify-center gap-2 rounded border border-white/10 bg-white/5 py-2 text-white/70 hover:bg-white/10 disabled:cursor-not-allowed! disabled:opacity-80"
                  onClick={handleReport}
                  disabled={isReportLoading}
                >
                  {isReportLoading && (
                    <svg
                      className="mr-3 -ml-1 size-5 animate-spin text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  )}
                  {/* //TODO press report asset to send email to support service or admin */}
                  <Flag size={16} />
                  Report Asset
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-6">
            <form className="mb-6 rounded-lg border border-white/10 bg-[#16141C] p-6">
              <h3 className="mb-4 font-medium">Leave a Comment</h3>
              <textarea
                className="field-sizing-content min-h-40 w-full rounded border border-white/10 bg-white/5 p-3 text-white placeholder-white/50 transition-colors outline-none focus:border-teal-400"
                placeholder="Share your thoughts about this asset..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <div className="mt-4 flex justify-end">
                <button
                  className="bg-primary rounded px-6 py-2 font-medium text-black"
                  onClick={(e) => handleSubmitComment(e)}
                >
                  Post Comment
                </button>
              </div>
            </form>

            <Suspense
              fallback={
                <div className="flex items-center justify-center py-12">
                  <div className="flex flex-col items-center gap-3">
                    <div className="border-primary h-10 w-10 animate-spin rounded-full border-t-2 border-b-2"></div>
                    <p>Loading comments...</p>
                  </div>
                </div>
              }
            >
              <ArtComments />
            </Suspense>
          </div>
        )}
      </div>
    </div>
  );
};

export default Art;
