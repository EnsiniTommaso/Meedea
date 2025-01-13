import mysql2 from "mysql2";
import databaseConfig from "../config/database.js";

const connection = mysql2.createConnection(databaseConfig);

connection.connect((err) => {
  if (err) 
    console.error(`[${err.code}] ${err.message}`)
  else
    console.log('Connected!')
});

async function QueryDB(queryText) {
  try {
    const [results, fields] = await connection.promise().query(queryText);
    return [results, fields, null];
  } catch (err) {
    return [null, null, `[${err.code}] ${err.sqlMessage}`];
  }
}

async function QueryNChannelsWithOffset(limit, offset){
  try{
    const [results, fields] = await connection.promise().query(`SELECT channelname, channelid FROM channels  ORDER BY channelid LIMIT ${limit} OFFSET ${offset}`)
    return [ results, null ]
  } catch (error){
    return [null, `[${error.code}] ${error.sqlMessage}` ]
  }
}

async function AddUserWithUserName(username){
  try {
    const [results, fields] = await connection.promise().query( `insert into users (userName) values (${username});`)
    return null
  } catch (err) {
    return `${err.code}`
  }
}


export {QueryNChannelsWithOffset, QueryDB, AddUserWithUserName};
