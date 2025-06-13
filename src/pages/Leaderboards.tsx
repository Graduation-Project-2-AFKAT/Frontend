import {
  Calendar,
  ChevronDown,
  Filter,
  Medal,
  Search,
  Star,
  Trophy,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { loadLeaderboardsEntries } from "../redux/modules/leaderboards";

const Leaderboards = () => {
  const dispatch = useAppDispatch();

  const { isLoading } = useAppSelector((state) => state.loading);
  const { user } = useAppSelector((state) => state.users);
  const { Entries } = useAppSelector((state) => state.leaderboards);

  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [timeRange, setTimeRange] = useState<string>("all-time");
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState<boolean>(false);
  const [isTimeMenuOpen, setIsTimeMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    dispatch(loadLeaderboardsEntries());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getRankDecoration = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="text-yellow-400" size={24} />;
      case 2:
        return <Medal className="text-gray-400" size={24} />;
      case 3:
        return <Medal className="text-amber-700" size={24} />;
      default:
        return <span className="text-lg font-bold">{rank}</span>;
    }
  };

  if (isLoading) {
    return (
      <main className="h-full w-full overflow-y-auto">
        <div className="container mx-auto max-w-6xl px-4 py-8">
          <div className="animate-pulse space-y-8">
            <div className="bg-base-300 h-8 w-64 rounded" />
            <div className="bg-base-300 h-12 w-full rounded" />
            <div className="space-y-4">
              {[...Array(10)].map((_, idx) => (
                <div key={idx} className="bg-base-300 h-20 w-full rounded" />
              ))}
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="h-full w-full overflow-y-auto">
      <div className="mx-auto max-w-6xl px-[8%] pt-8 pb-16 md:px-[5%]">
        <h1 className="mb-6 text-3xl font-bold">Leaderboards</h1>

        {/* Filters and search */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative">
              <button
                className="border-base-content/20 bg-base-200 flex items-center justify-between gap-2 rounded-lg border px-4 py-2.5 font-medium"
                onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
              >
                <Filter size={16} />
                <span>
                  {activeFilter === "all" ? "All Games" : activeFilter}
                </span>
                <ChevronDown size={16} />
              </button>

              {isFilterMenuOpen && (
                <div className="border-base-content/10 bg-base-200 absolute top-full left-0 z-50 mt-1 w-48 rounded-lg border py-2 shadow-lg">
                  <button
                    className={`hover:bg-base-300 w-full px-4 py-2 text-left ${activeFilter === "all" ? "text-primary" : ""}`}
                    onClick={() => {
                      setActiveFilter("all");
                      setIsFilterMenuOpen(false);
                    }}
                  >
                    All Games
                  </button>
                  <button
                    className={`hover:bg-base-300 w-full px-4 py-2 text-left ${activeFilter === "CS:GO" ? "text-primary" : ""}`}
                    onClick={() => {
                      setActiveFilter("CS:GO");
                      setIsFilterMenuOpen(false);
                    }}
                  >
                    CS:GO
                  </button>
                  <button
                    className={`hover:bg-base-300 w-full px-4 py-2 text-left ${activeFilter === "Valorant" ? "text-primary" : ""}`}
                    onClick={() => {
                      setActiveFilter("Valorant");
                      setIsFilterMenuOpen(false);
                    }}
                  >
                    Valorant
                  </button>
                  <button
                    className={`hover:bg-base-300 w-full px-4 py-2 text-left ${activeFilter === "Minecraft" ? "text-primary" : ""}`}
                    onClick={() => {
                      setActiveFilter("Minecraft");
                      setIsFilterMenuOpen(false);
                    }}
                  >
                    Minecraft
                  </button>
                  <button
                    className={`hover:bg-base-300 w-full px-4 py-2 text-left ${activeFilter === "Fortnite" ? "text-primary" : ""}`}
                    onClick={() => {
                      setActiveFilter("Fortnite");
                      setIsFilterMenuOpen(false);
                    }}
                  >
                    Fortnite
                  </button>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                className="border-base-content/20 bg-base-200 flex items-center justify-between gap-2 rounded-lg border px-4 py-2.5 font-medium"
                onClick={() => setIsTimeMenuOpen(!isTimeMenuOpen)}
              >
                <Calendar size={16} />
                <span>
                  {timeRange === "all-time"
                    ? "All Time"
                    : timeRange === "this-month"
                      ? "This Month"
                      : timeRange === "this-week"
                        ? "This Week"
                        : "All Time"}
                </span>
                <ChevronDown size={16} />
              </button>

              {isTimeMenuOpen && (
                <div className="border-base-content/10 bg-base-200 absolute top-full left-0 z-50 mt-1 w-48 rounded-lg border py-2 shadow-lg">
                  <button
                    className={`hover:bg-base-300 w-full px-4 py-2 text-left ${timeRange === "all-time" ? "text-primary" : ""}`}
                    onClick={() => {
                      setTimeRange("all-time");
                      setIsTimeMenuOpen(false);
                    }}
                  >
                    All Time
                  </button>
                  <button
                    className={`hover:bg-base-300 w-full px-4 py-2 text-left ${timeRange === "this-month" ? "text-primary" : ""}`}
                    onClick={() => {
                      setTimeRange("this-month");
                      setIsTimeMenuOpen(false);
                    }}
                  >
                    This Month
                  </button>
                  <button
                    className={`hover:bg-base-300 w-full px-4 py-2 text-left ${timeRange === "this-week" ? "text-primary" : ""}`}
                    onClick={() => {
                      setTimeRange("this-week");
                      setIsTimeMenuOpen(false);
                    }}
                  >
                    This Week
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="relative">
            <Search
              className="text-base-content/50 absolute top-1/2 left-3 -translate-y-1/2"
              size={18}
            />
            <input
              type="text"
              placeholder="Search users..."
              className="border-base-content/20 bg-base-200 focus:border-primary w-full rounded-lg border py-2.5 pr-4 pl-10 outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Top 3 podium (for larger screens) */}
        <div className="mb-10 hidden md:block">
          {Entries.length >= 3 && (
            <div className="flex items-end justify-center gap-6">
              {/* 2nd place */}
              <div className="flex flex-col items-center">
                <div className="mb-2 h-32 w-32 overflow-hidden rounded-full border-4 border-gray-400">
                  <img
                    src={`https://i.pravatar.cc/150?img=${Entries[1].userId}`}
                    alt={Entries[1].playerName}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="bg-base-200 flex h-40 w-40 flex-col items-center justify-center rounded-lg border border-gray-400/20 p-4 shadow-lg">
                  <Medal className="mb-2 text-gray-400" size={32} />
                  <span className="font-bold">{Entries[1].playerName}</span>
                  <span className="text-primary font-bold">
                    {Entries[1].score.toLocaleString()} pts
                  </span>
                </div>
              </div>

              {/* 1st place */}
              <div className="flex flex-col items-center">
                <div className="mb-2 h-40 w-40 overflow-hidden rounded-full border-4 border-yellow-400">
                  <img
                    src={`https://i.pravatar.cc/150?img=${Entries[0].userId}`}
                    alt={Entries[0].playerName}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="from-base-200 to-base-300 flex h-52 w-52 flex-col items-center justify-center rounded-lg border border-yellow-400/20 bg-gradient-to-b p-4 shadow-lg">
                  <Trophy className="mb-2 text-yellow-400" size={40} />
                  <span className="text-xl font-bold">
                    {Entries[0].playerName}
                  </span>
                  <span className="text-primary text-xl font-bold">
                    {Entries[0].score.toLocaleString()} pts
                  </span>
                  <div className="mt-2 flex items-center gap-2">
                    <Star className="text-yellow-400" size={16} />
                    <span>Level {Entries[0].rank}</span>
                  </div>
                </div>
              </div>

              {/* 3rd place */}
              <div className="flex flex-col items-center">
                <div className="mb-2 h-28 w-28 overflow-hidden rounded-full border-4 border-amber-700">
                  <img
                    src={`https://i.pravatar.cc/150?img=${Entries[2].userId}`}
                    alt={Entries[2].playerName}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="bg-base-200 flex h-36 w-36 flex-col items-center justify-center rounded-lg border border-amber-700/20 p-4 shadow-lg">
                  <Medal className="mb-2 text-amber-700" size={30} />
                  <span className="font-bold">{Entries[2].playerName}</span>
                  <span className="text-primary font-bold">
                    {Entries[2].score.toLocaleString()} pts
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Leaderboard table */}
        <div className="bg-base-200 border-base-content/10 overflow-hidden rounded-lg border shadow-md">
          {/* Table header */}
          <div className="border-base-content/10 bg-base-300 grid grid-cols-9! border-b px-5 py-4">
            <div className="col-span-1 font-bold">Rank</div>
            <div className="col-span-5 font-bold">Player</div>
            <div className="col-span-2 text-center font-bold">Points</div>
          </div>

          {/* Table body */}
          {Entries.length > 0 ? (
            <div className="divide-base-content/10 divide-y">
              {Entries.slice(3).map((entry) => (
                <div
                  key={entry.userId}
                  className={`hover:bg-base-300 grid grid-cols-9! px-5 py-4 md:px-6 ${
                    entry.userId === user?.id
                      ? "bg-primary/10 border-primary border-x-4 border-y"
                      : ""
                  }`}
                >
                  {/* Rank */}
                  <div className="col-span-1 mr-auto flex items-center justify-center pl-2 md:justify-start">
                    {getRankDecoration(entry.rank)}
                  </div>

                  {/* Player */}
                  <div className="col-span-2 flex items-center md:col-span-5">
                    <Link
                      to={`/profile/${entry.userId}`}
                      className="flex items-center"
                    >
                      <div className="mr-3 h-10 w-10 overflow-hidden rounded-full">
                        <img
                          src={`https://i.pravatar.cc/150?img=${entry.userId}`}
                          alt={entry.playerName}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-bold">{entry.playerName}</div>
                        <div className="text-base-content/70 text-xs">
                          CS:GO
                        </div>
                      </div>
                    </Link>
                  </div>

                  {/* Points */}
                  <div className="col-span-2 col-start-7 mt-0 flex items-center justify-center md:justify-center">
                    <span className="text-primary font-bold">
                      {entry.score.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="bg-base-300 mb-4 rounded-full p-4">
                <Trophy className="opacity-30" size={40} />
              </div>
              <h3 className="text-xl font-medium">No results found</h3>
              <p className="text-base-content/70">
                Try adjusting your filters or search query
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Leaderboards;
