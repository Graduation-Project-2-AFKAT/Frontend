import { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  Users,
  Trophy,
  ArrowRight,
  Award,
  AlertCircle,
  MapPin,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

interface IGameJam {
  id: string;
  title: string;
  status: "active" | "upcoming" | "past";
  theme?: string;
  startDate: string;
  endDate: string;
  location: string;
  isOnline: boolean;
  participants: number;
  maxParticipants?: number;
  image: string;
  description: string;
  prizes: {
    position: string;
    prize: string;
  }[];
  organizer: {
    name: string;
    logo: string;
  };
}

const GameJam = () => {
  const [activeTab, setActiveTab] = useState<"active" | "upcoming" | "past">(
    "active",
  );
  const [gameJams, setGameJams] = useState<IGameJam[]>([]);
  const [selectedJam, setSelectedJam] = useState<IGameJam | null>(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Simulate API call to fetch game jams
    const fetchGameJams = async () => {
      setLoading(true);
      try {
        // Replace with actual API call
        // const response = await fetch('/api/gamejams');
        // const data = await response.json();

        // Using mock data for now
        const mockData: IGameJam[] = [
          {
            id: "1",
            title: "AFKAT Winter Game Jam 2025",
            status: "active",
            theme: "Parallel Worlds",
            startDate: "2025-01-15T00:00:00Z",
            endDate: "2025-04-22T16:59:59Z",
            location: "Online",
            isOnline: true,
            participants: 243,
            maxParticipants: 500,
            image:
              "https://cdn.pixabay.com/photo/2021/09/07/07/11/game-console-6603120_1280.jpg",
            description:
              "Join our winter game jam and create a game based on the theme of 'Parallel Worlds'. Work alone or in teams to develop a game in just 7 days. All skill levels welcome!",
            prizes: [
              {
                position: "1st Place",
                prize: "$2,000 + Feature on AFKAT Homepage",
              },
              {
                position: "2nd Place",
                prize: "$1,000 + Premium Assets Bundle",
              },
              {
                position: "3rd Place",
                prize: "$500 + 1-Year AFKAT Pro Subscription",
              },
              {
                position: "People's Choice",
                prize: "$300 + Featured Developer Profile",
              },
            ],
            organizer: {
              name: "AFKAT Games",
              logo: "/images/logoOutlined.svg",
            },
          },
          {
            id: "2",
            title: "Mobile Game Challenge",
            status: "upcoming",
            startDate: "2025-02-10T00:00:00Z",
            endDate: "2025-02-17T23:59:59Z",
            location: "Online",
            isOnline: true,
            participants: 112,
            image:
              "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000",
            description:
              "Create an innovative mobile game in one week! Focus on touch controls and accessibility. Open to developers of all experience levels.",
            prizes: [
              {
                position: "1st Place",
                prize: "$1,500 + Publishing Deal Opportunity",
              },
              { position: "2nd Place", prize: "$750 + Marketing Package" },
              { position: "3rd Place", prize: "$250 + Developer Tools Bundle" },
            ],
            organizer: {
              name: "MobileDev Group",
              logo: "https://placehold.co/200x200?text=MDG",
            },
          },
          {
            id: "3",
            title: "Retro Game Jam",
            status: "upcoming",
            theme: "Back to the Classics",
            startDate: "2025-03-05T00:00:00Z",
            endDate: "2025-03-12T23:59:59Z",
            location: "San Francisco, CA",
            isOnline: false,
            participants: 68,
            maxParticipants: 100,
            image:
              "https://images.unsplash.com/photo-1577741314755-048d8525d31e?q=80&w=1000",
            description:
              "A week-long jam celebrating the golden age of gaming! Create games with retro aesthetics and gameplay mechanics that would feel at home in the 80s and 90s.",
            prizes: [
              {
                position: "1st Place",
                prize: "$1,000 + Vintage Gaming Collection",
              },
              { position: "2nd Place", prize: "$500 + Retro Console" },
              { position: "3rd Place", prize: "$250 + Classic Games Bundle" },
            ],
            organizer: {
              name: "Retro Gaming Association",
              logo: "https://placehold.co/200x200?text=RGA",
            },
          },
          {
            id: "4",
            title: "Sustainability Game Jam",
            status: "past",
            theme: "Green Future",
            startDate: "2024-11-01T00:00:00Z",
            endDate: "2024-11-08T23:59:59Z",
            location: "Online",
            isOnline: true,
            participants: 186,
            image:
              "https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=1000",
            description:
              "Create games that raise awareness about environmental issues and sustainability. Use your creativity to educate and inspire players about building a greener future.",
            prizes: [
              {
                position: "1st Place",
                prize: "$1,500 + Partnership with Environmental Org",
              },
              {
                position: "2nd Place",
                prize: "$800 + Eco-Friendly Tech Package",
              },
              {
                position: "3rd Place",
                prize: "$400 + Sustainable Development Resources",
              },
            ],
            organizer: {
              name: "GreenTech Foundation",
              logo: "https://placehold.co/200x200?text=GTF",
            },
          },
          {
            id: "5",
            title: "Horror Game Challenge",
            status: "past",
            theme: "Fear the Unknown",
            startDate: "2024-10-20T00:00:00Z",
            endDate: "2024-10-27T23:59:59Z",
            location: "Online",
            isOnline: true,
            participants: 210,
            image:
              "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1000",
            description:
              "Develop a spine-chilling horror game in just one week. Focus on atmosphere, tension, and psychological elements to create an unforgettable horrifying experience.",
            prizes: [
              {
                position: "1st Place",
                prize: "$1,200 + Horror Game Publishing Deal",
              },
              {
                position: "2nd Place",
                prize: "$600 + Professional Sound Effects Package",
              },
              {
                position: "3rd Place",
                prize: "$300 + Horror Assets Collection",
              },
            ],
            organizer: {
              name: "Nightmare Studios",
              logo: "https://placehold.co/200x200?text=NS",
            },
          },
        ];

        setGameJams(mockData);
      } catch (error) {
        console.error("Error fetching game jams:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGameJams();
  }, []);

  const filteredJams = gameJams.filter((jam) => jam.status === activeTab);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getDuration = () => {
    const startDate = selectedJam?.startDate;
    const endDate = selectedJam?.endDate;

    if (startDate && endDate) {
      return new Date(startDate).getDate() - new Date(endDate).getDay();
    }
  };

  const calculateTimeLeft = (jamEndDate: string) => {
    const endDate = new Date(jamEndDate).getTime();
    const now = new Date().getTime();

    const difference = endDate - now;

    if (difference <= 0) {
      return "Ended";
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );

    return `${days}d ${hours}h remaining`;
  };

  const handleJamDetails = (jam: IGameJam) => {
    setSelectedJam(jam);
    setShowModal(true);
  };

  const scrollToTop = () => {
    const main = document.getElementById("main-elem");

    if (main) {
      main.scrollTop = 0;
    }
  };

  return (
    <div className="p-10">
      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="mb-4 text-4xl font-bold">Game Jams</h1>
        <p className="mx-auto max-w-3xl text-lg text-white/70">
          Join exciting game development competitions, collaborate with other
          creators, and challenge yourself to build amazing games in a limited
          time frame.
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-8 flex justify-center rounded-full border-b border-white/10">
        <button
          className={`px-6 py-3 text-lg font-medium transition-colors ${
            activeTab === "active"
              ? "border-primary text-primary border-b-2"
              : "text-white/70 hover:text-white"
          }`}
          onClick={() => setActiveTab("active")}
        >
          Active
        </button>
        <button
          className={`px-6 py-3 text-lg font-medium transition-colors ${
            activeTab === "upcoming"
              ? "border-primary text-primary border-b-2"
              : "text-white/70 hover:text-white"
          }`}
          onClick={() => setActiveTab("upcoming")}
        >
          Upcoming
        </button>
        <button
          className={`px-6 py-3 text-lg font-medium transition-colors ${
            activeTab === "past"
              ? "border-primary text-primary border-b-2"
              : "text-white/70 hover:text-white"
          }`}
          onClick={() => setActiveTab("past")}
        >
          Past
        </button>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 gap-8">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="border-primary h-12 w-12 animate-spin rounded-full border-t-2 border-b-2"></div>
          </div>
        ) : filteredJams.length > 0 ? (
          filteredJams.map((jam) => (
            <div
              key={jam.id}
              className="group transform overflow-hidden rounded-xl border border-white/10 bg-[#16141C] transition-all duration-300 hover:translate-y-[-4px] hover:border-black/10 hover:shadow-lg hover:shadow-black/50"
            >
              <div className="flex flex-col md:flex-row">
                {/* Image */}
                <div className="h-64 overflow-hidden md:h-auto md:w-1/3">
                  <img
                    src={jam.image}
                    alt={jam.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div className="mb-4">
                    <div className="mb-2 flex items-center justify-between">
                      <h2 className="group-hover:text-primary text-2xl font-bold transition-colors">
                        {jam.title}
                      </h2>
                      {jam.status === "active" && (
                        <span className="bg-primary/20 text-primary rounded-full border px-3 py-1 text-sm font-medium">
                          {calculateTimeLeft(jam.endDate)}
                        </span>
                      )}
                    </div>

                    {jam.theme && (
                      <div className="mb-3">
                        <span className="text-white/70">Theme:</span>{" "}
                        <span className="font-medium">{jam.theme}</span>
                      </div>
                    )}

                    <p className="mb-4 line-clamp-2 text-white/70">
                      {jam.description}
                    </p>

                    <div className="mb-6 grid grid-cols-2 gap-3">
                      <div className="flex items-center text-white/70">
                        <Calendar size={16} className="mr-2" />
                        <span>
                          {formatDate(jam.startDate)} -{" "}
                          {formatDate(jam.endDate)}
                        </span>
                      </div>

                      <div className="flex items-center text-white/70">
                        <MapPin size={16} className="mr-2" />
                        <span>{jam.location}</span>
                      </div>

                      <div className="flex items-center text-white/70">
                        <Users size={16} className="mr-2" />
                        <span>
                          {jam.participants}{" "}
                          {jam.maxParticipants && `/ ${jam.maxParticipants}`}{" "}
                          Participants
                        </span>
                      </div>

                      <div className="flex items-center text-white/70">
                        <Trophy size={16} className="mr-2" />
                        <span>{jam.prizes.length} Prizes</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img
                        src={jam.organizer.logo}
                        alt={jam.organizer.name}
                        className="mr-2 h-8 w-8 rounded-full object-contain"
                      />
                      <span className="text-sm text-white/70">
                        By {jam.organizer.name}
                      </span>
                    </div>

                    <button
                      onClick={() => handleJamDetails(jam)}
                      className="flex items-center rounded-md border border-white/20 bg-[#1A191F] px-4 py-2 transition-colors hover:bg-[#24222A]"
                    >
                      <span className="mr-2">View Details</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-4 rounded-full bg-white/5 p-5">
              <Calendar size={40} className="text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-medium">
              No {activeTab} game jams found
            </h3>
            <p className="max-w-md text-white/70">
              {activeTab === "active"
                ? "There are no active game jams at the moment. Check back soon or explore upcoming events!"
                : activeTab === "upcoming"
                  ? "There are no upcoming game jams scheduled yet. Check back later for new announcements!"
                  : "There are no past game jams in our records."}
            </p>
          </div>
        )}
      </div>

      {/* Details Modal */}
      {showModal && selectedJam && (
        <>
          <div
            className="fixed inset-0 z-50 bg-black/80"
            onClick={() => setShowModal(false)}
          />
          <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="pointer-events-auto max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-xl border border-white/10 bg-[#16141C]">
              <div className="relative">
                {/* Header Image */}
                <div className="relative h-64 w-full">
                  <img
                    src={selectedJam.image}
                    alt={selectedJam.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#16141C] to-transparent" />

                  {/* Close Button */}
                  <button
                    onClick={() => setShowModal(false)}
                    className="absolute top-4 right-4 rounded-full bg-black/50 p-2 transition-colors hover:bg-black/80"
                  >
                    <X />
                  </button>
                </div>

                {/* Content */}
                <div className="relative -mt-16 px-8 pb-10">
                  <div className="mb-6 flex items-center">
                    <img
                      src={selectedJam.organizer.logo}
                      alt={selectedJam.organizer.name}
                      className="mr-3 h-12 w-12 rounded-full border-2 border-[#16141C] object-contain"
                    />
                    <div>
                      <span className="text-sm text-white/70">
                        Organized by
                      </span>
                      <h3 className="font-medium">
                        {selectedJam.organizer.name}
                      </h3>
                    </div>
                  </div>

                  <h1 className="mb-4 text-3xl font-bold">
                    {selectedJam.title}
                  </h1>

                  {selectedJam.theme && (
                    <div className="mb-4">
                      <span className="text-white/70">Theme:</span>{" "}
                      <span className="text-primary font-medium">
                        {selectedJam.theme}
                      </span>
                    </div>
                  )}

                  <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="flex items-center text-white/70">
                      <Calendar size={20} className="text-primary mr-3" />
                      <div>
                        <div className="font-medium text-white">Date</div>
                        <div>
                          {formatDate(selectedJam.startDate)} -{" "}
                          {formatDate(selectedJam.endDate)}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center text-white/70">
                      <Clock size={20} className="text-primary mr-3" />
                      <div>
                        <div className="font-medium text-white">Duration</div>
                        <div>{getDuration()} Days</div>
                      </div>
                    </div>

                    <div className="flex items-center text-white/70">
                      <MapPin size={20} className="text-primary mr-3" />
                      <div>
                        <div className="font-medium text-white">Location</div>
                        <div>{selectedJam.location}</div>
                      </div>
                    </div>

                    <div className="flex items-center text-white/70">
                      <Users size={20} className="text-primary mr-3" />
                      <div>
                        <div className="font-medium text-white">
                          Participants
                        </div>
                        <div>
                          {selectedJam.participants}{" "}
                          {selectedJam.maxParticipants &&
                            `/ ${selectedJam.maxParticipants}`}{" "}
                          Registered
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h2 className="mb-4 text-xl font-bold">
                      About this Game Jam
                    </h2>
                    <p className="whitespace-pre-line text-white/80">
                      {selectedJam.description}
                    </p>
                  </div>

                  {/* Prizes */}
                  <div className="mb-8">
                    <h2 className="mb-4 text-xl font-bold">Prizes</h2>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {selectedJam.prizes.map((prize, index) => (
                        <div
                          key={index}
                          className="hover:border-primary/50 rounded-lg border border-white/10 bg-[#1A191F] p-4 transition-colors"
                        >
                          <div className="mb-3 flex items-center">
                            <Award size={18} className="text-primary mr-2" />
                            <h3 className="font-bold">{prize.position}</h3>
                          </div>
                          <p className="text-white/80">{prize.prize}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Rules or Guidelines */}
                  {/* //TODO make the rules dynamic on the fetched data */}
                  <div className="mb-8">
                    <h2 className="mb-4 text-xl font-bold">
                      Rules & Guidelines
                    </h2>
                    <div className="rounded-lg border border-white/10 bg-[#1A191F] p-5">
                      <ul className="space-y-5">
                        <li className="flex">
                          <div className="text-primary mr-3">•</div>
                          <div>
                            All games must be created during the jam period.
                            Planning before is allowed but no pre-made assets or
                            code.
                          </div>
                        </li>
                        <li className="flex">
                          <div className="text-primary mr-3">•</div>
                          <div>
                            Your game must incorporate the theme "
                            {selectedJam.theme || "TBA"}".
                          </div>
                        </li>
                        <li className="flex">
                          <div className="text-primary mr-3">•</div>
                          <div>
                            Teams of up to 4 people are allowed. Solo
                            development is also welcome.
                          </div>
                        </li>
                        <li className="flex">
                          <div className="text-primary mr-3">•</div>
                          <div>
                            You may use any engine, tools, or platforms to
                            create your game.
                          </div>
                        </li>
                        <li className="flex">
                          <div className="text-primary mr-3">•</div>
                          <div>
                            Submissions must include a playable build (WebGL
                            builds strongly preferred).
                          </div>
                        </li>
                        <li className="flex">
                          <div className="text-primary mr-3">•</div>
                          <div>
                            Third-party assets are allowed but must be properly
                            credited.
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Registration Status */}
                  {selectedJam.status === "active" && (
                    <div className="border-primary/20 mb-6 flex items-start rounded-lg border bg-[#1A191F] p-5">
                      <AlertCircle
                        size={20}
                        className="text-primary mt-0.5 mr-3"
                      />
                      <div>
                        <h3 className="mb-1 font-bold">
                          This Game Jam is now active!
                        </h3>
                        <p className="text-white/80">
                          Registration is still open. You can join, but the jam
                          has already started. You have until{" "}
                          {formatDate(selectedJam.endDate)} to submit your game.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-4 sm:flex-row">
                    {selectedJam.status === "past" ? (
                      <Link
                        to={`/jam/${selectedJam.id}/results`}
                        className="rounded-md bg-[#1A191F] px-6 py-3 text-center transition-colors hover:bg-[#24222A]"
                      >
                        View Results
                      </Link>
                    ) : (
                      <button className="bg-primary hover:bg-primary/90 rounded-md px-6 py-3 text-center font-bold text-black transition-colors">
                        {selectedJam.status === "active"
                          ? "Join Now"
                          : "Register"}
                      </button>
                    )}

                    <button
                      className="rounded-md bg-[#1A191F] px-6 py-3 text-center transition-colors hover:bg-[#24222A]"
                      onClick={() => {
                        const url = window.location.href + `/${selectedJam.id}`;
                        navigator.clipboard.writeText(url);
                        toast.success("Link copied to clipboard!");
                      }}
                    >
                      Share
                    </button>

                    {/* //TODO might be removed */}
                    {selectedJam.status !== "past" && (
                      <a
                        href="#"
                        className="rounded-md bg-[#1A191F] px-6 py-3 text-center transition-colors hover:bg-[#24222A]"
                      >
                        Add to Calendar
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Call to Action */}
      <div className="mt-16 rounded-xl bg-gradient-to-r from-teal-500/20 to-purple-500/20 p-8 text-center">
        <h2 className="mb-2 text-2xl font-bold">
          Want to host your own Game Jam?
        </h2>
        <p className="mx-auto mb-6 max-w-2xl text-white/80">
          If you're interested in organizing a game jam on AFKAT, we'd love to
          partner with you! Our platform provides all the tools you need to run
          a successful game jam.
        </p>
        <Link
          to="/jams/host"
          className="bg-primary hover:bg-primary/90 inline-flex items-center rounded-md px-6 py-3 font-bold text-black transition-colors"
          onClick={scrollToTop}
        >
          Apply to Host <ArrowRight size={16} className="ml-2" />
        </Link>
      </div>

      {/* Footer */}
      <div className="mt-10 rounded-t-full border-t border-white/10 py-5 text-center">
        <p className="text-sm text-white/60">
          © {new Date().getFullYear()} AFKAT. All rights reserved.
        </p>
        <p className="mt-2 text-xs text-white/40">
          Game jams, assets, and content on this platform are property of their
          respective owners.
        </p>
      </div>
    </div>
  );
};

export default GameJam;
