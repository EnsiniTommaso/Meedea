import express from "express";
import { QueryDB } from "./database.js";

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

app.listen(7000, "0.0.0.0", () => console.log("channels listening at 7000"));
