import { useEffect, useState, Fragment } from "react";
import { API_ENDPOINT } from "../../config/constants";
import { Dialog, Transition } from "@headlessui/react";

interface ArticleData {
  id: number;
  title: string;
  thumbnail: string;
  sport: {
    id: number;
    name: string;
  };
  date: string;
  summary: string;
  content: string;
}

const ArticleDetails: React.FC<{ id: number }> = ({ id }) => {
  const [ArticleData, setMatchData] = useState<ArticleData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const ArticleDetails = async () => {
    const authToken = localStorage.getItem("authToken");
    console.log("Clicked");
    try {
      const response = await fetch(`${API_ENDPOINT}/articles/${id}`, {
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
    ArticleDetails();
    console.log(ArticleDetails);
  }, [id]);

  return (
    <>
      <div className="relative top-0 left-20">
        <button type="button" onClick={openModal} style={{ color: "blue" }}>
          Read more
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
                  {ArticleData && (
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
                          {ArticleData.title}
                        </Dialog.Title>
                      </div>
                      <p>
                        <span className="text-white font-bold pr-2">
                          {ArticleData.sport.name}{" "}
                        </span>
                      </p>
                      <img
                        className="h-40 w-40 static border-4 rounded-xl border-gray-300 object-cover"
                        src={ArticleData.thumbnail}
                      />{" "}
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
                            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                          />
                        </svg>
                        {ArticleData.date.slice(0, 10)}
                      </p>
                      <div className="mt-4">{ArticleData.content}</div>
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

export default ArticleDetails;
