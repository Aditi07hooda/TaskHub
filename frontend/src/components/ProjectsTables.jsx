// TaskManagerTable.js

import React, { useState } from "react";
import "../css/Table.css";
import { format } from "date-fns";
import ProjectUpdate from "./ProjectUpdate.jsx";

const Table = ({ projects, onDelete }) => {
  const [showProjectUpdate, setShowProjectUpdate] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  const handleUpdateClick = (projectId) => {
    setSelectedProjectId(projectId);
    setShowProjectUpdate(true);
  };

  const handleToggleTaskForm = () => {
    setShowProjectUpdate(false);
    setSelectedProjectId(null);
  };

  return (
    <div className="task-manager-table-container">
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
          {projects.map((project) => (
            <tr key={project.project_id}>
              <td>{project.name}</td>
              <td>{format(new Date(project.due_date), "yyyy-MM-dd")}</td>
              <td>{project.team_leader_name}</td>
              <td>
                <ul>
                   {project.team_members.split(',').map((member, index) => (
                    <li key={index}>{member.trim()}</li>
                  ))}
                </ul>
              </td>
              <td>
                <button onClick={() => handleUpdateClick(project.project_id)}>
                  Update
                </button>

                {showProjectUpdate && selectedProjectId === project.project_id && (
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
                <button onClick={() => onDelete(project.project_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
