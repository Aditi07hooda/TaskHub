import { connection } from "../config/databaseConnection.js";

export const ProjectTasks = connection.query(
  `CREATE TABLE IF NOT EXISTS ProjectTasks (
    task_id INT(4) ZEROFILL AUTO_INCREMENT PRIMARY KEY,
    project_id INT(4) ZEROFILL,
    user_id INT(4) ZEROFILL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    due_date DATE,
    status ENUM('pending', 'completed') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES Projects(project_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
  );
  `,
  (error, results, field) => {
    if (error) {
      console.log("Error creating ProjectTasks table", error);
    } else {
      console.log("ProjectTasks table created");
    }
  }
);
