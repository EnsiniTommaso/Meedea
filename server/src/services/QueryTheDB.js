import express from "express"
import { databaseController } from '../controllers/database-controller.js'
const queryTheDatabase = express()

queryTheDatabase.post("/query-db", async (req,res)=>{
  console.log(req.body)

  const db = new databaseController()

  db.QueryDB('SELECT CURRENT_USER();')
  .then((answ)=>{
    console.log(answ)
    res.json(answ[0][0])
  })
  .catch((err)=>{
    console.log(err)
    res.json({error: toString(err) })
  })
  
})

export default queryTheDatabase