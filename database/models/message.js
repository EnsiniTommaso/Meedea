import { Timestamp } from "mongodb";
import mongoose from "mongoose";
const { Schema } = mongoose;

const message = new Schema({
  content: String,
  senderID: String,
  channelID: String,
  time: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("message", message);