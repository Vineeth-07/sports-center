import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { API_ENDPOINT } from "../../config/constants";

type Inputs = {
  current_password: string;
  new_password: string;
};

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const userData = localStorage.getItem("userData");
  let user, name;
  if (userData) {
    user = JSON.parse(userData);
    name = user.name;
  }

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { current_password, new_password } = data;
    const authToken = localStorage.getItem("authToken");
    try {
      const response = await fetch(`${API_ENDPOINT}/user/password`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ current_password, new_password }),
      });
      const userData = await response.json();
      console.log(userData);
      if (!response.ok) {
        alert("You have entered wrong password");
        throw new Error("Operation failed");
      }
      alert("Password updated successfully ");
    } catch (error) {
      console.error("Sign-in failed:", error);
    }
  };
  return (
    <div
      style={{ height: "400px", width: "600px" }}
      className="mx-auto bg-gray-300 border-2 rounded"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h1 className="mb-2 text-[2em] font-bold tracking-tight text-gray-900 dark:text-white">
            Welcome {name}
          </h1>
          <br />
          <Link
            to="/dashboard"
            className="w-full bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-gray mt-4"
          >
            Home
          </Link>
          <br />
          <br />
          <label
            htmlFor="current_password"
            className="block text-gray-700 font-semibold mb-2"
          >
            Old Password:
          </label>
          <input
            type="password"
            id="current_password"
            autoFocus
            {...register("current_password", { required: true })}
            className={`w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue${
              errors.current_password ? "border-red-500" : " "
            }`}
          />
          {errors.current_password && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>
        <div>
          <label
            htmlFor="new_password"
            className="block text-gray-700 font-semibold mb-2"
          >
            New Password:
          </label>
          <input
            type="password"
            id="new_password"
            autoFocus
            {...register("new_password", { required: true })}
            className={`w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
              errors.new_password ? "border-red-500" : " "
            }`}
          />
          {errors.new_password && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-gray mt-4"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
