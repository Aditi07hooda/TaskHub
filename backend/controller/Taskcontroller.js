import { parse } from "date-fns";
import {
  insertTask,
  deleteTask,
  updateTask,
  readTask,
  updateTaskStatus,
  readTaskById
} from "../middlewares/TaskDbFunc.js";

const todolist = [];
const pendingtodolist = [];

export const readtask = (req, res) => {
  const user_id = req.user.user_id
  readTask(user_id, (error, tasks) => {
    if (error) {
      console.error("Error fetching tasks:", error);
      return res.status(500).send("Internal Server Error");
    }
    res.send(tasks);
  });
};

export const readTaskIndividual = (req, res) => {
  const user_id = req.user.user_id;
  const taskId = req.params.taskId;
  readTaskById(user_id, taskId, (error, tasks) => {
    if (error) {
      console.error("Error fetching task:", error);
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

  const user_id = req.user.user_id
  insertTask(todoitem, user_id, (error) => {
    if (error) {
      console.error("Error creating task:", error);
      return res.status(500).json({ message: 'Failed to create task' });
    }
    res.status(201).json({
      message: 'New task added successfully!',
      task: todoitem,
    });
  });
}

export const deletetask = (req, res) => {
  const id = req.params.taskId;
  deleteTask(id, (error) => {
    if (error) {
      res.status(404).send("Deletion unsuccessful");
    } else {
      res.send("Deletion successful");
    }
  });
};

export const updatetask = (req, res) => {
  const id = req.params.taskId;
  updateTask(id, req.body, (error) => {
    if (error) {
      console.error("Error updating task in the database:", error);
      return res.status(500).send("Internal Server Error");
    }
    return res.send("Task updated");
  });
};

export const updatetaskstatus = (req, res) => {
  const id = req.params.taskId;
  const newStatus = req.body.status;
  updateTaskStatus(id, newStatus, (error) => {
    if (error) {
      console.error("Error updating task status in the database:", error);
      return res.status(500).send("Internal Server Error");
    }
    return res.send("Task status updated");
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
