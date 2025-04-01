import express from "express";
import "dotenv/config";
import { CreateNewUser, LogInUser } from "./firebase.js";
import bodyParser from "body-parser";
const app = express();

app.use((req, res, next) => {
  console.log(req.path);
  return next();
});

app.use(bodyParser.json());

app.post("/log-in", async (req, res) => {
  console.log(req.body);
  if (!req.body.email || !req.body.password) return res.status(400);
  const [answer, errorCode] = await LogInUser(
    req.body.email,
    req.body.password
  );
  
  if (await errorCode) return res.status(400).send({ error: errorCode });
  res.send(await answer);
});

app.listen(process.env.PORT, () =>
  console.log("listening on port", process.env.PORT)
);
