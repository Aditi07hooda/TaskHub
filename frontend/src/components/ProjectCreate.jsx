import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { format } from "date-fns";
import { useRecoilState, useSetRecoilState } from "recoil";
import { projectListDetailedView } from "../state/Project.jsx";
import { projectCount } from "../state/Count.jsx";

export default function TaskCreate() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [name, setName] = useState("");
  const [teamLeaderName, setTeamLeaderName] = useState("");
  const [teamMembers, setTeamMembers] = useState([{ name: "" }]);
  const [memberTasks, setMemberTasks] = useState([
    { title: "", description: "", due_date: "" },
  ]);
  const setProjectView = useSetRecoilState(projectListDetailedView)
  const setProjectNo = useSetRecoilState(projectCount)

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTeamMemberChange = (index, value) => {
    const updatedTeamMembers = [...teamMembers];
    updatedTeamMembers[index] = { name: value };
    setTeamMembers(updatedTeamMembers);
  };

  const handleMemberTaskChange = (index, field, value) => {
    const updatedMemberTasks = [...memberTasks];
    updatedMemberTasks[index][field] = value;
    setMemberTasks(updatedMemberTasks);
  };

  const addMemberTask = () => {
    setMemberTasks([
      ...memberTasks,
      { title: "", description: "", due_date: "" },
    ]);
  };
  const addMember = () => {
    setTeamMembers([...teamMembers, { name: "" }]);
  };

  const removeMemberTask = (index) => {
    const updatedMemberTasks = [...memberTasks];
    updatedMemberTasks.splice(index, 1);
    setMemberTasks(updatedMemberTasks);
  };
  const removeMember = (index) => {
    const updatedMember = [...teamMembers];
    updatedMember.splice(index, 1);
    setTeamMembers(updatedMember);
  };

  const taskSubmission = async (e) => {
    e.preventDefault();
    try {
      const formattedDate = selectedDate
        ? format(selectedDate, "yyyy-MM-dd")
        : null;

      const response = await axios.post(
        "http://localhost:5001/Project",
        {
          name: name,
          due_date: formattedDate,
          team_leader: teamLeaderName,
          team_members: teamMembers,
          tasks: memberTasks,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const updatedProjectListResponse = await axios.get(
        "http://localhost:5001/ProjectDetailedView",
        {
          withCredentials: true,
        }
      );
      setProjectView(updatedProjectListResponse.data)
      setProjectNo(() => ({projectNo: updatedProjectListResponse.data.length}))

      setName("");
      setTeamLeaderName("");
      setSelectedDate(null);
      setTeamMembers([]);
      setMemberTasks([{ title: "", description: "", due_date: "" }]);
      toast.success("New Project added successfully!", {
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
            Add a new Project
          </h2>
          <form action="#">
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="sm:col-span-2">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Project Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Type task name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required=""
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
                  selected={selectedDate}
                  onChange={handleDateChange}
                  dateFormat="yyyy/MM/dd"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholderText="Select date"
                />
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="teamLeaderName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Team Leader Name
                </label>
                <input
                  id="teamLeaderName"
                  type="text"
                  name="teamLeaderName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Type team leader name"
                  value={teamLeaderName}
                  onChange={(e) => setTeamLeaderName(e.target.value)}
                  required=""
                />
              </div>

              {/* New fields for team members and their tasks */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="teamMembers"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Team Members
                </label>
                {teamMembers.map((member, index) => (
                  <div className="flex space-x-3">
                    <input
                      key={index}
                      type="text"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 mb-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder={`Team Member ${index + 1}`}
                      value={member.name}
                      onChange={(e) =>
                        handleTeamMemberChange(index, e.target.value)
                      }
                    />
                    <button
                      type="button"
                      onClick={() => removeMember(index)}
                      className="text-red-500"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addMember}
                  className="text-blue-500 underline"
                >
                  Add Member
                </button>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="memberTasks"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Member Tasks
                </label>
                {memberTasks.map((task, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <input
                      type="text"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 mb-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder={`Task ${index + 1} Title`}
                      value={task.title}
                      onChange={(e) =>
                        handleMemberTaskChange(index, "title", e.target.value)
                      }
                    />
                    <input
                      type="text"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 mb-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder={`Task ${index + 1} Description`}
                      value={task.description}
                      onChange={(e) =>
                        handleMemberTaskChange(
                          index,
                          "description",
                          e.target.value
                        )
                      }
                    />
                    <DatePicker
                      selected={task.due_date ? new Date(task.due_date) : null}
                      onChange={(date) =>
                        handleMemberTaskChange(
                          index,
                          "due_date",
                          format(date, "yyyy-MM-dd")
                        )
                      }
                      dateFormat="yyyy/MM/dd"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 mb-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder={`Task ${index + 1} Due Date`}
                    />
                    <button
                      type="button"
                      onClick={() => removeMemberTask(index)}
                      className="text-red-500"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addMemberTask}
                  className="text-blue-500 underline"
                >
                  Add Task
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
              onClick={taskSubmission}
            >
              Add Project
            </button>
          </form>
        </div>
      </section>
      <ToastContainer />
    </div>
  );
}
