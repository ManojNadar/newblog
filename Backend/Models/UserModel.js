import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["Admin", "User"],
  },
  bookmarks: {
    type: [String],
  },
  isLiked: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("Users", userSchema);
