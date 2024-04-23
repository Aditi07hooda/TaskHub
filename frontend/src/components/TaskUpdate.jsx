import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { format } from "date-fns";
import { useRecoilState } from "recoil";
import { taskList } from "../state/Task.jsx";
import Loading from "./Loading.jsx";

export default function EventUpdate({ taskid }) {
  const [task, setTask] = useState(null);
  const [tasks, setTasks] = useRecoilState(taskList);
  const [selectedDate, setSelectedDate] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const taskId = taskid;
        const response = await axios.get(
          `http://localhost:5001/todos/${taskId}`,
          {
            withCredentials: true,
          }
        );
        setTask(response.data);
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    };

    fetchEvent();
  }, [taskid]);

  useEffect(() => {
    if (task) {
      setTitle(task[0].title || "");
      setDescription(task[0].description || "");
      setStatus(task[0].status || "");
      setSelectedDate(task[0].enddate ? new Date(task[0].enddate) : null);
    }
  }, [task]);

  const handleFromDateChange = (date) => {
    setSelectedDate(date);
  };

  const taskSubmission = async (e) => {
    e.preventDefault();
    try {
      const formattedDate = selectedDate
        ? format(selectedDate, "yyyy-MM-dd")
        : null;
      const taskId = taskid;
      const response = await axios.put(
        `http://localhost:5001/todos/${taskId}`,
        {
          title: title,
          description: description,
          enddate: formattedDate,
          status: status,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const updatedEventListResponse = await axios.get(
        "http://localhost:5001/todos",
        {
          withCredentials: true,
        }
      );

      const updatedEventList = updatedEventListResponse.data || [];
      setTasks(updatedEventList);

      setTitle("");
      setDescription("");
      setStatus("");
      setSelectedDate(null);
      toast.success("Event updated successfully!", {
        autoClose: 2000,
      });
    } catch (error) {
      console.error(error);
      toast.error("Error updating task", {
        autoClose: 2000,
      });
    }
  };

  return (
    <>
      {task ? (
        <div>
          <section className="bg-white dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
              <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                Update Task
              </h2>
              <form action="PUT">
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Task Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Type task name"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required=""
                    />
                  </div>

                  <div className="flex space-x-4">
                    <div className="relative">
                      <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                        <svg
                          className="w-4 h-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                        </svg>
                      </div>
                      <DatePicker
                        selected={selectedDate}
                        onChange={handleFromDateChange}
                        dateFormat="yyyy/MM/dd"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 flex-1"
                        placeholderText="Select from date"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="description"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Description
                    </label>
                    <textarea
                      id="description"
                      rows="8"
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Event description here"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
                  onClick={taskSubmission}
                >
                  Update Task
                </button>
              </form>
            </div>
          </section>
          <ToastContainer />
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
