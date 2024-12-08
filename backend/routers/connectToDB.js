import mysql2 from "mysql2"
import db_keys from "../database_keys.json" with { type:"json"}

function ConnectToDB(){
  const connection = mysql2.createConnection({
    host: db_keys.host,
    user: db_keys.user,
    password: db_keys.password
  })
  connection.connect((err)=>{
    if (err) throw err
    console.log('Connected!')
  })
  return connection
}


export default ConnectToDB