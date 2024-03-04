import { parse } from "date-fns";
import {
  insertEvent,
  deleteEvent,
  updateEvent,
  readEvent,
  readEventById
} from "../middlewares/EventDbFunc.js";

export const readevent = (req, res) => {
  const user_id = req.user.user_id;
  readEvent(user_id, (error, events) => {
    if (error) {
      console.error("Error fetching events:", error);
      return res.status(500).send("Internal Server Error");
    }
    res.send(events);
  });
};
export const readEventIndividual = (req, res) => {
  const user_id = req.user.user_id;
  const eventId = req.params.eventId;
  readEventById(user_id, eventId, (error, events) => {
    if (error) {
      console.error("Error fetching events:", error);
      return res.status(500).send("Internal Server Error");
    }
    res.send(events);
  });
};

export const createEvent = (req, res) => {
  const eventItem = {
    id: Math.floor(Math.random() * 10000).toString(),
    title: req.body.title,
    description: req.body.description,
    location: req.body.location,
    fromdate: req.body.fromdate,
    enddate: req.body.enddate
  };

  const user_id = req.user.user_id;
  insertEvent(eventItem, user_id);
  res.status(201).json({
    message: 'New event added successfully!',
    task: eventItem,
  });
};

export const deleteevent = (req, res) => {
  const id = req.params.eventId;
  deleteEvent(id, (error) => {
    if (error) {
      res.status(404).send("Deletion unsuccessful");
    } else {
      res.send("Deletion successful");
    }
  });
};

export const updateevent = (req, res) => {
  const id = req.params.eventId;
  updateEvent(id, req.body, (error) => {
    if (error) {
      console.error("Error updating event in the database:", error);
      return res.status(500).send("Internal Server Error");
    }
    return res.send("Event updated");
  });
};
