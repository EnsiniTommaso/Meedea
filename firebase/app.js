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
  console.log(1, req.body);

  if (!req.body.email || !req.body.password) return res.status(400);

  const [answer, error] = await LogInUser(req.body.email, req.body.password);

  if (await error) {
    console.error(2, error);
    return res.status(400).send({ error: error });
  } else {
    console.log("uid:", answer.uid);
    res.send(await answer);
  }
});

app.post("/sign-in", async (req, res) => {
  console.log(1, req.body);

  if (!req.body.email || !req.body.password) return res.status(400);

  const [answer, error] = await CreateNewUser(
    req.body.email,
    req.body.password
  );

  if (await error) {
    console.error(2, error);
    return res.status(400).send({ error: error });
  } else {
    console.log(answer);

    res.send({ uid: answer.uid });
  }
});

app.listen(process.env.PORT, () =>
  console.log("listening on port", process.env.PORT)
);
