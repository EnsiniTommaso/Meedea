import express from "express";
import QueryDB from "../controllers/database-controller.js";
const queryTheDatabase = express();

queryTheDatabase.post("/query-db", async (req, res) => {
  console.log(req.body);

  QueryDB("SELECT CURRENT_USER();")
    .then(([results, fields, error]) => {
      if (error) return;
      console.log(answ);
      res.json(results);
    })
    .catch((err) => {
      console.log(err);
      res.json({ error: toString(err) });
    });
});

export default queryTheDatabase;
