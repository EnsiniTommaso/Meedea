import mysql2 from "mysql2";
import databaseConfig from "../config/database.js";

const connection = mysql2.createConnection(databaseConfig);

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
});

async function QueryDB(queryText) {
  try {
    const [results, fields] = await this.connection.promise().query(queryText);
    return [results, fields, error];
  } catch (err) {
    throw [null, null, `[${err.code}] ${err.sqlMessage}`];
  }
}

export default QueryDB;
