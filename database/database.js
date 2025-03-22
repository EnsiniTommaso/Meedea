import mongoose from "mongoose";
import user from './models/user.js'
import notice from "./models/notice.js";
import 'dotenv/config'
const uri = process.env.mongo_connect_string;

mongoose.connect(process.env.mongo_connect_string);


// get unread notices of a user
export async function  notices (){}

// get channels
export async function  channels (){}

// get conversations of a channel
export async function  conversations (){}

// get comments of a conversation
export async function  comments (){}

// create new channel
export async function  newchannel (){}

// start new conversation
export async function startconversation (){}

// post comment
export async function postcomment(discussionID, content, answerToComment, posterID) {
  const newComment = new notice({
    discussionID: discussionID,
    content: content,
    answerToComment: answerToComment,
    posterID: posterID
  });
  await newComment.save();
}

// add new unread notice to user
export async function  addnotice (content, userID){
  const newComment = new notice({
    content: content,
    userID: userID,
  });
  await newNotice.save();
}

export async function  test(){

    // Use connect method to connect to the server
    await client.connect();
    console.log("Connected successfully to server");
    const db = client.db(process.env.mongo_database);
    const collection = db.collection("documents");
    
    
    
    var newuser = new user({
      name:'mario giordano',
      email:'mario@giordano.gg'
    })

    await newuser.save()


    // the following code examples can be pasted here...

    return "done.";
  
}



