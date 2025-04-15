import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import "dotenv/config";
import auth from "./auth.js";
//istanziazione del microframework express
const app = express();
const nip = "0.0.0.0";
app.use((req, res, next) => {
  console.log(req.path, req.ip);
  return next();
});
//app.use(auth);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  return next();
});

app.use(bodyParser.json());

console.log("mode:", process.env.MODE);

app.get("/", async (req, res) => {
  res.status("404");
});

app.get("/channels", async (req, res) => {
  if (!user_id) return res.status(400).send("missing user-db-id");

  var channels = await axios.post(`${process.env.database_addr}/channels`);

  if (channels) res.status(200).json(channels);
});

app.get("/chantest", (req, res) => {
  res.json([
    {
      id: 1,
      name: "Canale Tech",
      description: "Questo canale offre contenuti educativi e tutorial.",
    },
    {
      id: 2,
      name: "Canale Musica",
      description:
        "Un canale per gli appassionati di musica e live performance.",
    },
    {
      id: 3,
      name: "Canale Viaggi",
      description: "Scopri destinazioni e culture da tutto il mondo.",
    },
  ]);
});

app.post("/log-in", async (req, res) => {
  var loginres = {};

  if (!req.body.password || !req.body.email)
    return res.status(400).json({ error: "missing log in data" });

  console.log(1, req.body);

  var login;

  try {
    var login = await axios.post(`${process.env.firebase_addr}/log-in`, {
      email: req.body.email,
      password: req.body.password,
    });
  } catch (err) {
    console.error(3, err);
    return res.status(400).send({ error: err.code });
  }

  if (login.error) return res.status(400).send({ error: login.error });

  loginres["id_token"] = login.data["id_token"];
  loginres["uid"] = login.data["uid"];

  try {
    login = await axios.post(`${process.env.database_addr}/user`, {
      uid: loginres.uid,
    });
  } catch (err) {
    console.error(4, err);
    return res.status(400).send({ error: err.code });
  }

  if (login.error) return res.status(400).send({ error: login.error });
  if (!login.data) return res.status(500).json({ error: "user not found" });
  loginres["user"] = login.data;
  console.log('gone well');
  res.json(loginres);
});

app.post("/sign-in", async (req, res) => {
  console.log(1);
  var answ = {};

  if (!req.body.password || !req.body.email || !req.body.username)
    return res.status(400).json({ error: "missing sign-in data" });

  console.log(2);

  var signin;

  try {
    signin = await axios.post(`${process.env.firebase_addr}/sign-in`, {
      email: req.body.email,
      password: req.body.password,
    });
  } catch (err) {
    console.log(err);
    return res.status(500);
  }

  console.log(3, signin.data.uid);

  if (!signin.data.uid) return res.status(500);

  var uid = signin.data.uid;

  console.log(4, uid);

  try {
    signin = await axios.post(`${process.env.database_addr}/newuser`, {
      name: req.body.username,
      email: req.body.email,
      uid: uid,
    });
    console.log(5, "done", signin);
    res.status(201).send(signin.data);
  } catch (err) {
    console.log(err);
    return res.status(500);
  }
});

app.listen(process.env.PORT, nip, () => {
  console.log(`Gateway running at port ${process.env.PORT}`);
});
