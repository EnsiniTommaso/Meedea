import express from "express";
import bodyParser, { json } from "body-parser";
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

  if (!user_id) return res.status(400).send("missing user-db-id");

  var channels = await axios.post(`${process.env.database_addr}/channels`, {
    userID: user_id,
  });


  if (channels) res.status(200).json(channels);
});

app.post("/log-in", async (req, res) => {

  var response = {}

  if (!req.body.password || !req.body.email || !req.body.username) return res.status(400);
  console.log(req.body);

  try {
    var login = await axios.post(`${process.env.firebase_addr}/log-in`, {
      email: req.body.email,
      password: req.body.password,
    });

    if (login.error) return res.status(400).send({ error: login.error });

    answ['id-token']=login.data.idtoken;
    answ['uid']=login.data.uid
  } catch (err) {
    console.error(err.code);
    return res.status(400).send({ error: err.code });
  }

  try {
    var login = await axios.post(`${process.env.database_addr}/user`, {
      email: req.body.email,
      password: req.body.password,
    });

    if (login.error) return res.status(400).send({ error: login.error });

    answ["id-token"] = login.data;
  } catch (err) {
    console.error(err.code);
    return res.status(400).send({ error: err.code });
  }



});

app.listen(process.env.PORT, nip, () => {
  console.log(`Gateway running at port ${process.env.PORT}`);
});
