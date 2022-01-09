import mongoose, { Schema } from "mongoose";

const ArticleSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  subtitle: {
    type: String,
  },

  content: {
    type: String,
    required: true,
  },

  author: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },

  link: {
    type: String,
  },

  show: {
    type: Boolean,
    default: true,
  },

  likes: {
    type: Number,
    default: 0,
  },
});

export default mongoose.models.Article || mongoose.model("Article", ArticleSchema);
