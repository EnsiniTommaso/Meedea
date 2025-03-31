import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import "dotenv/config";
import auth from "./auth.js";
//istanziazione del microframework express
const app = express();
const nip = "0.0.0.0";

app.use(auth);
app.use(bodyParser.json());

console.log("mode:", process.env.MODE);

app.get("/", async (req, res) => {
  res.status("404");
});

app.get("/channels", async (req, res) => {
  console.log("hasta la vittoria siempre");

  var user_id = req.get("user-db-id");

  if (!user_id) return res.status(400).statusMessage("user-db-id");

  var channels = await axios.post("http://localhost:4040/channels", {
    userID: user_id,
  });
  if (channels) res.status(200).json(channels);
});

app.post("/log-in", async (req, res) => {
  if (!req.body.password || !req.body.email) return res.status(400);
  console.log(req.body);

  try {
    var login = await axios.post("http://localhost:7070/log-in", {
      email: req.body.email,
      password: req.body.password,
    });

    if (login.error) return res.status(400).send({ error: login.error });

    res.send(login.data);
  } catch (err) {
    console.error(err.code);
    return res.status(400).send({ error: "error" });
  }
});

app.listen(process.env.PORT, nip, () => {
  console.log(`Gateway running at port ${process.env.PORT}`);
});
