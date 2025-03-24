import { Timestamp } from "mongodb";
import mongoose from "mongoose";
const { Schema } = mongoose;

const channel = new Schema({
  name: String,
  topic: String,
  creatorID: String,
  userCount: {
    type: Number,
    default: 1,
  },
});

export default mongoose.model("channel", channel);
