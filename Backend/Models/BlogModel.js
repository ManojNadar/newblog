import mongoose, { Schema } from "mongoose";

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    categories: {
      type: String,
    },
    date: {
      type: Date,
      default: new Date(),
      required: true,
    },
    comments: {
      type: [Object],
    },
  }
  // { timestamps: true }
);

export default mongoose.model("Blogs", blogSchema);
