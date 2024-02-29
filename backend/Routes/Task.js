import express from "express";
import TaskAuthentication, {
  updateTaskValidation,
} from "../middlewares/TaskAuthentication.js";
import {
  createtask,
  deletetask,
  pending,
  readtask,
  updatetask,
} from "../controller/Taskcontroller.js";
import { isAuthenticated } from "../middlewares/userAuthentication.js";

const router = express.Router();

router.get("/todos", isAuthenticated, readtask);

router.post("/todos", TaskAuthentication, isAuthenticated, createtask);

router.delete("/todos/:taskId", isAuthenticated, deletetask);

router.put("/todos", updateTaskValidation, isAuthenticated, updatetask);

router.get("/todos/pending", isAuthenticated, pending);

export default router;
