import React from "react";
import {
  BarChart,
  XAxis,
  YAxis,
  Bar,
  CartesianGrid,
  Legend,
  Tooltip,
} from "recharts";
import  "../css/Barchart.css"

export default function Barchart({eventNo, projectNo, taskNo}) {
  const data = [
    { name: "Event", Ongoing: eventNo.eventNo, Pending: eventNo.eventNo, Completed: eventNo.eventNo },
    { name: "Project", Ongoing: projectNo.projectNo, Pending: projectNo.projectNo, Completed: projectNo.projectNo },
    { name: "Task", Ongoing: taskNo.taskNo, Pending: taskNo.taskNo, Completed: taskNo.taskNo },
  ];
  return (
    <div className="border-2 border-black bg-white flex flex-col rounded-md w-fit px-2">
      <h1 className="ml-5 text-xl font-bold mt-2 w-full">By Area</h1>
      <hr className="w-full mb-3 -mt-1" />
      <BarChart width={400} height={260} data={data} className=" -ml-7">
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Ongoing" fill="#8884d8" />
        <Bar dataKey="Pending" fill="#82ca9d" />
        <Bar dataKey="Completed" fill="#ffc658" />
      </BarChart>
    </div>
  );
}
