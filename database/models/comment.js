import { Timestamp } from "mongodb";
import mongoose from "mongoose";
const { Schema } = mongoose;

const comment = new Schema({
  discussionID: String,
  content: String,
  answerToComment: String,
  time: {
    type: Date,
    default: Date.now(),
  },
  posterID: String,
});

export default mongoose.model("comment", comment);