// TaskManagerTable.js

import React, { useState } from "react";
import "../css/Table.css";
import { format } from "date-fns";
import EventUpdate from "./EventUpdate.jsx";

const Table = ({ events, onDelete }) => {
  const [showEventUpdate, setShowEventUpdate] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);

  const handleUpdateClick = (eventId) => {
    setSelectedEventId(eventId);
    setShowEventUpdate(true);
  };

  const handleToggleTaskForm = () => {
    setShowEventUpdate(false)
    setSelectedEventId(null);
  }

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
                  <button onClick={() => handleUpdateClick(event.id)}>
                    Update
                  </button>

                  {showEventUpdate && selectedEventId === event.id && (
                    <div
                      className="fixed top-0 left-0 w-full h-full flex items-center justify-center flex-col"
                      style={{ backdropFilter: "blur(15px)" }}
                    >
                      <div>
                        <EventUpdate eventid={selectedEventId} />
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
