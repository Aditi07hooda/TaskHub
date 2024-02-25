import { parse } from "date-fns";
import {
  insertTask,
  deleteTask,
  updateTask,
} from "../middlewares/TaskDbFunc.js";

const todolist = [];
const pendingtodolist = [];

export const readtask = (req, res) => {
  res.send(todolist);
};

export const createtask = (req, res) => {
  const todoitem = {
    id: Math.floor(Math.random() * 10000).toString(),
    title: req.body.title,
    description: req.body.description,
    enddate: req.body.enddate,
  };
  insertTask(todoitem);
  res.send("New task added");
};

export const deletetask = (req, res) => {
  const id = req.body.id;
  deleteTask(id, (error) => {
    if (error) {
      res.status(404).send("Deletion unsuccessful");
    } else {
      res.send("Deletion successful");
    }
  });
};

export const updatetask = (req, res) => {
  const id = req.body.id;
  updateTask(id, req.body, (error) => {
    if (error) {
      console.error("Error updating task in the database:", error);
      return res.status(500).send("Internal Server Error");
    }
    return res.send("Task updated");
  });
};

export const pending = (req, res) => {
  const expiredTasks = todolist.filter(
    (task) => parse(task.enddate, "dd/MM/yy", new Date()) < new Date()
  );
  if (expiredTasks.length === 0) {
    return res.status(204).json({ msg: "No task is pending" });
  }
  pendingtodolist.push(...expiredTasks);
  res.status(200).send(pendingtodolist);
};
