import mysql2 from "mysql2";
import "dotenv/config";

if (!process.env.MODE) console.error("[ERROR] .env not found");
else console.log(process.env.MODE);

const db_config = {
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
  host: process.env.host,
};

const connection = mysql2.createConnection(db_config);

connection.connect((err) => {
  if (err) console.error(`[${err.code}] ${err.message}`);
  else console.log("Connected!");
});

// get unread notices of a user
async function notices(user) {
  try {
    const [results, fields] = await connection
      .promise()
      .query(`select * from notices where username = ${user} and read = false`);

    var answ = {
      results,
    };
  } catch (err) {
    throw `${err.code}, ${err.message}`;
  }
}

// get n channels with m offset
async function channels(limit, offset) {
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
    return [null, `[${error.code}] ${error.message}`];
  }
}

// get n conversations with m offset in channel
async function conversations(channelid, limit, offset) {
  try {
    const [results, fields] = await connection
      .promise()
      .query(
        `SELECT * FROM conversations  ORDER BY conversationsid where channelid = ${channelid} LIMIT ${limit} OFFSET ${offset}`
      );
    var answ = { results };
  } catch (error) {
    return [null, `[${error.code}] ${error.message}`];
  }
}

// get comments of a conversation
async function comments() {
  try {
    const [results, fields] = await connection
      .promise()
      .query(
        `SELECT * FROM comments  ORDER BY commentid where conversationid = ${channelid} LIMIT ${limit} OFFSET ${offset}`
      );
    var answ = { results };
  } catch (error) {
    return [null, `[${error.code}] ${error.message}`];
  }
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
