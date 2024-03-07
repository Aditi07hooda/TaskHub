import { connection } from "../config/databaseConnection.js";

// Use a callback function with connection.query
export const projectDetailedView = connection.query(
  `
  CREATE VIEW IF NOT EXISTS ProjectDetailsView AS
  SELECT 
      Projects.project_id,
      Projects.name,
      Projects.due_date,
      Users_team_leader.user_name AS team_leader_name,
      GROUP_CONCAT(Users_team_members.user_name) AS team_members,
      CONCAT('[', GROUP_CONCAT(
          CONCAT('{"member_name": "', Users_team_members.user_name, '", "tasks": [',
                 COALESCE(user_tasks.tasks, ''),
                 ']}')
      ), ']') AS member_tasks
  FROM 
      Projects
  JOIN
      Users AS Users_team_leader ON Projects.team_leader_id = Users_team_leader.user_id
  LEFT JOIN
      ProjectMembers ON Projects.project_id = ProjectMembers.project_id
  LEFT JOIN
      Users AS Users_team_members ON ProjectMembers.user_id = Users_team_members.user_id
  LEFT JOIN (
      SELECT
          ProjectTasks.project_id,
          Users_team_members.user_name,
          COALESCE(GROUP_CONCAT(
              CONCAT('{"title": "', ProjectTasks.title, '", "description": "', ProjectTasks.description, '", "due_date": "', ProjectTasks.due_date, '"}')
          ), '') AS tasks
      FROM
          ProjectTasks
      JOIN
          Users AS Users_team_members ON ProjectTasks.user_id = Users_team_members.user_id
      GROUP BY
          ProjectTasks.project_id, Users_team_members.user_name
  ) AS user_tasks ON Projects.project_id = user_tasks.project_id AND Users_team_members.user_name = user_tasks.user_name
  GROUP BY
      Projects.project_id;
  
  `,
  (error, results, fields) => {
    if (error) {
      console.error("Error creating ProjectDetailsView:", error);
    } else {
      console.log("ProjectDetailsView created successfully.");
    }
    
  }
);
