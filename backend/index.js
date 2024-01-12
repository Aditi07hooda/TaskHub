import express from 'express'
import task from "./Routes/Task.js"
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(task)

app.listen(5001,()=>{
    console.log("server started on 5001")
})