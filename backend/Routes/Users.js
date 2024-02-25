import express from "express";
import {
  userDetail,
  usersignin,
  usersignout,
  usersignup,
} from "../controller/Usercontroller.js";
import userValidation from "../middlewares/userAuthentication.js";

const router = express.Router();

router.post("/signup", userValidation, usersignup);

router.post("/signin", userValidation, usersignin);

router.get("/signout", usersignout);

router.get("/me",userDetail)

export default router;
