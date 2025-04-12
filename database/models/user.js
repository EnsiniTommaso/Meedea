import mongoose from "mongoose";
const { Schema } = mongoose;

const user = new Schema({
  fbUid: String,
  name: String,
  email: String,
  joinedchannelsIDs: [String],
});
export default mongoose.model("user", user);
