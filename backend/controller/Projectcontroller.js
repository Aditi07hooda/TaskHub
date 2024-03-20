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

      const projectId = results.insertId

      // Step 2: Insert team members into the ProjectMembers table
      const createProjectMembersQuery = `
      INSERT INTO ProjectMembers (project_id, user_id)
      VALUES (?, ?)
    `;

      // Function to get user_id from user_name
      const getUserIdFromUserName = async (userName) => {
        return new Promise((resolve, reject) => {
          const query = "SELECT user_id FROM Users WHERE user_name = ?";
          console.log("Query:", query, "Parameters:", [userName]);

          connection.query(query, [userName], (error, results, fields) => {
            if (error) {
              console.error("Error executing query:", error);
              reject(error);
            } else {
              const user = results[0];
              console.log("Query results:", results);
              resolve(user ? user.user_id : null);
            }
          });
        });
      };

      // Assuming that team_leader is also a team member
      const teamLeaderId = req.user.user_id;
      const teamMemberIds = [
        teamLeaderId,
        ...(await Promise.all(
          team_members.map((member) => getUserIdFromUserName(member.name))
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

// Get all projects
const getAllProjects = (req, res) => {
  const user_id = req.user.user_id;
  const getAllProjectsQuery = `
    SELECT * FROM Projects
  `;

  connection.query(getAllProjectsQuery, (error, results, fields) => {
    if (error) {
      console.error("Error getting projects:", error);
      return res.status(500).send("Internal Server Error");
    }

    res.status(200).json(results);
  });
};

const getAllProjectsDetailedView = (req, res) => {
  const user_id = req.user.user_id.toString();
  const getAllProjectsQuery = `
    SELECT * FROM ProjectDetailsView WHERE FIND_IN_SET(CAST(LPAD('${user_id}', 4, '0') AS CHAR), team_member_ids) > 0
  `;
  connection.query(getAllProjectsQuery, (error, results, fields) => {
    if (error) {
      console.error("Error getting projects:", error);
      return res.status(500).send("Internal Server Error");
    }

    res.status(200).json(results);
  });
};

// Get a specific project by ID
const getProjectById = (req, res) => {
  const projectId = req.params.projectId;
  const getProjectByIdQuery = `
    SELECT * FROM ProjectDetailsView WHERE project_id = ?
  `;

  connection.query(
    getProjectByIdQuery,
    [projectId],
    (error, results, fields) => {
      if (error) {
        console.error("Error getting project by ID:", error);
        return res.status(500).send("Internal Server Error");
      }

      if (results.length === 0) {
        return res.status(404).json({ message: "Project not found" });
      }

      res.status(200).json(results[0]);
    }
  );
};

// Update a specific project by ID
const updateProjectById = (req, res) => {
  const projectId = req.params.projectId;
  const { name, due_date } = req.body;
  const updateProjectByIdQuery = `
    UPDATE Projects SET name = ?, due_date = ? WHERE project_id = ?
  `;

  connection.query(
    updateProjectByIdQuery,
    [name, due_date, projectId],
    (error, results, fields) => {
      if (error) {
        console.error("Error updating project by ID:", error);
        return res.status(500).send("Internal Server Error");
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "Project not found" });
      }

      res.status(200).json({ message: "Project updated successfully" });
    }
  );
};

// Delete a specific project by ID
const deleteProjectById = (req, res) => {
  const projectId = req.params.projectId;
  const deleteProjectByIdQuery = `
    DELETE FROM Projects WHERE project_id = ?
  `;

  connection.query(
    deleteProjectByIdQuery,
    [projectId],
    (error, results, fields) => {
      if (error) {
        console.error("Error deleting project by ID:", error);
        return res.status(500).send("Internal Server Error");
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "Project not found" });
      }

      res.status(200).json({ message: "Project deleted successfully" });
    }
  );
};

const projectCount = (req, res) => {
  const user_id = req.user.user_id.toString();
  const projectcount = `
    SELECT COUNT(*) as project_count FROM ProjectDetailsView WHERE FIND_IN_SET(CAST(LPAD('${user_id}', 4, '0') AS CHAR), team_member_ids) > 0
  `;

  connection.query(projectcount, (error, results, fields) => {
    if (error) {
      console.error("Error getting total project: ", error);
      return res.status(500).send("Internal Server Error");
    }

    res.status(200).json({ projectNo: `${results[0].project_count}` });
  });
};

const eventCount = (req, res) => {
  const user_id = req.user.user_id;
  const eventcount = `
  SELECT COUNT(*) as event_count from Event WHERE user_id = ?
  `;

  connection.query(eventcount, [user_id], (error, results, fields) => {
    if (error) {
      console.error("Error getting total event: ", error);
      return res.status(500).send("Internal Server Error");
    }

    res.status(200).json({ eventNo: `${results[0].event_count}` });
  });
};
const taskCount = (req, res) => {
  const user_id = req.user.user_id;
  const taskcount = `
  SELECT COUNT(*) as task_count from Task WHERE user_id = ?
  `;

  connection.query(taskcount, [user_id], (error, results, fields) => {
    if (error) {
      console.error("Error getting total task: ", error);
      return res.status(500).send("Internal Server Error");
    }

    res.status(200).json({ taskNo: `${results[0].task_count}` });
  });
};

export {
  createProjectWithDetails,
  getAllProjects,
  getProjectById,
  updateProjectById,
  deleteProjectById,
  getAllProjectsDetailedView,
  projectCount,
  eventCount,
  taskCount,
};
