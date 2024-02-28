import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./page/Dashboard";
import { Profile } from "./page/Profile";
import Calendars from "./page/Calendars"
import { Signup } from "./page/Signup";
import Login from "./page/Login"

const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/calendar" element={<Calendars />} />
      </Routes>
    </Router>
  );
};

export default Routing;
