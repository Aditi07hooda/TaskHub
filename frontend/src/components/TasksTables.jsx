// TaskTable.js

import React, { useState, useEffect } from "react";
import "../css/Table.css";
import { format } from "date-fns";
import TaskUpdate from "./TaskUpdate.jsx";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const Table = ({ tasks, onDelete, onUpdate }) => {
  const [showTaskUpdate, setShowTaskUpdate] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [checkedTasks, setCheckedTasks] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage, setTasksPerPage] = useState(5);
  const [totalTasks, setTotalTasks] = useState(tasks.length);

  useEffect(() => {
    const fetchTaskStatuses = async () => {
      try {
        const taskStatuses = await Promise.all(
          tasks.map(async (task) => {
            const taskId = task.id;
            const response = await axios.get(
              `http://localhost:5001/todos/${taskId}`,
              {
                withCredentials: true,
              }
            );
            return { [taskId]: response.data[0].status };
          })
        );
        const initialStatuses = Object.assign({}, ...taskStatuses);
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

  const handleUpdateClick = (eventId) => {
    setSelectedTaskId(eventId);
    setShowTaskUpdate(true);
  };

  const handleToggleTaskForm = () => {
    setShowTaskUpdate(false);
    setSelectedTaskId(null);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  return (
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
                      checkedTasks[task.id] === "completed" ? "completed" : ""
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
                <button onClick={() => onDelete(task.id)}>Delete</button>
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
          disabled={currentPage === Math.ceil(totalTasks / tasksPerPage)}
          onClick={() => paginate(currentPage + 1)}
        >
          Next
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Table;
