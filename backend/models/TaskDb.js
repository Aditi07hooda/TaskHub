import { connection } from "../config/databaseConnection.js";

const createTaskTableQuery = `
  CREATE TABLE IF NOT EXISTS Task (
    id INT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    due_date DATE,
    status ENUM('pending', 'completed') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )
`;

connection.query(createTaskTableQuery, (error, results, fields) => {
  if (error) {
    console.error("Error creating task table:", error);
  } else {
    console.log("Task table created successfully.");
  }
});

const pendingTaskdb = connection.query(
  `CREATE TABLE IF NOT EXISTS PendingTask (
    id INT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    due_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )`,
  (error, results, fields) => {
    if (error) {
      console.error("Error creating pending task table:", error);
    } else {
      console.log("PendingTask table created successfully.");
    }
  }
);

export { pendingTaskdb };
export default connection;
