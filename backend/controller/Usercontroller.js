import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userdb from "../models/UserDb.js"
import { connection } from "../config/databaseConnection.js"

export const usersignin = (req, res) => {
  const emailId = req.body.email;

  connection.query(
    "SELECT * FROM Users WHERE email = ?",
    [emailId],
    async (error, results, fields) => {
      if (error) {
        console.error("Error fetching user:", error);
        return res.status(500).send("Internal Server Error");
      }

      const user = results[0];

      if (!user) {
        return res.status(404).json(["User not found."]);
      }

      const passwordMatch = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (!passwordMatch) {
        res.status(404).send("Password didnot match")
      }

      const token = jwt.sign({ user_id: user.user_id }, process.env.JWT_SECRET);
      res.cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      });

      return res.send("User is signedIn");
    }
  );
};

export const usersignup = (req, res) => {
  const emailId = req.body.email;

  connection.query(
    "SELECT * FROM Users WHERE email = ?",
    [emailId],
    async (error, results, fields) => {
      if (error) {
        console.error("Error fetching user:", error);
        return res.status(500).send("Internal Server Error");
      }

      const user = results[0];

      if (user) {
        return res.send("User already found");
      }

      const confirmpasswordmatch =
        req.body.password === req.body.confirmpassword;

      if (!confirmpasswordmatch) {
        res.status(404).json({ message: "confirmPasswrod and password didn't match" });
        return;
      }
      const hashpassword = await bcrypt.hash(req.body.password, 10);

      connection.query(
        "INSERT INTO Users (user_name, email, password) VALUES (?, ?, ?)",
        [req.body.name, req.body.email, hashpassword],
        (error, results, fields) => {
          if (error) {
            console.error("Error creating user:", error);
            return res.status(404).send("Internal Server Error");
          }

          const userId = results.insertId;

          const token = jwt.sign({ user_id: userId }, process.env.JWT_SECRET);

          res.cookie("token", token, {
            httpOnly: true,
            expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
          });

          res.status(200).json({ message: `New user created ${req.body.name}` });
        }
      );
    }
  );
};


export const usersignout = (req, res) => {
  res.cookie("token", null, {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(200).json({ message: "Signed out" });
};

export const userDetail = (req, res) => {
  const { token } = req.cookies;
  if(!token){
    res.status(404).send("Not found")
  }
  res.send("token found");
};

