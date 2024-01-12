// TaskManagerTable.js

import React from "react";
import "../css/Table.css";

const Table = ({ tasks, onDelete }) => {
  return (
    <div className="task-manager-table-container">
      <table className="task-manager-table">
        <thead>
          <tr>
            <th>Task Name</th>
            <th>Assigned Date</th>
            <th>Deadline</th>
            <th>Status</th>
            <th>Area</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.taskName}</td>
              <td>{task.assignedDate}</td>
              <td>{task.deadline}</td>
              <td>{task.status}</td>
              <td>{task.area}</td>
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
