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
app.post("/joined-channels", (req, res) => {});

// get discussions of a channel
app.post("/discussions", () => {});

// get comments of a discussion
app.post("/comments", () => {});

// create new channel
app.post("/newchannel", () => {});

// start new discussion
app.post("/startdiscussion", () => {});

// post comment
app.post("/postcomment", () => {});

// add new unread notice to user
app.post("/addnotice", () => {});

app.listen(process.env.PORT, "0.0.0.0", () =>
  console.log("channels listening at", process.env.PORT)
);
