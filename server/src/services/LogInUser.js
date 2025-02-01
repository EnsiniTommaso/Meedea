import express from "express";
import { LogInUser } from "../controllers/firebase-auth-controller.js";

const logInUser = express();

logInUser.post("/log-in", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email) return res.status(400).json("Bad Request, need email");
  if (!password) return res.status(400).json("Bad Request, need email");

  LogInUser(email, password).then(([user, errorCode]) => {
    if (errorCode) res.status(500).json(`${errorCode}`);
    else res.status(200).json("User Logged In Sucsessfully");
  });
});

export default logInUser;


