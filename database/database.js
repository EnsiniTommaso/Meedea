import mongoose from "mongoose";

import user from "./models/user.js";
import notice from "./models/notice.js";
import comment from "./models/comment.js";
import channel from "./models/channel.js";
import discussion from "./models/discussion.js";
import message from "./models/message.js";

import "dotenv/config";

const uri = process.env.mongo_connect_string;

mongoose.connect(process.env.mongo_connect_string);

console.log("connected");
// get unread notices of a user
export async function unreadnotices(userID) {
  var res = await notice.find({ userID: userID, read: false });
  return res;
}

// get all channels
export async function channels(userID) {
  const res = await channel.find();
  return res;
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

  channels.forEach((channel) => {
    if (channel.name == name) throw new Error("channel name used already");
  });

  const newChannel = new channel({
    name: name,
    topic: topic,
    creatorID: userID,
  });
  await newChannel.save();
}

// start new discussion
export async function startdiscussion(channelID, title, text, userID) {
  const newDiscussion = new discussion({
    channelID: channelID,
    title: title,
    text: text,
    posterID: userID,
  });
  await newDiscussion.save();
}

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
    answerToComment: answerToComment, // id of the comment you're answering to
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
    fbUid: firebaseID,
    name: name,
    email: email,
    joinedchannelsIDs: [],
  });
  return await newuser.save();
}

// make a user join a channel
export async function join(userID, channelID) {}

//get user through username
export async function userByFbUid(fbUid) {
  var res = await user.find({ fbUid: fbUid });
  return res[0];
}
