import express from "express";
import * as db from "./database.js";
import "dotenv/config";
import notice from "./models/notice.js";
import user from "./models/user.js";
import bodyParser from "body-parser";

const app = express();

//app.use((req, res, next) => {   console.log(req.path);   return next(); });

app.use(bodyParser.json());
app.use((req,res,next)=>{
  console.log(req.path)
  return next()
})
app.get("/", (req, res) => {
  res.json({ error: "blyat" });
});

// get all channels
app.post("/channels", async (req, res) => {
  var answ;
  try {
    answ = await db.channels();
    res.status(200).json({ channels: answ });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// create new channel
app.post("/newchannel", async (req, res) => {});

//get user by firebase id
app.post("/user", async (req, res) => {

  console.log(req.body)

  if (!req.body.uid) return res.status(400).json({ error: "missing uid" });

  console.log(req.body);

  var uid = req.body.uid;
  var answ = await db.userByFbUid(uid);

  console.log("answ:", answ);

  res.json({ user: answ });
});

app.post("/newuser", async (req, res) => {
  if (!req.body.uid || !req.body.email || !req.body.name)
    return res.status(400);

  var answ = await db.newuser(req.body.name, req.body.email, req.body.uid);
  console.log("created successfully\n\n", answ);
  res.json({ user: answ });
});

app.listen(process.env.PORT, "0.0.0.0", async (req, res) =>
  console.log("database listening at", process.env.PORT)
);
