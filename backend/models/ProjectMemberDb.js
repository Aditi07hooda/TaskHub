import { connection } from "../config/databaseConnection.js";

export const projectMenbers = connection.query(
  `CREATE TABLE IF NOT EXISTS ProjectMembers (
    project_id INT(4) ZEROFILL,
    user_id INT(4) ZEROFILL,
    PRIMARY KEY (project_id, user_id),
    FOREIGN KEY (project_id) REFERENCES Projects(project_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
  );`,
  (error, results, field) => {
    if (error) {
      console.log("Error creating Project members table", error);
    } else {
      console.log("Project Members Table created");
    }
  }
);
