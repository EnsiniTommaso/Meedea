import express from "express";
import { QueryDB } from "../controllers/database-controller.js";
const queryTheDatabase = express();

queryTheDatabase.post("/query-db", async (req, res) => {
  QueryDB("SELECT CURRENT_USER();")
    .then((results) => {
      res.status(200).json(results);
    })
    .catch((err) => {
      console.error(`[ERR] QueryTheDB: ${err}`)
      res.status(500).json({ error: toString(err) })
    });
});

export default queryTheDatabase;
