import React, { useState } from "react";
import axios from "axios"
export const Login = () => {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");

  const loginSubmission = async(e) => {
    e.preventDefault()
    try {
        await axios.post("http://localhost:5001/todos",(username, password))
    } catch (error) {
        console.log(error)
    }
  }
  return (
    <div>
      <form action="POST">
        <label htmlFor="username">Username:</label>
        <br />
        <input type="text" id="username" name="username" onChange={(e)=>setusername(e.target.value)} required />
        <br />
        <label htmlFor="password">Password:</label>
        <br />
        <input type="password" id="password" name="password" onChange={(e)=>setPassword(e.target.value)} required />
        <br />
        <input type="submit" onClick={loginSubmission} value="Login" />
      </form>
    </div>
  );
};
