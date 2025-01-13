import mysql2 from "mysql2";
import databaseConfig from "../config/database.js";

const connection = mysql2.createConnection(databaseConfig);

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
});

async function QueryDB(queryText) {
  try {
    const [results, fields] = await connection.promise().query(queryText);
    return [results, fields, error];
  } catch (err) {
    throw [null, null, `[${err.code}] ${err.sqlMessage}`];
  }
}

async function QueryNChannelsWithOffset(limit, offset){
  connection.query(`SELECT channelname, channelid FROM channels  ORDER BY channelid LIMIT ${limit} OFFSET ${offset}`)
}


export {QueryNChannelsWithOffset, QueryDB};
