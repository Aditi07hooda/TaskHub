import { connection } from "../config/databaseConnection.js";

const createProjectWithDetails = async (req, res) => {
  const { name, due_date, team_leader, team_members, tasks } = req.body;

  // Step 1: Insert the project details into the Projects table
  const createProjectQuery = `
    INSERT INTO Projects (name, team_leader_id, due_date)
    VALUES (?, ?, ?)
  `;

  connection.query(
    createProjectQuery,
    [name, req.user.user_id, due_date],
    async (error, results, fields) => {
      if (error) {
        console.error("Error creating project:", error);
        return res.status(500).send("Internal Server Error");
      }

      const projectId = results.insertId;

      // Step 2: Insert team members into the ProjectMembers table
      const createProjectMembersQuery = `
      INSERT INTO ProjectMembers (project_id, user_id)
      VALUES (?, ?)
    `;

      // Function to get user_id from user_name
      const getUserIdFromUserName = async (userName) => {
        return new Promise((resolve, reject) => {
          connection.query(
            "SELECT user_id FROM Users WHERE user_name = ?",
            [userName],
            (error, results, fields) => {
              if (error) {
                reject(error);
              } else {
                const user = results[0];
                resolve(user ? user.user_id : null);
              }
            }
          );
        });
      };

      // Assuming that team_leader is also a team member
      const teamLeaderId = req.user.user_id;
      const teamMemberIds = [
        teamLeaderId,
        ...(await Promise.all(
          team_members.map((memberName) => getUserIdFromUserName(memberName))
        )),
      ];

      teamMemberIds.forEach((memberId) => {
        connection.query(
          createProjectMembersQuery,
          [projectId, memberId],
          (error, results, fields) => {
            if (error) {
              console.error("Error adding team member:", error);
            }
          }
        );
      });

      // Step 3: Insert tasks for each team member into the ProjectTasks table
      const createProjectTasksQuery = `
      INSERT INTO ProjectTasks (project_id, user_id, title, description, due_date)
      VALUES (?, ?, ?, ?, ?)
    `;

      teamMemberIds.forEach((memberId) => {
        tasks.forEach((task) => {
          connection.query(
            createProjectTasksQuery,
            [projectId, memberId, task.title, task.description, task.due_date],
            (error, results, fields) => {
              if (error) {
                console.error("Error adding task:", error);
              }
            }
          );
        });
      });

      res
        .status(200)
        .json({ message: `New project created with ID ${projectId}` });
    }
  );
};

export { createProjectWithDetails };
