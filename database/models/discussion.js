import { Timestamp } from "mongodb";
import mongoose from "mongoose";
const { Schema } = mongoose;

const discussion = new Schema({
  channelID: String,
  title: String,
  text: String,
  posterID: String,
});
export default mongoose.model("discussion", discussion);