import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/sidebar";
import { useRecoilValue, useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { isAuthenticatedUser } from "../state/Authentication";
import { projectList, projectListDetailedView } from "../state/Project.jsx";
import { projectCount } from "../state/Count.jsx";
import "../css/Table.css";
import { format } from "date-fns";
import ProjectUpdate from "../components/ProjectUpdate.jsx";
import axios from "axios";

export default function Project() {
  const isAuthenticated = useRecoilValue(isAuthenticatedUser);
  const navigate = useNavigate();

  const [showProjectUpdate, setShowProjectUpdate] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [projects, setProjects] = useRecoilState(projectList);
  const [projectNo, setProjectNo] = useRecoilState(projectCount);
  const [projectDetailed, setprojectDetailed] = useRecoilState(
    projectListDetailedView
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage, setProjectsPerPage] = useState(10);
  const [totalProjects, setTotalProjects] = useState(projectDetailed.length);

  const handleUpdateClick = (projectId) => {
    setSelectedProjectId(projectId);
    setShowProjectUpdate(true);
  };

  const handleToggleTaskForm = () => {
    setShowProjectUpdate(false);
    setSelectedProjectId(null);
  };

  const handleDeleteProject = async (projectId) => {
    await axios.delete(`http://localhost:5001/Project/${projectId}`, {
      withCredentials: true,
    });
    setProjects((preProject) =>
      preProject.filter((project) => project.id !== projectId)
    );
    const updatedEventListResponse = await axios.get(
      "http://localhost:5001/ProjectDetailedView",
      {
        withCredentials: true,
      }
    );
    setprojectDetailed(updatedEventListResponse.data);
    setProjectNo((prevProject) => ({projectNo: prevProject.projectNo - 1}))
  }; 

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastProjects = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProjects - projectsPerPage;
  const currentProjects = projectDetailed.slice(indexOfFirstProject, indexOfLastProjects);

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
            <div className="task-manager-table-container flex flex-col items-end">
              <table className="task-manager-table">
                <thead>
                  <tr>
                    <th>Project Name</th>
                    <th>Deadline</th>
                    <th>Team Leader</th>
                    <th>Members</th>
                    <th>Update</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {projectDetailed.map((project) => (
                    <tr key={project.project_id}>
                      <td>{project.name}</td>
                      <td>
                        {format(new Date(project.due_date), "yyyy-MM-dd")}
                      </td>
                      <td>{project.team_leader_name}</td>
                      <td>
                        <ul>
                          {project.team_members
                            .split(",")
                            .map((member, index) => (
                              <li key={index}>{member.trim()}</li>
                            ))}
                        </ul>
                      </td>
                      <td>
                        <button
                          onClick={() => handleUpdateClick(project.project_id)}
                        >
                          Update
                        </button>

                        {showProjectUpdate &&
                          selectedProjectId === project.project_id && (
                            <div
                              className="fixed top-0 left-0 w-full h-full flex items-center justify-center flex-col"
                              style={{ backdropFilter: "blur(15px)" }}
                            >
                              <div>
                                <ProjectUpdate projectid={selectedProjectId} />
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
                        <button onClick={() => handleDeleteProject(project.project_id)}>
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
                {/* {Array(Math.ceil(totalTasks / projectsPerPage))
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
                    currentPage === Math.ceil(totalProjects / projectsPerPage)
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  disabled={
                    currentPage === Math.ceil(totalProjects / projectsPerPage)
                  }
                  onClick={() => paginate(currentPage + 1)}
                >
                  Next
                </button>
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
