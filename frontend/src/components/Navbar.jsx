import React, { useState, useEffect } from "react";
import { Header } from "../css/Navbar.style";
import { CDBNavbar, CDBInput } from "cdbreact";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { isAuthenticatedUser } from "../state/Authentication";
import { useRecoilState } from "recoil";

const Navbar = () => {
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] =
    useRecoilState(isAuthenticatedUser);
  const navigate = useNavigate();

  const handleDropdownToggle = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleSignOut = async () => {
    try {
      await axios.get("http://localhost:5001/signout",{
        withCredentials: true,
      });
      setIsAuthenticated(false);
      setname(" ");
      setEmail(" ");
      navigate("/");
    } catch (error) {
      setIsAuthenticated(true);
    }
  };

  useEffect(() => {
    const gettingProfile = async () => {
      const { data } = await axios.get("http://localhost:5001/me", {
        withCredentials: true,
      });
      setname(data.name);
      setEmail(data.email);
    };
    gettingProfile();
  }, []);

  return (
    <Header
      style={{ background: "rgb(17, 24, 39)", color: "#fff", width: "100%" }}
    >
      <CDBNavbar dark expand="md" scrolling className="justify-content-between">
        <CDBInput
          type="search"
          size="md"
          hint="Search"
          className="mb-n4 mt-n3 input-nav"
        />
        <div className="relative mr-20">
          <button
            id="dropdownUserAvatarButton"
            className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            onClick={handleDropdownToggle}
          >
            <span className="sr-only text-white text-2xl">{name}</span>
            <img
              className="w-8 h-8 rounded-full"
              src="public/img/pane4.png"
              alt="user photo"
            />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
              <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                <div>{name}</div>
                <div className="font-medium truncate">{email}</div>
              </div>
              <div className="py-2">
                <button
                  onClick={handleSignOut}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </CDBNavbar>
    </Header>
  );
};

export default Navbar;
