import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/sidebar";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { isAuthenticatedUser } from "../state/Authentication";
import "../css/Table.css";
import { taskList } from "../state/Task.jsx";
import { format } from "date-fns";
import TaskUpdate from "../components/TaskUpdate.jsx";
import TaskCreate from "../components/TaskCreate.jsx";
import { taskCount } from "../state/Count.jsx";
import { ToastContainer, toast } from "react-toastify";
import { useRecoilState } from "recoil";
import { FiFilter } from "react-icons/fi";
import axios from "axios";

export default function Task() {
  const isAuthenticated = useRecoilValue(isAuthenticatedUser);
  const navigate = useNavigate();
  const [tasks, setTasks] = useRecoilState(taskList);
  const [taskNo, setTaskNo] = useRecoilState(taskCount);
  const [showTaskUpdate, setShowTaskUpdate] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [checkedTasks, setCheckedTasks] = useState({});
  const [isTaskFormVisible, setTaskFormVisibility] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage, setTasksPerPage] = useState(10);
  const [totalTasks, setTotalTasks] = useState(tasks.length);
  const [filterTaskStatus, setFilterTaskStatus] = useState("all");
  const [isAddDropdown, setIsAddDropdown] = useState(false);

  const handleIsAddDropdown = () => {
    setIsAddDropdown((prev) => !prev);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filterTaskStatus === "all") {
      return true;
    } else if (filterTaskStatus === "completed") {
      return checkedTasks[task.id] === "completed";
    } else if (filterTaskStatus === "pending") {
      return checkedTasks[task.id] !== "completed";
    }
  });

  const handleDeleteTask = async (taskId) => {
    await axios.delete(`http://localhost:5001/todos/${taskId}`, {
      withCredentials: true,
    });
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    setTaskNo((prevTask) => ({ taskNo: prevTask.taskNo - 1 }));
  };

  const handleUpdateClick = (eventId) => {
    setSelectedTaskId(eventId);
    setShowTaskUpdate(true);
  };

  const handleToggleTaskForm = () => {
    setShowTaskUpdate(false);
    setSelectedTaskId(null);
  };

  const handleToggleTaskForms = () => {
    setTaskFormVisibility((prev) => !prev);
  };

  useEffect(() => {
    const fetchTaskStatuses = async () => {
      try {
        const taskStatuses = await Promise.all(
          tasks.map(async (task) => {
            const taskId = task.id; // Destructure taskId from task object
            const response = await axios.get(
              `http://localhost:5001/todos/${taskId}`,
              {
                withCredentials: true,
              }
            );
            // console.log(response.data[0].status);
            return { [taskId]: response.data[0].status };
          })
        );
        const initialStatuses = Object.assign({}, ...taskStatuses);
        // console.log(initialStatuses)
        setCheckedTasks(initialStatuses);
      } catch (error) {
        console.error("Error fetching task statuses:", error);
      }
    };

    fetchTaskStatuses();
  }, [tasks]);

  const handleCheckboxTaskChange = async (taskId) => {
    try {
      const currentStatus = checkedTasks[taskId]; // Get the current status
      if (currentStatus == "completed") {
        const confirmation = confirm(
          "Are you sure you want to change status to pending"
        );
        if (!confirmation) {
          return toast.info("Okk");
        } else {
          const newStatus =
            currentStatus === "pending" ? "completed" : "pending"; // Toggle between "pending" and "completed"

          // Update task status in the database
          await axios.put(
            `http://localhost:5001/todos/individual/${taskId}`,
            { status: newStatus },
            {
              headers: {
                "Content-Type": "application/json",
              },
              withCredentials: true,
            }
          );

          // Update local state after successful update
          setCheckedTasks((prevCheckedTasks) => ({
            ...prevCheckedTasks,
            [taskId]: newStatus,
          }));
          toast.success("Task updated successfully!", {
            autoClose: 2000,
          });
        }
      } else {
        const newStatus = currentStatus === "pending" ? "completed" : "pending"; // Toggle between "pending" and "completed"

        // Update task status in the database
        await axios.put(
          `http://localhost:5001/todos/individual/${taskId}`,
          { status: newStatus },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        // Update local state after successful update
        setCheckedTasks((prevCheckedTasks) => ({
          ...prevCheckedTasks,
          [taskId]: newStatus,
        }));
        toast.success("Task updated successfully!", {
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

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
            <div className="flex justify-end mr-16 mt-3"> 
              <FiFilter className="text-3xl" onClick={handleIsAddDropdown}/>
              {isAddDropdown && (
              <div className="absolute right-20 mt-5 bg-white divide-y divide-gray-100 rounded-lg shadow w-auto">
                <div className="py-2">
                  <button
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                    onClick={() => setFilterTaskStatus("all")}
                  >
                    All
                  </button>
                </div>
                <div className="py-2">
                  <button
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                    onClick={() => setFilterTaskStatus("completed")}
                  >
                    Completed
                  </button>
                </div>
                <div className="py-2">
                  <button
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                    onClick={() => setFilterTaskStatus("pending")}
                  >
                    Pending
                  </button>
                </div>
              </div>
            )}
            </div>
            <div className="task-manager-table-container flex flex-col items-end">
              <table className="task-manager-table">
                <thead>
                  <tr>
                    <th>Task Name</th>
                    <th>Task Description</th>
                    <th>Deadline</th>
                    <th>Status</th>
                    <th>Update</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {currentTasks.map((task) => (
                    <tr key={task.id}>
                      <td>{task.title}</td>
                      <td>{task.description}</td>
                      <td>{format(new Date(task.enddate), "yyyy-MM-dd")}</td>
                      <td>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={
                              checkedTasks[task.id] === "completed"
                                ? "completed"
                                : ""
                            }
                            onChange={() => handleCheckboxTaskChange(task.id)}
                          />
                          <span className="ml-2">{checkedTasks[task.id]}</span>
                        </label>
                      </td>
                      <td>
                        <button onClick={() => handleUpdateClick(task.id)}>
                          Update
                        </button>

                        {showTaskUpdate && selectedTaskId === task.id && (
                          <div
                            className="fixed top-0 left-0 w-full h-full flex items-center justify-center flex-col"
                            style={{ backdropFilter: "blur(15px)" }}
                          >
                            <div>
                              <TaskUpdate taskid={selectedTaskId} />
                              <button
                                type="submit"
                                className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
                                onClick={handleToggleTaskForm}
                              >
                                Close
                              </button>
                            </div>
                          </div>
                        )}
                      </td>
                      <td>
                        <button onClick={() => onDelete(task.id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div class="pagination mt-2 gap-2">
                <button
                  class={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
                    currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={currentPage === 1}
                  onClick={() => paginate(currentPage - 1)}
                >
                  Previous
                </button>
                {/* {Array(Math.ceil(totalTasks / tasksPerPage))
                .fill(0)
                .map((_, index) => (
                  <button
                    key={index}
                    class={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
                      currentPage === index + 1 ? "bg-blue-700" : ""
                    }`}
                    onClick={() => paginate(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))} */}
                <button
                  class={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
                    currentPage === Math.ceil(totalTasks / tasksPerPage)
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  disabled={
                    currentPage === Math.ceil(totalTasks / tasksPerPage)
                  }
                  onClick={() => paginate(currentPage + 1)}
                >
                  Next
                </button>
              </div>
              <ToastContainer />
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
