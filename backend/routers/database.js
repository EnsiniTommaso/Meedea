import mysql2 from "mysql2"
import db_keys from "../database_keys.json" with { type:"json"}

function ConnectToDB(){
  const connection = mysql2.createConnection({
    host: db_keys.host,
    user: db_keys.user,
    password: db_keys.password,
    database: "meedea_db"
  })
  connection.connect((err)=>{
    if (err) throw err
    console.log('Connected!')
  })
  return connection
}

async function QueryDB(connection, queryText){
  try {
    const [results, fields] = await connection.promise().query(queryText)
    return [results, fields];
  } catch (err) {
    console.log(err);
    return ["error",err]
  }
}

export { ConnectToDB, QueryDB }