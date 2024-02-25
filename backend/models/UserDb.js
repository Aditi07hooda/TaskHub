import { connection } from "../config/databaseConnection.js";

const user = connection.query(
  `CREATE TABLE IF NOT EXISTS Users(
    user_id INT(4) ZEROFILL AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(20),
    email VARCHAR(35) UNIQUE,
    password VARCHAR(100)
    )`,
  (error, results, fields) => {
    if (error) {
      console.error("Error creating users table:", error);
    } else {
      console.log("Users table created successfully.");
    }
  }
);

export default user;
