import mongoose, { Schema } from "mongoose";

const ArticlesLiked = new Schema({
  articleId: { type: Schema.Types.ObjectId, ref: "Article" },

  date: {
    type: Date,
    default: Date.now,
  },
});

const IpUsersSchema = new Schema({
  ipv4: {
    type: String,
  },

  country: {
    type: String,
  },

  region: {
    type: String,
  },

  article: {
    type: [ArticlesLiked],
  },
});

export default mongoose.models.IpUsers || mongoose.model("IpUsers", IpUsersSchema);
