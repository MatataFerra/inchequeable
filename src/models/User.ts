import mongoose, { Schema } from "mongoose";

type UserType = {
  username: string;
  email: string;
  password: string;
  admin: string;
  is_admin: boolean;
};

const UserSchema = new Schema<UserType>({
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
