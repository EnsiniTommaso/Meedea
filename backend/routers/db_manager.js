import mysql2 from "mysql2"
import db_keys from "../database_keys.json" assert { type:"json"}
import express  from "express" 

const db_manager = express.Router();

const connection = mysql2.createConnection({
  host: db_keys.host,
  user: db_keys.user,
  password: db_keys.password
})

connection.connect((err)=>{
  if (err) throw err
  console.log('Connected!')
})

db_manager.post("/query-test", async (req,res)=>{
  console.log(req.body)
  var answ = { data: await Query(req) }
  console.log(answ);
  res.send(answ)
})

async function Query (queryText){
  
  try {
    const [results, fields] = await connection.promise().query(
      queryText
    );
  
    console.log("res" + results); // results contains rows returned by server
    console.log("fie" + fields); // fields contains extra meta data about results, if available

    return results
  } catch (err) {
    console.log(err);
    return "error"
  }
}

export default db_manager