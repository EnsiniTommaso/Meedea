import express  from "express" 
import bodyParser from "body-parser"
import ConnectToDB from "./connectToDB.js"

const db_manager = express.Router();

db_manager.use(bodyParser.json())
db_manager.use(bodyParser.urlencoded({extended: true}))

// CONNECTION TO DB
const connection = ConnectToDB();


db_manager.post("/dumb-query", async (req,res)=>{
  var queryText = req.body.inputText; 
  console.log(queryText)

  var db_response = await DumbQuery(queryText)

  var answ = db_response[0];

  var answJson = { data: answ }

  console.log(answJson)

  res.send(answJson)
})

// Unfiltered query, returns what the query would return 

async function DumbQuery (queryText){
  try {
    return await connection.promise().query(queryText)
  } catch (err) {
    console.log(err);
    return ["error", null]
  }
}

export default db_manager