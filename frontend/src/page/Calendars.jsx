import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/sidebar";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../css/Calendar.css";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { isAuthenticatedUser } from "../state/Authentication";
import axios from "axios";

export default function Calendars() {
  const isAuthenticated = useRecoilValue(isAuthenticatedUser);
  const navigate = useNavigate();
  const [taskDate, setTaskDate] = useState([]);
  const [taskIndividualData, setTaskIndividualData] = useState(null);
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const calendarDate = async () => {
      const calendarsDate = await axios.get("http://localhost:5001/todos", {
        withCredentials: true,
      });
      setTaskDate(calendarsDate.data);
    };
    calendarDate();
  }, []);

  const handleShowData = async (taskId) => {
    const taskIndividualDetail = await axios.get(
      `http://localhost:5001/todos/${taskId}`,
      {
        withCredentials: true,
      }
    );
    console.log(taskIndividualDetail.data);
    setTaskIndividualData(taskIndividualDetail.data);
  };
  return (
    <>
      {isAuthenticated ? (
        <div className="dashboard d-flex bg-info-subtle ">
          {/* sidebar */}
          <div>
            <Sidebar className="sticky" />
          </div>

          {/* navbar and main content */}
          <div
            style={{
              flex: "1 1 auto",
              display: "flex",
              flexFlow: "column",
            }}
          >
            {/* navbar */}
            <Navbar className="navbar" />

            {/* main content */}
            <div className="main-content overflow-scroll">
              <div className="md:grid md:grid-flow-col">
                <Calendar className="shadow-md rounded-md md:col-span-1 m-2 md:h-[300px] md:m-[8%]" />
                <Calendar
                  className="shadow-md rounded-md m-2 md:w-[800px] md:col-span-2 lg:h-[600px] md:m-[2%]"
                  tileContent={({ date }) => {
                    const formattedDate = date.toISOString().split("T")[0];
                    const tasksForDate = taskDate.filter(
                      (task) => task.enddate.split("T")[0] === formattedDate
                    );
                    return tasksForDate.map((task) => (
                      <div
                        key={task.id}
                        className="text-bg-info"
                        onClick={() => handleShowData(task.id)}
                      >
                        {task.title}
                      </div>
                    ));
                  }}
                />
                <div className="bg-white shadow-md p-4 rounded-md m-10 md:col-span-1">
                  {taskIndividualData && (
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        {taskIndividualData[0].title}
                      </h3>
                      <p className="text-gray-700">
                        {taskIndividualData[0].description}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          id="alert-additional-content-2"
          className="p-4 mb-4 text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
          role="alert"
        >
          <div className="flex items-center">
            <svg
              className="flex-shrink-0 w-4 h-4 me-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <h3 className="text-lg font-medium">Login/Register First!!</h3>
          </div>
          <div className="mt-2 mb-4 text-sm">
            Please!! First login into your account or if you are a new
            user..Please Register!!
          </div>
          <div className="flex">
            <button
              type="button"
              className="text-white bg-red-800 hover:bg-red-900 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1.5 me-2 text-center inline-flex items-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            >
              <svg
                className="me-2 h-3 w-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 14"
              >
                <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
              </svg>
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
}
