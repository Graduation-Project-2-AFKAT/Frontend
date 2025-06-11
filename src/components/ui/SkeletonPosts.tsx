const SkeletonPosts = () => {
  return (
    <>
      {[1, 2, 3].map((item) => (
        <li
          key={item}
          className="bg-base-content/5 w-full animate-pulse rounded-xl border border-white/10 p-5"
        >
          <div className="flex items-center space-x-2">
            <div className="h-10 w-10 rounded-full bg-white/10"></div>
            <div className="h-4 w-32 rounded bg-white/10"></div>
            <div className="ml-auto h-6 w-20 rounded bg-white/10"></div>
          </div>

          <div className="mt-4 h-5 w-3/4 rounded bg-white/10"></div>
          <div className="mt-7 h-82 rounded-lg bg-white/5"></div>
          <div className="mt-4 flex justify-end">
            <div className="flex space-x-4">
              <div className="h-6 w-16 rounded bg-white/10"></div>
              <div className="h-6 w-24 rounded bg-white/10"></div>
            </div>
          </div>
        </li>
      ))}
    </>
  );
};

export default SkeletonPosts;
