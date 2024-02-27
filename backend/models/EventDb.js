import { connection } from "../config/databaseConnection.js";

const createEventTableQuery = connection.query(`
CREATE TABLE IF NOT EXISTS Event (
  id INT PRIMARY KEY,
  user_id INT(4) ZEROFILL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  location TEXT,
  on_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
)
`, (error, results, fields) => {
  if (error) {
    console.error("Error creating Event table:", error);
  } else {
    console.log("Event table created successfully.");
  }
});;



export default createEventTableQuery;
