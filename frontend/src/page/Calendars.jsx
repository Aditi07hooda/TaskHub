import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/sidebar";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import "../css/Calendar.css"

export default function Calendars() {
  return(
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
        <div className="main-content">
          <div className="flex">
            <Calendar className="react-calendar-left"/>
            <Calendar className="react-calendar-right"/>
          </div>
        </div>
      </div>
    </div>
  )
}
