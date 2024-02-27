import { parse } from "date-fns";
import {
  insertTask,
  deleteTask,
  updateTask,
  readTask
} from "../middlewares/TaskDbFunc.js";

const todolist = [];
const pendingtodolist = [];

export const readtask = (req, res) => {
  const user_id = req.user.user_id;
  readTask(user_id, (error, tasks) => {
    if (error) {
      console.error("Error fetching tasks:", error);
      return res.status(500).send("Internal Server Error");
    }
    res.send(tasks);
  });
};

export const createtask = (req, res) => {
  const todoitem = {
    id: Math.floor(Math.random() * 10000).toString(),
    title: req.body.title,
    description: req.body.description,
    enddate: req.body.enddate,
  };

  const user_id = req.user.user_id;
  insertTask(todoitem, user_id);
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
