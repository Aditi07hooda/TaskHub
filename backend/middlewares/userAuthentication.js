import { connection } from "../config/databaseConnection.js";
import Users from "../models/UserDb.js"
import jwt from "jsonwebtoken";

const userValidation = (req, res, next) => {
  if (req.body.userName != "" || req.body.password != "") {
    next();
  } else {
    res.status(401).json({ message: "Username or password is missing" });
  }
};


export const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    res.status(401).send("Authentication failed. no token found");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    connection.query(
      "SELECT * FROM Users WHERE user_id = ?",
      [decoded.user_id],
      (error, results, fields) => {
        if (error) {
          console.error('Authentication Error:', error);
          res.status(401).send('Authentication failed');
          return;
        }

        const user = results[0];

        if (!user) {
          res.status(401).send("User not found");
          return;
        }

        req.user = user;
        next();
      }
    );
  } catch (error) {
    console.error('Authentication Error:', error);
    res.status(401).send('Authentication failed');
  }
};


export default userValidation;
