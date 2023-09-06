import { useEffect, useState, Fragment } from "react";
import { API_ENDPOINT } from "../../config/constants";
import { Dialog, Transition } from "@headlessui/react";

interface MatchData {
  id: number;
  isRunning: boolean;
  name: string;
  location: string;
  startsAt: string;
  endsAt: string;
  score: Record<string, string>;
  teams: { id: number; name: string }[];
  sportName: string;
  playingTeam: number;
  story: string;
}

const MatchDetails: React.FC<{ id: number }> = ({ id }) => {
  const [matchData, setMatchData] = useState<MatchData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const MatchDetails = async () => {
    const authToken = localStorage.getItem("authToken");
    console.log("Clicked");
    try {
      const response = await fetch(`${API_ENDPOINT}/matches/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch match details");
      }

      const data = await response.json();
      setMatchData(data);
    } catch (error) {
      console.error("Error fetching match details", error);
    }
  };

  useEffect(() => {
    MatchDetails();
  }, [id]);

  return (
    <>
      <h1>
        {matchData && (
          <ul className="flex gap-4 text-md text-gray-900 justify-between mt-2">
            {Object.entries(matchData.score).map(([team, score]) => (
              <li key={team}>
                {team.split(" ")[0]}: {score}
              </li>
            ))}
            <button onClick={MatchDetails}>Reload</button>
          </ul>
        )}
      </h1>
      <div className="relative top-0 left-20">
        <button type="button" onClick={openModal} style={{ color: "blue" }}>
          More details
        </button>
      </div>
      <div className="p-4 m-2 absolute ">
        <Transition appear show={isModalOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-50 overflow-y-full backdrop-blur-sm"
            onClose={closeModal}
          >
            <div className="flex items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-9/12 transform overflow-hidden bg-purple-600  text-white p-6 text-left shadow-xl transition-all rounded-lg">
                  {matchData && (
                    <>
                      <button onClick={closeModal}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </button>
                      <div className="text-center font-bold ">
                        <Dialog.Title
                          as="h3"
                          className="text-2xl font-bold leading-6 p-4 m-1"
                        >
                          {matchData.name}
                        </Dialog.Title>
                      </div>
                      <p>
                        <span className="text-white font-bold pr-2">
                          {matchData.sportName}{" "}
                        </span>
                      </p>
                      <p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                          />
                        </svg>
                        {matchData.location}
                      </p>
                      <p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        {new Date(matchData.startsAt).toLocaleString("en-CA")}{" "}
                        <span>to </span>
                        {new Date(matchData.endsAt).toLocaleString("en-CA")}
                      </p>
                      <h4 className=" font-semibold mr-4 ">Scores:</h4>
                      <ul className="flex gap-4">
                        {Object.entries(matchData.score).map(
                          ([team, score]) => (
                            <li key={team}>
                              {team}: {score}
                            </li>
                          )
                        )}
                      </ul>
                      <div className="mt-4">{matchData.story}</div>
                      <div className="flex justify-center gap-2 mt-4"></div>
                    </>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      </div>
    </>
  );
};

export default MatchDetails;
