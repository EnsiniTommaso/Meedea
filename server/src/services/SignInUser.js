import firebaseController from "../controllers/firebase-controller.js";
import express from "express";
const signInUser = express();

signInUser.get("/sign-in", (req, res) => {

  var url = new URL("localhost:5000" + req.originalUrl);

  const email = url.searchParams.get("email");
  const password = url.searchParams.get("password");

  if (!email) {res.status(400).send("need email"); return}
  if (!password) {res.status(400).send("need password"); return}

  try {
    firebaseController.SignInNewUser(email, password);
    res.status(200);
  } catch {
    res.status(500).send("internal server error");
  }
});

export default signInUser;
