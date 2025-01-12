import express from "express";
import { CreateNewUser } from "../controllers/firebase-auth-controller.js";

const createNewUser = express();

createNewUser.post("/sign-in", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email) return res.status(400).send("Bad Request, need email");
  if (!password) return res.status(400).send("Bad Request, need email");

  const [user, errorCode] = await CreateNewUser(email, password);

  if (errorCode) res.status(500).send(`${errorCode}`);
  else res.status(201).send("User Created Sucsessfully");
});

export default createNewUser;
