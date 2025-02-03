import express from "express";
import { LogInUser } from "../controllers/firebase-auth-controller.js";
import { CheckIdToken } from './Auth.js'
const LogIn = express();
//  email: 'user@user.it', password: 'password'
LogIn.post("/log-in", async (req, res) => {
  console.log(req.body)

  const email = req.body.email;
  const password = req.body.password;

  if (!email) return res.status(400).send("Bad Request, need email")
  if (!password) return res.status(400).send("Bad Request, need password")

  const [IdToken, errorCode] = await LogInUser(email, password);

  await IdToken
  await errorCode
  console.log([IdToken, errorCode])

  if (errorCode) {
    console.error(`[ERR] LogIn -> post -> /log-in -> LogInUser : ${errorCode}`)
    res.status(500).json({error:`${errorCode}`})
    return
  }
  
  res.status(200).json({token: IdToken})
  CheckIdToken(IdToken)
});

export default LogIn;