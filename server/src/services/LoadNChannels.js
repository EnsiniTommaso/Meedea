import express from "express";
import { databaseController } from "../controllers/database-controller.js";
const loadNChannels = express();

loadNChannels.post("/load-n-channels", async (req, res) => {
  const db = new databaseController();

  if (!req.body.RequestedNumber) {res.status(400).send("need email");return}
  if (!req.body.AlreadyLoadedNumber) {res.status(400).send("need email");return}

  db.QueryDB(
    `SELECT channelname, channelid FROM channels SORTBY channelid LIMIT ${req.body.RequestedNumber} OFFSET ${req.body.AlreadyLoadedNumber}`
  )
    .then((answ) => {
      console.log(answ);
      res.json(answ[0]);
    })
    .catch((err) => {
      console.log(err);
      res.json({ error: toString(err) });
    });
});

export default loadNChannels;
