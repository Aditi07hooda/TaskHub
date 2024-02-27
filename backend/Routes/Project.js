import express from "express";
import { createProjectWithDetails } from "../controller/Projectcontroller.js";
import { Project } from "../models/ProjectDb.js";
import { projectMenbers } from "../models/ProjectMemberDb.js";
import { ProjectTasks } from "../models/ProjectTasks.js";
import { isAuthenticated } from "../middlewares/userAuthentication.js";

const router = express.Router();

router.post("/Project", isAuthenticated, createProjectWithDetails);

export default router;
