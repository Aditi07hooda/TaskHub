import React, { useState } from "react";
import axios from "axios";
import { isAuthenticatedUser } from "../state/Authentication";
import { useRecoilState } from "recoil";
import { Navigate } from "react-router-dom";
import Loading from "../components/Loading";

export const Signup = () => {
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] =
    useRecoilState(isAuthenticatedUser);
  const [isLoading, setIsLoading] = useState(false);

  const loginSubmission = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post(
        "http://localhost:5001/signup",
        {
          name: name,
          email: email,
          password: password,
          confirmpassword: confirmpassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setIsAuthenticated(true);
      setname(" ");
      setEmail(" ");
      setPassword(" ");
      setconfirmpassword(" ");
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsAuthenticated(false);
      setIsLoading(false);
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return isLoading ? (
    <Loading />
  ) : (
    <div className="bg-black">
      <section className="bg-gray-900 w-screen h-screen">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-white"
          >
            <img
              className="w-8 h-8 mr-2"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
              alt="logo"
            />
            TaskHub
          </a>
          <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
                Create and account
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className=" border sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white "
                    placeholder="name@company.com"
                    onChange={(e) => setname(e.target.value)}
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className=" border sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
                    placeholder="name@company.com"
                    onChange={(e) => setEmail(e.target.value)}
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className=" border sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirm-password"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Confirm password
                  </label>
                  <input
                    type="password"
                    id="confirmpassword"
                    name="confirmpassword"
                    onChange={(e) => setconfirmpassword(e.target.value)}
                    placeholder="••••••••"
                    className=" border sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
                    required=""
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  onClick={loginSubmission}
                  value="Login"
                >
                  Create an account
                </button>
                <p className="text-sm font-light text-gray-400">
                  Already have an account?{" "}
                  <a
                    href="#"
                    className="font-medium text-blue-600 hover:underline"
                  >
                    Login here
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
