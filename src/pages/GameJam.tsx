import {
  AlertCircle,
  ArrowRight,
  Award,
  Calendar,
  Clock,
  Users,
  Trophy,
  MapPin,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { IJam } from "../interfaces";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { loadJams, participateInJam } from "../redux/modules/gameJams";

import moment from "moment";

const GameJam = () => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.loading);
  const { Jams } = useAppSelector((state) => state.gameJams);

  const [activeTab, setActiveTab] = useState<"active" | "upcoming" | "past">(
    "active",
  );
  const [selectedJam, setSelectedJam] = useState<IJam | null>(null);
  const [showModal, setShowModal] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getDuration = () => {
    const startDate = selectedJam?.start_date;
    const endDate = selectedJam?.end_date;

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

    return moment(jamEndDate).fromNow();
  };

  const selectJam = (jam: IJam) => {
    setSelectedJam(jam);
    setShowModal(true);
  };

  const scrollToTop = () => {
    const main = document.getElementById("main-elem");

    if (main) {
      main.scrollTop = 0;
    }
  };

  const participateJam = () => {
    dispatch(participateInJam(selectedJam?.id));
  };

  useEffect(() => {
    dispatch(loadJams(activeTab));
  }, [activeTab, dispatch]);

  return (
    <main className="w-full overflow-y-auto px-20 pt-10">
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
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="border-primary h-12 w-12 animate-spin rounded-full border-t-2 border-b-2" />
          </div>
        ) : Jams.length > 0 ? (
          Jams.map((jam) => (
            <div
              key={jam.id}
              className="group transform overflow-hidden rounded-xl border border-white/10 bg-[#16141C] transition-all duration-300 hover:translate-y-[-4px] hover:border-black/10 hover:shadow-lg hover:shadow-black/50"
            >
              <div className="flex flex-col md:flex-row">
                {/* Image */}
                {/* <div className="h-64 overflow-hidden md:h-auto md:w-1/3">
                  <img
                    src={jam.image}
                    alt={jam.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div> */}

                {/* Content */}
                <div className="bg-neutral/5 flex flex-1 flex-col justify-between p-6">
                  <div className="mb-4">
                    <div className="mb-2 flex items-center justify-between">
                      <h2 className="group-hover:text-primary text-2xl font-bold transition-colors">
                        {jam.title}
                      </h2>

                      <span className="bg-primary/20 text-primary rounded-full border px-3 py-1 text-sm font-medium">
                        {activeTab === "active"
                          ? "Ends"
                          : activeTab === "upcoming"
                            ? "Starts"
                            : ""}{" "}
                        {calculateTimeLeft(jam.end_date)}
                      </span>
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
                          {formatDate(jam.start_date)} -{" "}
                          {formatDate(jam.end_date)}
                        </span>
                      </div>

                      {/* <div className="flex items-center text-white/70">
                        <MapPin size={16} className="mr-2" />
                        <span>{jam.location}</span>
                      </div> */}

                      <div className="flex items-center text-white/70">
                        <Trophy size={16} className="mr-2" />
                        <span>{jam.prizes.length} Prizes</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-sm text-white/70">
                        By {jam.created_by}
                      </span>
                    </div>

                    <button
                      onClick={() => selectJam(jam)}
                      className="bg-neutral-content/5 flex items-center rounded-md border border-white/20 px-4 py-2 transition-colors hover:bg-[#24222A]"
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
            className="fixed inset-0 z-50 bg-black/75"
            onClick={() => setShowModal(false)}
          />
          <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="no-scrollbar pointer-events-auto max-h-[80vh] w-full max-w-4xl overflow-y-auto rounded-xl border border-white/10 bg-[#16141C]">
              <div className="relative">
                {/* Header Image */}
                <div className="relative h-64 w-full rounded-tl-xl">
                  <img
                    src={selectedJam.game_jam_thumbnail}
                    alt={selectedJam.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#16141C] to-transparent" />

                  {/* Close Button */}
                  <button
                    onClick={() => setShowModal(false)}
                    className="bg-error/20 hover:bg-error/50 absolute top-4 right-4 rounded-full p-2 transition-colors"
                  >
                    <X />
                  </button>
                </div>

                {/* Content */}
                <div className="relative -mt-16 px-8 pb-10">
                  <div className="mb-8 flex items-center">
                    {/* <img
                      src={selectedJam.organizer.logo}
                      alt={selectedJam.organizer.name}
                      className="mr-3 h-12 w-12 rounded-full border-2 border-[#16141C] object-contain"
                    /> */}

                    <div>
                      <span className="text-sm text-white/70">
                        Organized by
                      </span>
                      <h3 className="font-medium">{selectedJam.created_by}</h3>
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
                          {formatDate(selectedJam.start_date)} -{" "}
                          {formatDate(selectedJam.end_date)}
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

                    {/* <div className="flex items-center text-white/70">
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
                    </div> */}
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
                      {Jams.map((jam, index) => (
                        <div
                          key={index}
                          className="hover:border-primary/50 rounded-lg border border-white/10 bg-[#1A191F] p-4 transition-colors"
                        >
                          <div className="flex items-center">
                            <Award size={18} className="text-primary mr-2" />
                            <h3 className="font-bold">{jam.prizes}</h3>
                          </div>
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
                  {activeTab === "active" && (
                    <div className="border-primary/20 mb-6 flex items-start rounded-lg border bg-[#1A191F] p-5">
                      <AlertCircle size={20} className="text-primary mr-3" />
                      <div>
                        <h3 className="mb-1 font-bold">
                          This Game Jam is now active!
                        </h3>
                        <p className="text-white/80">
                          Registration is still open. You can join, but the jam
                          has already started. You have until{" "}
                          {formatDate(selectedJam.end_date)} to submit your
                          game.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-4 sm:flex-row">
                    {!selectedJam.is_active ? (
                      <Link
                        to={`/jam/${selectedJam.id}/results`}
                        className="rounded-md bg-[#1A191F] px-6 py-3 text-center transition-colors hover:bg-[#24222A]"
                      >
                        View Results
                      </Link>
                    ) : (
                      <button
                        className="bg-primary text-primary-content rounded-md px-6 py-3 text-center font-bold transition-opacity hover:opacity-85"
                        onClick={participateJam}
                      >
                        {selectedJam.is_active ? "Join Now" : "Register"}
                      </button>
                    )}

                    <button
                      className="rounded-md bg-[#201f26] px-6 py-3 text-center transition-colors hover:bg-[#24222A]"
                      onClick={() => {
                        const url = window.location.href + `/${selectedJam.id}`;
                        navigator.clipboard.writeText(url);
                        toast.success("Link copied to clipboard!");
                      }}
                    >
                      Share
                    </button>

                    {/* //TODO might be removed */}
                    {selectedJam.is_active && (
                      <a
                        href="#"
                        className="rounded-md bg-[#201f26] px-6 py-3 text-center transition-colors hover:bg-[#24222A]"
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
      <div className="mt-10 rounded-t-full border-t border-white/10 py-8 text-center">
        <p className="text-sm text-white/60">
          © {new Date().getFullYear()} AFKAT. All rights reserved.
        </p>
        <p className="mt-2 text-xs text-white/40">
          Game jams, assets, and content on this platform are property of their
          respective owners.
        </p>
      </div>
    </main>
  );
};

export default GameJam;
