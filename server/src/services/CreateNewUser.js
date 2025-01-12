import express from "express";
import { CreateNewUser } from "../controllers/firebase-auth-controller.js";
import QueryDB from "../controllers/database-controller.js";

const createNewUser = express();

createNewUser.post("/sign-in", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;

  if (!email) return res.status(400).json("Bad Request, need email");
  if (!password) return res.status(400).json("Bad Request, need password");
  if (!username) return res.status(400).json("Bad Request, need username");

  const [user, errorCode] = await CreateNewUser(email, password);

  if (errorCode) {
    res.status(500).json(`${errorCode}`);
    return;
  }

  QueryDB(`insert into users (userName) values (${username});`)
    .then(() => {
      res.status(201).json("User Created Sucsessfully");
    })
    .catch((err) => {
      console.error(err)
      res.status(500).json("internal server error");
    });
});

export default createNewUser;
