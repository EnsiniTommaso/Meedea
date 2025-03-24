import mongoose from "mongoose";

import user from "./models/user.js";
import notice from "./models/notice.js";
import comment from "./models/comment.js";
import channel from "./models/channel.js";
import discussion from "./models/discussion.js";

import "dotenv/config";

const uri = process.env.mongo_connect_string;

mongoose.connect(process.env.mongo_connect_string);

// get unread notices of a user
export async function unreadnotices(userID) {
  var res = await notice.find({ userID: userID, read: false });
  return res.toJSON();
}

// get all channels a user did not join
export async function channels(userID) {
  var db_user = await user.findById(userID);
  var channels = db_user.joinedchannelsIDs;
  const res = await channel.find({ _id: { $nin: channels } });
  return res.toJSON() ;
}

// get all channels a user joined
export async function joinedchannels(userID) {
  var db_user = await user.findById(userID);
  var channels = db_user.joinedchannelsIDs;
  const res = await channel.find({ _id: { $in: channels } });
  return res;
}

// get discussions of a channel
export async function discussions(channelID) {
  var res = await discussion.find({ channelID: channelID });
  return res;
}

// get comments of a discussion
export async function comments(discussionID) {
  var res = await comment.find({ discussionID: discussionID });
  return res;
}

// create new channel
export async function newchannel(userID, topic, name) {
  var channels = await channel.find();

  var names = [x[""]];
  const newChannel = new channel({
    name: name,
    topic: topic,
    creatorID: userID,
  });
  await newChannel.save();
}

// start new conversation
export async function startconversation() {}

// post comment
export async function postcomment(
  discussionID,
  content,
  answerToComment,
  userID
) {
  const newComment = new Comment({
    discussionID: discussionID,
    content: content,
    answerToComment: answerToComment,
    posterID: userID,
  });
  await newComment.save();
}

// add new unread notice to user
export async function addnotice(content, userID) {
  const newNotice = new notice({
    content: content,
    userID: userID,
  });
  await newNotice.save();
}

// create new user
export async function newuser(name, email, firebaseID) {
  const newuser = new user({
    firebaseID: firebaseID,
    name: name,
    email: email,
  });
  await newuser.save();
}
