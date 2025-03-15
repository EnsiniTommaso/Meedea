import express from "express";
import { conversations } from "./database.js";
import 'dotenv/config'
const app = express();

// get unread notices of a user
app.get("/notices", () => {});

// get n channels with m offset
app.post("/channels", () => {});

// get n conversations with m offset in channel
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
