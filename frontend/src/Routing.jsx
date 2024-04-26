import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./page/Dashboard";
import { Profile } from "./page/Profile";
import Calendars from "./page/Calendars"
import { Signup } from "./page/Signup";
import Login from "./page/Login"
import Task from "./page/Task"
import Project from "./page/Project"
import Event from "./page/Event"
import EventUpdate from "./components/EventUpdate";

const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/task" element={<Task />} />
        <Route path="/project" element={<Project />} />
        <Route path="/event" element={<Event />} />
        <Route path="/calendar" element={<Calendars />} />
        <Route path="/updateEvent/:eventId" element={<EventUpdate/>} />
      </Routes>
    </Router>
  );
};

export default Routing;
