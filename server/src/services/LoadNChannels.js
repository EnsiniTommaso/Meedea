import express from "express";
import { QueryDB } from "../controllers/database-controller.js";
const loadNChannels = express();

loadNChannels.post("/load-n-channels", async (req, res) => {
  if (!req.body.RequestedNumber) {
    res.status(400).json("need 'RequestedNumber'");
    return;
  }
  if (!req.body.AlreadyLoadedNumber) {
    res.status(400).json("need 'AlreadyLoadedNumber'");
    return;
  }

  QueryDB(
    `SELECT channelname, channelid FROM channels  ORDER BY channelid LIMIT ${req.body.RequestedNumber} OFFSET ${req.body.AlreadyLoadedNumber} `
  )
    .then((answ) => {
      console.log(answ);
      res.status(200).json(answ[0]);
    })
    .catch((err) => {
      console.error(err.sqlMessage);
      res.status(500).json(toString(err));
    });
});

export default loadNChannels;
