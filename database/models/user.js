import { Timestamp } from "mongodb";
import mongoose from "mongoose";
const { Schema } = mongoose;

const user = new Schema({
  name: String,
  email: String,
});
export default mongoose.model("user", user);