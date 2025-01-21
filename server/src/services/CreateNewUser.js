import express from "express";
import { CreateNewUser } from "../controllers/firebase-auth-controller.js";
import { AddUserWithUserName } from "../controllers/database-controller.js";

const createNewUser = express();

createNewUser.post("/sign-in", async (req, res) => {
  console.log(req.body)

  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;


  if (!email) return res.status(400).send("Bad Request, need email")
  if (!password) return res.status(400).send("Bad Request, need password")
  if (!username) return res.status(400).send("Bad Request, need username")

  const [user, errorCode] = await CreateNewUser(email, password);

  if (errorCode) {
    console.error(`[ERR] createNewUser -> post -> /sign-in -> CreateNewUser : ${errorCode}`)
    res.status(500).json({error:`${errorCode}`})
    return
  }

  AddUserWithUserName(username)
  .then(() => {
    res.status(201).send("User Created Sucsessfully")
  })
  .catch((err) => {
    console.error(`[ERR] createNewUser -> post -> /sign-in -> AddUserWithUserName : ${err}`)
    res.status(500).json({error:"internal server error"})
  })
});

export default createNewUser;
