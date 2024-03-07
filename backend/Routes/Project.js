import express from "express";
import {
  createProjectWithDetails,
  getAllProjects,
  deleteProjectById,
  updateProjectById,
  getProjectById,
  getAllProjectsDetailedView,
  projectCount,
  eventCount,
  taskCount
} from "../controller/Projectcontroller.js";
import { Project } from "../models/ProjectDb.js";
import { projectMenbers } from "../models/ProjectMemberDb.js";
import { ProjectTasks } from "../models/ProjectTasks.js";
import {projectDetailedView} from "../models/ProjectDetailView.js"
import { isAuthenticated } from "../middlewares/userAuthentication.js";

const router = express.Router();

router.get("/Project", isAuthenticated, getAllProjects);
router.get("/ProjectDetailedView", isAuthenticated, getAllProjectsDetailedView);
router.get("/ProjectCount", isAuthenticated, projectCount);
router.get("/EventCount", isAuthenticated, eventCount)
router.get("/TaskCount", isAuthenticated, taskCount);
router.post("/Project", isAuthenticated, createProjectWithDetails);
router.put("/Project/:projectId", isAuthenticated, updateProjectById);
router.delete("/Project/:projectId", isAuthenticated, deleteProjectById);
router.get("/Project/:projectId", isAuthenticated, getProjectById);

export default router;
