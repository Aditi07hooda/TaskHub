import express from "express";
import {
  readevent,
  readEventIndividual,
  updateevent,
  deleteevent,
  createEvent
} from "../controller/EventController.js";
import { isAuthenticated } from "../middlewares/userAuthentication.js";

const router = express.Router();

router.get("/event", isAuthenticated, readevent);

router.get("/event/:eventId", isAuthenticated, readEventIndividual);

router.post("/event", isAuthenticated, createEvent);

router.delete("/event/:eventId", isAuthenticated, deleteevent);

router.put("/event/:eventId", isAuthenticated, updateevent);

export default router;
