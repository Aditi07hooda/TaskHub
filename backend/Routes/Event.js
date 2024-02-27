import express from "express";
import {
  readevent,
  updateevent,
  deleteevent,
  createEvent
} from "../controller/EventController.js";
import { isAuthenticated } from "../middlewares/userAuthentication.js";

const router = express.Router();

router.get("/event", isAuthenticated, readevent);

router.post("/event", isAuthenticated, createEvent);

router.delete("/event", isAuthenticated, deleteevent);

router.put("/event", isAuthenticated, updateevent);

export default router;
