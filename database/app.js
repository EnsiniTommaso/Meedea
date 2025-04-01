import express from "express";
import * as db from "./database.js";
import "dotenv/config";
import notice from "./models/notice.js";
import user from "./models/user.js";

const app = express();

app.use((req, res, next) => {
  console.log(req.path);
  return next();
});

app.get("/", (req, res) => {
  test().then(console.log).catch(console.error);
});

// get unread notices of a user
app.post("/notices", async (req, res) => {
  var userID = req.userID;
  var notices = await db.unreadnotices(userID);
  res.json(notices);
});

// get all channels a user didn't join
app.post("/channels", async (req, res) => {
  var userID = req.body.userID;
  var answ;
  try {
    answ = await db.channels(userID);
    res.status(200).json({ channels: answ });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// get all channels a user joined
app.post("/joinedchannels", async (req, res) => {});

// get discussions of a channel
app.post("/discussions", async (req,res) => {});

// get comments of a discussion
app.post("/comments", async (req,res) => {});

// create new channel
app.post("/newchannel", async (req,res) => {});

// start new discussion
app.post("/startdiscussion", async (req,res) => {});

// post comment
app.post("/postcomment", async (req,res) => {});

// add new unread notice to user
app.post("/addnotice", async (req,res) => {});

// add new unread notice to user
app.post("/addnotice", async (req,res) => {});

//get user by firebase id

app.listen(process.env.PORT, "0.0.0.0", async (req,res) =>
  console.log("database listening at", process.env.PORT)
);
