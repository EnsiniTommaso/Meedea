import express from "express";
import { run,test } from "./database.js";
import 'dotenv/config'

const app = express();

app.use((req,res,next)=>{
  console.log(req.path)
  return next()
})

app.get('/',(req,res)=>{
  test().then(console.log)
  .catch(console.error)
  
})

// get unread notices of a user
app.get("/notices", () => {});

// get channels
app.post("/channels", () => {});

// get conversations of a channel
app.post("/conversations", () => {});

// get comments of a conversation
app.post("/comments", () => {});

// create new channel
app.post("/newchannel", () => {});

// start new conversation
app.post("/startconversation", () => {});

// post comment
app.post("/postcomment", () => {});

// add new unread notice to user
app.post("/addnotice", () => {});

app.listen(process.env.PORT , "0.0.0.0", () => console.log("channels listening at",process.env.PORT));
