import express from "express";
import task from "./Routes/Task.js";
import user from "./Routes/Users.js";
import { connection } from "./config/databaseConnection.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  import("dotenv").then((dotenv) => {
    dotenv.config({ path: "config/config.env" });
  });
}

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(task);
app.use(user);

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL database:", err);
  } else {
    console.log("Connected to MySQL database");
  }
});

app.listen(5001, () => {
  console.log("server started on 5001");
});
