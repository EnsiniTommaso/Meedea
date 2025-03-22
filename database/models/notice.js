import { Timestamp } from "mongodb";
import mongoose from "mongoose";
const { Schema } = mongoose;

const notice = new Schema({
  content: String,
  userID: String,
  read:{
    type:Boolean,
    default: false
  },
  time: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("notice", notice);