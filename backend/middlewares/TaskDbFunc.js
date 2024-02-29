import taskdb from "../models/TaskDb.js";

const insertTask = (todoitem, user_id) => {
  taskdb.query(
    "INSERT INTO Task (id, user_id, title, description, due_date) VALUES (?, ?, ?, ?, ?)",
    [todoitem.id, user_id, todoitem.title, todoitem.description, todoitem.enddate],
    (error, results, fields) => {
      if (error) {
        console.error("Error creating task:", error);
      } else {
        console.log("New task added in db");
      }
    }
  );
};


const deleteTask = (id, callback) => {
  taskdb.query(
    "DELETE FROM Task WHERE id = ?",
    [id],
    (error, results, fields) => {
      if (error) {
        console.error("Error deleting task:", error);
        callback(error);
      } else {
        if (results.affectedRows > 0) {
          console.log(`Task with ID ${id} deleted`);
          callback(null);
        } else {
          console.log(`No task found with ID ${id}`);
          callback(new Error(`No task found with ID ${id}`));
        }
      }
    }
  )
};

const updateTask = (id, updatedTask, callback) => {
  const setClause = Object.keys(updatedTask)
    .filter((key) => updatedTask[key] !== undefined)
    .map((key) => `${key} = ?`)
    .join(", ");

  if (!setClause) {
    return callback(new Error("No valid fields to update"));
  }

  const queryParams = Object.values(updatedTask).filter(
    (value) => value !== undefined
  );
  queryParams.push(id);

  const sqlQuery = `UPDATE Task SET ${setClause} WHERE id = ?`;

  taskdb.query(sqlQuery, queryParams, (error, results, fields) => {
    if (error) {
      callback(error);
    } else {
      if (results.affectedRows > 0) {
        callback(null);
      } else {
        callback(new Error(`No task found with ID ${id}`));
      }
    }
  });
};

const readTask = (user_id, callback) => {
  taskdb.query(
    "SELECT * FROM Task WHERE user_id = ?",
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


export { insertTask, deleteTask, updateTask, readTask };
