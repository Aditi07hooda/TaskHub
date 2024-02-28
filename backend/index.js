import express from "express";
import { connection } from "./config/databaseConnection.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import user from "./Routes/Users.js";
import task from "./Routes/Task.js";
import event from "./Routes/Event.js"
import project from "./Routes/Project.js";

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
    origin: 'http://localhost:5173',
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],
  })
);
app.options('*', cors());
app.use(user);
app.use(task);
app.use(event);
app.use(project);

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
