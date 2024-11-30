import mysql from "mysql"
import db_keys from "../database_keys.json" assert { type:"json"}
import express  from "express" 

const db_manager = express.Router();

const connection = mysql.createConnection({
  host: db_keys.host,
  user: db_keys.user,
});

db_manager.post("/query-test", (req,res)=>{
  console.log(req)
  console.log(req.body)
  res.send(QueryTest(req.body))
})

async function QueryTest (queryText){

  try {
    const [results, fields] = await connection.query(
      queryText
    );
  
    console.log(results); // results contains rows returned by server
    console.log(fields); // fields contains extra meta data about results, if available

    return "all good"
  } catch (err) {
    console.log(err);
    return "error"
  }
}

export default db_manager