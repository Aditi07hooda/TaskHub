// TaskManagerTable.js

import React, { useState } from "react";
import "../css/Table.css";
import { format } from "date-fns";
import TaskUpdate from "./TaskUpdate.jsx";

const Table = ({ tasks, onDelete, onUpdate }) => {
  const [showTaskUpdate, setShowTaskUpdate] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const handleUpdateClick = (eventId) => {
    setSelectedTaskId(eventId);
    setShowTaskUpdate(true);
  };

  const handleToggleTaskForm = () => {
    setShowTaskUpdate(false);
    setSelectedTaskId(null);
  };

  return (
    <div className="task-manager-table-container">
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
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{format(new Date(task.enddate), "yyyy-MM-dd")}</td>
              <td>{task.status}</td>
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
    </div>
  );
};

export default Table;
