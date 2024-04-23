import express from "express";
import TaskAuthentication, {
  updateTaskValidation,
} from "../middlewares/TaskAuthentication.js";
import {
  createtask,
  deletetask,
  pending,
  readTaskIndividual,
  readtask,
  updatetask,
  updatetaskstatus
} from "../controller/Taskcontroller.js";
import { isAuthenticated } from "../middlewares/userAuthentication.js";

const router = express.Router();

router.get("/todos", isAuthenticated, readtask);

router.get("/todos/:taskId", isAuthenticated, readTaskIndividual);

router.post("/todos", TaskAuthentication, isAuthenticated, createtask);

router.delete("/todos/:taskId", isAuthenticated, deletetask);

router.put("/todos/:taskId", updateTaskValidation, isAuthenticated, updatetask);

router.put("/todos/individual/:taskId", isAuthenticated, updatetaskstatus);

router.get("/todos/pending", isAuthenticated, pending);

export default router;
