import { PieChart, Pie, Cell } from "recharts";
import React, {useState, useEffect} from "react";
import "../css/Piechart.css"
export default function Piechart({eventNo, projectNo, taskNo}) {
  console.log(eventNo.eventNo, projectNo.projectNo, taskNo.taskNo)
  const data = [
    { name: "Events", students: eventNo.eventNo },
    { name: "Task", students: projectNo.projectNo },
    { name: "Projects", students: taskNo.taskNo },
  ];
  const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="border-2 border-black bg-white flex flex-col rounded-md w-fit px-2">
      <h1 className="ml-5 text-xl font-bold mt-2 w-full">By Status</h1>
      <hr className="w-full mb-3 -mt-1" />
        <PieChart width={370} height={270}>
          <Pie
            data={data}
            dataKey="students"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
        </PieChart>
    </div>
  );
}
