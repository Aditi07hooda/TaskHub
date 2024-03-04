import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/Dashboard.css";
import { isAuthenticatedUser } from "../state/Authentication";
import Navbar from "../components/Navbar";
import Sidebar from "../components/sidebar";
import Piechart from "../components/Piechart";
import Barchart from "../components/Barchart";
import TaskTable from "../components/TasksTables.jsx";
import EventTable from "../components/EventsTables.jsx";
import { CDBCard, CDBCardBody, CDBContainer } from "cdbreact";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { taskList } from "../state/Task.jsx";
import { eventList } from "../state/Event.jsx";

export default function Dashboard() {
  const isAuthenticated = useRecoilValue(isAuthenticatedUser);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  const [tasks, setTasks] = useRecoilState(taskList);
  const [events, setEvents] = useRecoilState(eventList);

  const handleDeleteTask = async (taskId) => {
    await axios.delete(`http://localhost:5001/todos/${taskId}`, {
      withCredentials: true,
    });
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const handleDeleteEvent = async (eventId) => {
    await axios.delete(`http://localhost:5001/event/${eventId}`, {
      withCredentials: true,
    });
    setEvents((prevEvent) => prevEvent.filter((event) => event.id !== eventId));
  };

  return (
    <div>
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
            <div className="main-content">
              {/* chart */}
              <div className="pie-bar grid grid-cols-2 m-5 gap-16">
                <Piechart />
                <Barchart />
              </div>

              {/* card */}
              <CDBContainer className="cdb-card-container grid grid-cols-2 grid-flow-row px-5 gap-5">
                <CDBCard
                  className="cdb-card"
                  style={{
                    width: "25rem",
                    borderColor: "black",
                    borderRadius: "0.375rem",
                  }}
                >
                  <CDBCardBody className="cdb-card-body">
                    <CDBCard
                      style={{ paddingLeft: "1.5rem", paddingTop: "0.5rem" }}
                    >
                      <b style={{ fontSize: "1.5rem" }}>5</b>
                      <p style={{ color: "gray" }}>
                        <b>Pending Task</b>
                      </p>
                    </CDBCard>
                  </CDBCardBody>
                </CDBCard>
                <CDBCard
                  className="cdb-card"
                  style={{
                    width: "25rem",
                    borderColor: "black",
                    borderRadius: "0.375rem",
                  }}
                >
                  <CDBCardBody className="cdb-card-body">
                    <CDBCard
                      style={{ paddingLeft: "1.5rem", paddingTop: "0.5rem" }}
                    >
                      <b style={{ fontSize: "1.5rem" }}>2</b>
                      <p style={{ color: "gray" }}>
                        <b>In Progress</b>
                      </p>
                    </CDBCard>
                  </CDBCardBody>
                </CDBCard>
                <CDBCard
                  className="cdb-card"
                  style={{
                    width: "25rem",
                    borderColor: "black",
                    borderRadius: "0.375rem",
                  }}
                >
                  <CDBCardBody className="cdb-card-body">
                    <CDBCard
                      style={{ paddingLeft: "1.5rem", paddingTop: "0.5rem" }}
                    >
                      <b style={{ fontSize: "1.5rem" }}>10</b>
                      <p style={{ color: "gray" }}>
                        <b>Total Task</b>
                      </p>
                    </CDBCard>
                  </CDBCardBody>
                </CDBCard>
              </CDBContainer>

              {/* table */}
              <div>
                <TaskTable
                  tasks={tasks}
                  onDelete={handleDeleteTask}
                  className="mx-8"
                />
              </div>
              <div>
                <EventTable
                  events={events}
                  onDelete={handleDeleteEvent}
                  className="mx-8"
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}
