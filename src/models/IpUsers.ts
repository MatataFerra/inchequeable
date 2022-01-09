import mongoose, { Schema } from "mongoose";

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
    type: [{ type: Schema.Types.ObjectId, ref: "Article" }],
  },
});

export default mongoose.models.IpUsers || mongoose.model("IpUsers", IpUsersSchema);
