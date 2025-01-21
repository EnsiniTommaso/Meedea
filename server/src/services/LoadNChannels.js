import express from "express";
import { QueryNChannelsWithOffset } from "../controllers/database-controller.js";
const loadNChannels = express();

loadNChannels.post("/load-n-channels", async (req, res) => {
  var RequestedNumber = req.body.RequestedNumber
  var AlreadyLoadedNumber = req.body.AlreadyLoadedNumber

  if (!RequestedNumber) {
    res.status(400).json({error:"need 'RequestedNumber'"});
    return;
  }

  if (!AlreadyLoadedNumber) {
    res.status(400).json({error:"need 'AlreadyLoadedNumber'"});
    return;
  }

  QueryNChannelsWithOffset(RequestedNumber, AlreadyLoadedNumber)
  .then((results) => {
    res.status(200).json(results)
  })
  .catch((err) => {
    console.error(`[ERR] LoadNchannels : ${err}`)
    res.status(500).json( {error: err } )
  })
});

export default loadNChannels;
