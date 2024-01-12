import React, { useState } from "react";
import "../css/Dashboard.css";
import Navbar from "../components/Navbar";
import Sidebar from "../components/sidebar";
import Piechart from "../components/Piechart";
import Barchart from "../components/Barchart";
import Table from "../components/Tables";
import { CDBCard, CDBCardBody, CDBContainer } from "cdbreact";

export default function Dashboard() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      taskName: "Complete Project",
      assignedDate: "2023-01-01",
      deadline: "2023-01-10",
      status: "In Progress",
      area: "Finance",
    },
    {
      id: 2,
      taskName: "Complete Project",
      assignedDate: "2023-01-01",
      deadline: "2023-01-10",
      status: "In Progress",
      area: "Finance",
    },
    {
      id: 3,
      taskName: "Complete Project",
      assignedDate: "2023-01-01",
      deadline: "2023-01-10",
      status: "In Progress",
      area: "Finance",
    },
    // Add more tasks as needed
  ]);

  const handleDelete = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  return (
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
          {/* chart */}
          <div className="pie-bar grid grid-cols-2 m-5 gap-16">
            <Piechart />
            <Barchart />
          </div>

          {/* card */}
          <CDBContainer className="cdb-card-container grid grid-cols-2 grid-flow-row px-5 gap-5">
            <CDBCard className="cdb-card"
              style={{
                width: "25rem",
                borderColor: "black",
                borderRadius: "0.375rem",
              }}
            >
              <CDBCardBody className="cdb-card-body">
                <CDBCard
                  style={{ paddingLeft: "1.5rem", paddingTop: "0.5rem" }}
                >
                  <b style={{ fontSize: "1.5rem" }}>5</b>
                  <p style={{ color: "gray" }}>
                    <b>Pending Task</b>
                  </p>
                </CDBCard>
              </CDBCardBody>
            </CDBCard>
            <CDBCard className="cdb-card"
              style={{
                width: "25rem",
                borderColor: "black",
                borderRadius: "0.375rem",
              }}
            >
              <CDBCardBody className="cdb-card-body">
                <CDBCard 
                  style={{ paddingLeft: "1.5rem", paddingTop: "0.5rem" }}
                >
                  <b style={{ fontSize: "1.5rem" }}>2</b>
                  <p style={{ color: "gray" }}>
                    <b>In Progress</b>
                  </p>
                </CDBCard>
              </CDBCardBody>
            </CDBCard>
            <CDBCard className="cdb-card"
              style={{
                width: "25rem",
                borderColor: "black",
                borderRadius: "0.375rem",
              }}
            >
              <CDBCardBody className="cdb-card-body">
                <CDBCard
                  style={{ paddingLeft: "1.5rem", paddingTop: "0.5rem" }}
                >
                  <b style={{ fontSize: "1.5rem" }}>10</b>
                  <p style={{ color: "gray" }}>
                    <b>Total Task</b>
                  </p>
                </CDBCard>
              </CDBCardBody>
            </CDBCard>
          </CDBContainer>

          {/* table */}
          <div>
            <Table tasks={tasks} onDelete={handleDelete} className="mx-8" />
          </div>
          <div>
            <Table tasks={tasks} onDelete={handleDelete} className="mx-8" />
          </div>
        </div>
      </div>
    </div>
  );
}
