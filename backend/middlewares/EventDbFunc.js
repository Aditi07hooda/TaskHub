import eventdb from "../models/EventDb.js";

const insertEvent = (eventItem, user_id, callback) => {
    eventdb.query(
    "INSERT INTO Event (id, user_id, title, description, location, on_date) VALUES (?, ?, ?, ?, ?)",
    [eventItem.id, user_id, eventItem.title, eventItem.description, eventItem.location, eventItem.ondate],
    (error, results, fields) => {
      if (error) {
        console.error("Error creating Event:", error);
        callback(error);
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
          console.log(`event with ID ${id} deleted`);
          callback(null);
        } else {
          console.log(`No event found with ID ${id}`);
          callback(new Error(`No event found with ID ${id}`));
        }
      }
    }
  )
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
        callback(error, null);
      } else {
        callback(null, results);
      }
    }
  );
};


export { insertEvent, deleteEvent, updateEvent, readEvent };
