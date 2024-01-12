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
const data = [
  { name: "group A", series1: 4, series2: 1, series3: 2 },
  { name: "group B", series1: 3, series2: 6, series3: 5 },
  { name: "group C", series1: 5, series2: 3, series3: 6 },
];

export default function Barchart() {
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
        <Bar dataKey="series1" fill="#8884d8" />
        <Bar dataKey="series2" fill="#82ca9d" />
        <Bar dataKey="series3" fill="#ffc658" />
      </BarChart>
    </div>
  );
}
