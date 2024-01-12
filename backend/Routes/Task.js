import express from "express";
import {
  createtask,
  deletetask,
  readtask,
  updatetask,
} from "../controller/Taskcontroller.js";
const router = express.Router();

router.get("/todos", readtask);

router.post("/todos", createtask);

router.delete("/todos", deletetask);

router.put("/todos", updatetask);

export default router;
