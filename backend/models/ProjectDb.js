import { connection } from "../config/databaseConnection.js";

export const Project = connection.query(`
    CREATE TABLE IF NOT EXISTS Projects (
        project_id INT(4) ZEROFILL AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        team_leader_id INT(4) ZEROFILL,
        due_date DATE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (team_leader_id) REFERENCES Users(user_id) ON DELETE CASCADE
  )`,
  (error, results, fields) => {
    if (error) {
      console.error("Error creating project table:", error);
    } else {
      console.log("Projects table created successfully.");
    }
  }
);
