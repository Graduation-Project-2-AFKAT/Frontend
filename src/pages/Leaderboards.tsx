import { Search, Trophy } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { loadLeaderboards } from "../redux/modules/leaderboards";

const Leaderboards = () => {
  const dispatch = useAppDispatch();

  const { isLoading } = useAppSelector((state) => state.loading);
  const { Leaderboards } = useAppSelector((state) => state.leaderboards);

  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    if (Leaderboards.length === 0) dispatch(loadLeaderboards());
  }, []);

  // Mock data for leaderboards - replace with actual data when available
  const mockLeaderboards = [
    {
      id: 1,
      gameId: 1,
      leaderboardName: "CS:GO Global Rankings",
      totalPlayers: 15420,
      topPlayer: "ProGamer2024",
      topScore: 98500,
      lastUpdated: "2024-12-30",
    },
    {
      id: 2,
      gameId: 2,
      leaderboardName: "Valorant Competitive",
      totalPlayers: 8735,
      topPlayer: "ValorantKing",
      topScore: 75300,
      lastUpdated: "2024-12-30",
    },
    {
      id: 3,
      gameId: 3,
      leaderboardName: "Minecraft Speed Run",
      totalPlayers: 12450,
      topPlayer: "CraftMaster",
      topScore: 89200,
      lastUpdated: "2024-12-29",
    },
    {
      id: 4,
      gameId: 4,
      leaderboardName: "Fortnite Solo Victory",
      totalPlayers: 25670,
      topPlayer: "BuilderPro",
      topScore: 156400,
      lastUpdated: "2024-12-30",
    },
    {
      id: 5,
      gameId: 5,
      leaderboardName: "League of Legends Ranked",
      totalPlayers: 18920,
      topPlayer: "RiftChampion",
      topScore: 112800,
      lastUpdated: "2024-12-30",
    },
    {
      id: 6,
      gameId: 6,
      leaderboardName: "Rocket League Championship",
      totalPlayers: 9840,
      topPlayer: "CarSoccer",
      topScore: 68900,
      lastUpdated: "2024-12-29",
    },
  ];

  const filteredLeaderboards = Leaderboards.filter((leaderboard) =>
    leaderboard.leaderboardName
      .toLowerCase()
      .includes(searchQuery.toLowerCase()),
  );

  return (
    <main className="h-full w-full overflow-y-auto">
      <div className="max-w-8xl mx-auto px-[8%] pt-8 pb-16 md:px-[5%]">
        <h1 className="mb-6 text-3xl font-bold">Leaderboards</h1>

        {/* Search */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-base-content/70">
            Choose a leaderboard to view rankings and compete with other players
          </p>

          <div className="relative">
            <Search
              className="text-base-content/50 absolute top-1/2 left-3 -translate-y-1/2"
              size={18}
            />
            <input
              type="text"
              placeholder="Search leaderboards..."
              className="border-base-content/20 bg-base-200 focus:border-primary w-full rounded-lg border py-2.5 pr-4 pl-10 outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Leaderboards Grid */}
        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, idx) => (
              <div
                key={idx}
                className="bg-base-200 flex h-52 animate-pulse flex-col justify-between rounded-lg p-6"
              >
                <div className="flex justify-between gap-x-2">
                  <div className="bg-base-300 h-4 w-4/12 rounded" />
                  <div className="bg-base-300 h-8 w-1/13 rounded" />
                </div>
                <div>
                  <div className="bg-base-300 mb-4 h-15 w-full rounded" />
                  <div className="flex justify-between gap-x-2">
                    <div className="bg-base-300 h-4 w-2/4 rounded" />
                    <div className="bg-base-300 h-4 w-1/6 rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredLeaderboards.map((leaderboard) => (
              <Link
                key={leaderboard.id}
                to={`/leaderboards/${leaderboard.id}`}
                className="bg-base-200 hover:bg-base-300 group border-base-content/10 hover:border-primary/30 cursor-pointer rounded-lg border p-6 transition-all duration-200 hover:shadow-lg"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <h3 className="group-hover:text-primary text-xl font-bold transition-colors">
                      {leaderboard.leaderboardName}
                    </h3>
                    <p className="text-base-content/70 text-sm">
                      {mockLeaderboards[
                        leaderboard.id % mockLeaderboards.length
                      ].totalPlayers.toLocaleString()}{" "}
                      players
                    </p>
                  </div>
                  <Trophy
                    className="text-primary opacity-60 transition-opacity group-hover:opacity-100"
                    size={24}
                  />
                </div>

                <div className="space-y-3">
                  <div className="bg-base-300 flex items-center justify-between rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/20 flex h-8 w-8 items-center justify-center rounded-full">
                        <Trophy className="text-primary" size={16} />
                      </div>
                      <div>
                        <p>
                          {
                            mockLeaderboards[
                              leaderboard.id % mockLeaderboards.length
                            ].topPlayer
                          }
                        </p>
                        <p className="text-base-content/70 text-xs">
                          Current Leader
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-primary font-bold">
                        {mockLeaderboards[
                          leaderboard.id % mockLeaderboards.length
                        ].topScore.toLocaleString()}
                      </p>
                      <p className="text-base-content/70 text-xs">points</p>
                    </div>
                  </div>

                  <div className="text-base-content/70 flex items-center justify-between text-sm">
                    <span>
                      Last updated:{" "}
                      {new Date(
                        mockLeaderboards[
                          leaderboard.id % mockLeaderboards.length
                        ].lastUpdated,
                      ).toLocaleDateString()}
                    </span>
                    <span className="text-primary font-medium">
                      View Details →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {filteredLeaderboards.length === 0 && !isLoading && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="bg-base-300 mb-4 rounded-full p-4">
              <Search className="opacity-30" size={40} />
            </div>
            <h3 className="text-xl font-medium">No leaderboards found</h3>
            <p className="text-base-content/70">
              Try adjusting your search query
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default Leaderboards;
