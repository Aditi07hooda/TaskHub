// TaskManagerTable.js

import React, { useState } from "react";
import "../css/Table.css";
import { format } from "date-fns";
import EventUpdate from "./EventUpdate.jsx";

const Table = ({ events, onDelete }) => {
  const [showEventUpdate, setShowEventUpdate] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);

  const handleUpdateClick = () => {
    setShowEventUpdate(true);
  };

  return (
    <>
      <div className="task-manager-table-container">
        <table className="task-manager-table">
          <thead>
            <tr>
              <th>Event Name</th>
              <th>Event Description</th>
              <th>Location</th>
              <th>From Date</th>
              <th>To Date</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id}>
                <td>{event.title}</td>
                <td>{event.description}</td>
                <td>{event.location}</td>
                <td>{format(new Date(event.fromdate), "yyyy-MM-dd")}</td>
                <td>{format(new Date(event.enddate), "yyyy-MM-dd")}</td>
                <td>
                  <button onClick={() => handleUpdateClick()}>
                    Update
                  </button>

                  {showEventUpdate && (
                    <EventUpdate />
                  )}
                </td>
                <td>
                  <button onClick={() => onDelete(event.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
