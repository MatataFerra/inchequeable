import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  username: {
    type: String,
  },
  admin: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  is_admin: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
