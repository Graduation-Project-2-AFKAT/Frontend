import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="flex h-dvh flex-col items-center justify-center space-y-10 bg-red-950 text-center text-4xl font-semibold text-white">
      <h1 className="">404 Not Found</h1>

      <div className="flex gap-x-3">
        <button
          className="rounded-lg border px-3 py-1 text-xl"
          onClick={() => window.history.back()}
        >
          Go Back
        </button>
        <Link to="/" className="rounded-lg border px-3 py-1 text-xl">
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
