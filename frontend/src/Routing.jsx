import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./page/Dashboard";
import { Profile } from "./page/Profile";
import Calendars from "./page/Calendars"

const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route exact="true" path="/" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/calendar" element={<Calendars />} />
      </Routes>
    </Router>
  );
};

export default Routing;
