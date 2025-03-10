import mysql2 from "mysql2";

const databaseConfig = {
  host: process.env.db_host,
  user: process.env.db_user,
  password: process.env.db_password,
  database: process.env.db_database
}

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
    return results
  } catch (error) {
   throw `${error.code}`
  }
}

async function QueryNChannelsWithOffset(limit, offset){
  try{
    const [results, fields] = await connection.promise().query(`SELECT channelname, channelid FROM channels  ORDER BY channelid LIMIT ${limit} OFFSET ${offset}`)
    return [ results, null ]
  } catch (error){
    return [null, `[${error.code}] ${error.message}` ]
  }
}

async function AddUserWithUserName(username){
  try {
    const [results, fields] = await connection.promise().query( `insert into users (userName) values ('${username}');`)
    return
  } catch (err) {
    throw `${err.code}, ${err.message}`
  }
}

export {QueryNChannelsWithOffset, QueryDB, AddUserWithUserName};
