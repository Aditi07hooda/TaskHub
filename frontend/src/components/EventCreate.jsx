import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { format } from "date-fns";
import { useRecoilState, useSetRecoilState } from "recoil";
import { eventList } from "../state/Event";
import { eventCount } from "../state/Count";

export default function TaskCreate() {
  const [fromSelectedDate, setFromSelectedDate] = useState(null);
  const [endSelectedDate, setEndSelectedDate] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [events, setEvents] = useRecoilState(eventList);

  const setEventNo = useSetRecoilState(eventCount)
 

  const handleFromDateChange = (date) => {
    setFromSelectedDate(date);
  };
  const handleEndDateChange = (date) => {
    setEndSelectedDate(date);
  };

  const eventSubmission = async (e) => {
    e.preventDefault();
    try {
      const formattedFromDate = fromSelectedDate
        ? format(fromSelectedDate, "yyyy-MM-dd")
        : null;
      const formattedEndDate = endSelectedDate
        ? format(endSelectedDate, "yyyy-MM-dd")
        : null

      const response = await axios.post(
        "http://localhost:5001/event",
        {
          title: title,
          description: description,
          location: location,
          fromdate: formattedFromDate,
          enddate: formattedEndDate,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const updatedEventListResponse = await axios.get(
        "http://localhost:5001/event",
        {
          withCredentials: true,
        }
      );

      const updatedEventList = updatedEventListResponse.data || [];
      setEvents(updatedEventList);
      setEventNo(() => ({eventNo: updatedEventList.length}))
      
      setTitle("");
      setDescription("");
      setLocation("");
      setFromSelectedDate(null);
      setEndSelectedDate(null);
      toast.success("New Event added successfully!", {
        autoClose: 2000,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            Add a new Event
          </h2>
          <form action="#">
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="sm:col-span-2">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Event Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Type event name"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required=""
                />
              </div>

              <div className="flex space-x-28">
                <div className="relative max-w-sm">
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
                    selected={fromSelectedDate}
                    onChange={handleFromDateChange}
                    dateFormat="yyyy/MM/dd"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholderText="Select from date"
                  />
                </div>

                <div className="relative max-w-sm">
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
                    selected={endSelectedDate}
                    onChange={handleEndDateChange}
                    dateFormat="yyyy/MM/dd"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholderText="Select end date"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Event Location
                </label>
                <input
                  id="location"
                  type="text"
                  name="location"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Type event location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required=""
                />
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
              onClick={eventSubmission}
            >
              Add Event
            </button>
          </form>
        </div>
      </section>
      <ToastContainer />
    </div>
  );
}
