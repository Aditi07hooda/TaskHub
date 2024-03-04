// TaskManagerTable.js

import React from "react";
import "../css/Table.css";
import { format } from "date-fns";


const Table = ({ tasks, onDelete, onUpdate }) => {
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
                <button onClick={() => onUpdate(task.id)}>Update</button>
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
