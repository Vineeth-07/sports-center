import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import image from "../assets/images/image.png";

const Home = () => {
  const user = localStorage.getItem("authToken");

  return (
    <>
      <div className="static min-h-screen flex-row justify-center">
        <header className="bg-purple-300 h-28">
          <div className="grotesk mb-12 flex items-center justify-between py-4 px-4 sm:mx-0 sm:mb-20 sm:px-0 md:px-6">
            <div className="mt-4 inline-block pb-4 pl-8">
              <img src={logo} className="w-16 h-16" alt="Logo" />
            </div>
          </div>
        </header>
        <main>
          <div className="flex justify-evenly">
            <div className="rounded-lg overflow-hidden w-8/12">
              <img
                src={image}
                className="w-14/12 h-5/12 mix-blend-multiply"
                alt="Image"
              />
            </div>
            <div>
              <h2 className="text-[3em] font-bold text-black mb-4">
                SportsBuzz
              </h2>
              <div className=" text-xl font-bold ">
                <p>All sports news at one place</p>
              </div>
              <div>
                <p className="font-bold">
                  Welcome to SportsBuzz, where passion meets play!
                </p>
              </div>
              <br />
              <div className="flex justfiy-center space-x-4">
                {user ? (
                  <Link
                    to={"/dashboard"}
                    className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded"
                  >
                    Go to Dashboard
                  </Link>
                ) : (
                  <>
                    <Link
                      to={"/users/sign_in"}
                      className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded"
                    >
                      Sign In
                    </Link>
                    <Link
                      to={"/dashboard"}
                      className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded"
                    >
                      Continue without Sign In
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;
