import mysql from "mysql2";

export const connection = mysql.createConnection({
  host: "localhost",
  user: "Aditi",
  password: "Aditi@07hooda",
  database: "TaskHub",
});
