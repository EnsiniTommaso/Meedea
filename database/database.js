import mysql2 from "mysql2";
import "dotenv/config";

if (!process.env.MODE) console.error("[ERROR] .env not found");
else console.log(process.env.MODE);

const db_config = {
  user: process.env.db_user,
  password: process.env.db_password,
  database: process.env.db_database,
  host: process.env.db_host,
};



// get unread notices of a user
async function notices(user) {

  const connection = mysql2.createConnection(db_config);

  connection.connect((err) => {
    if (err) console.error(`[${err.code}] ${err.message}`);
    else console.log("Connected!");
  });

  try {
    const [results, fields] = await connection
      .promise()
      .query(`select * from notices where username = ${user} and read = false`);

    var answ = {
      results,
    };
  } catch (err) {
    connection.end()
    throw `${err.code}, ${err.message}`;
  }
  connection.end()
}

// get n channels with m offset
async function channels(limit, offset) {
  
  const connection = mysql2.createConnection(db_config);

  connection.connect((err) => {
    if (err) console.error(`[${err.code}] ${err.message}`);
    else console.log("Connected!");
  });

  try {
    const [results, fields] = await connection
      .promise()
      .query(
        `SELECT * FROM channels ORDER BY channelid LIMIT ${limit} OFFSET ${offset}`
      );
    var answ = {
      results,
    };
  } catch (error) {
    connection.end()
    return [null, `[${error.code}] ${error.message}`];
  }
  connection.end()
}

// get n conversations with m offset in channel
async function conversations(channelid, limit, offset) {
  
  const connection = mysql2.createConnection(db_config);

  connection.connect((err) => {
    if (err) console.error(`[${err.code}] ${err.message}`);
    else console.log("Connected!");
  });

  try {
    const [results, fields] = await connection
      .promise()
      .query(
        `SELECT * FROM conversations  ORDER BY conversationsid where channelid = ${channelid} LIMIT ${limit} OFFSET ${offset}`
      );
    var answ = { results };
  } catch (error) {
    connection.end()
    return [null, `[${error.code}] ${error.message}`];
  }
  connection.end()
}

// get comments of a conversation
async function comments() {


  const connection = mysql2.createConnection(db_config);

  connection.connect((err) => {
    if (err) console.error(`[${err.code}] ${err.message}`);
    else console.log("Connected!");
  });


  try {
    const [results, fields] = await connection
      .promise()
      .query(
        `SELECT * FROM comments  ORDER BY commentid where conversationid = ${channelid} LIMIT ${limit} OFFSET ${offset}`
      );
    var answ = { results };
  } catch (error) {
    connection.end()
    return [null, `[${error.code}] ${error.message}`];
  }
  connection.end()
}

// create new channel
async function newchannel(user, name, topic) {}

// start new conversation
async function startconversation(channel, title, text, user) {}

// post comment
async function postcomment(conversation, answertocomment, content) {}

// add new unread notice to user
async function addnotice(user, body){

}

// set user notices as read
async function readnotices(user, body){

}
export { notices, channels, conversations, comments, newchannel, startconversation, postcomment, addnotice, readnotices }
