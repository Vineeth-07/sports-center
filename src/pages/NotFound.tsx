import { Link } from "react-router-dom";
import error from "../assets/images/error.png";

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center mt-16">
      <div className="mt-4">
        <Link to="/dashboard">
          <div className="mt-8">
            <button
              id="backToHomeButton"
              type="submit"
              className="bg-green-600 hover:bg-green-800 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-green"
            >
              Home
            </button>
          </div>
        </Link>
      </div>
      <img src={error} />
    </div>
  );
}
