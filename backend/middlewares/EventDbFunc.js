import eventdb from "../models/EventDb.js";

const insertEvent = (eventItem, user_id) => {
  eventdb.query(
    "INSERT INTO Event (id, user_id, title, description, location, fromdate, enddate) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [
      eventItem.id,
      user_id,
      eventItem.title,
      eventItem.description,
      eventItem.location,
      eventItem.fromdate,
      eventItem.enddate,
    ],
    (error, results, fields) => {
      if (error) {
        console.error("Error creating Event:", error);
      } else {
        console.log("New Event added in db");
      }
    }
  );
};

const deleteEvent = (id, callback) => {
  eventdb.query(
    "DELETE FROM Event WHERE id = ?",
    [id],
    (error, results, fields) => {
      if (error) {
        console.error("Error deleting event:", error);
        callback(error);
      } else {
        if (results.affectedRows > 0) {
          callback(null);
        } else {
          callback(new Error(`No event found with ID ${id}`));
        }
      }
    }
  );
};

const updateEvent = (id, updatedEvent, callback) => {
  const setClause = Object.keys(updatedEvent)
    .filter((key) => updatedEvent[key] !== undefined)
    .map((key) => `${key} = ?`)
    .join(", ");

  if (!setClause) {
    return callback(new Error("No valid fields to update"));
  }

  const queryParams = Object.values(updatedEvent).filter(
    (value) => value !== undefined
  );
  queryParams.push(id);

  const sqlQuery = `UPDATE Event SET ${setClause} WHERE id = ?`;

  eventdb.query(sqlQuery, queryParams, (error, results, fields) => {
    if (error) {
      callback(error);
    } else {
      if (results.affectedRows > 0) {
        callback(null);
      } else {
        callback(new Error(`No Event found with ID ${id}`));
      }
    }
  });
};

const readEvent = (user_id, callback) => {
  eventdb.query(
    "SELECT * FROM Event WHERE user_id = ?",
    [user_id],
    (error, results, fields) => {
      if (error) {
        console.error("Error reading events:", error);
        callback(error, null);
      } else {
        callback(null, results);
      }
    }
  );
};

const readEventById = (user_id, eventId, callback) => {
  eventdb.query(
    "SELECT * FROM Event WHERE user_id = ? AND id = ?",
    [user_id, eventId],
    (error, results, fields) => {
      if (error) {
        console.error("Error reading events:", error);
        callback(error, null);
      } else {
        callback(null, results);
      }
    }
  );
};

export { insertEvent, deleteEvent, updateEvent, readEvent, readEventById };
