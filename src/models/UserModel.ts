import mongoose, { Model } from "mongoose";
export interface IUser {
  username: string;
  email: string;
  password: string;
  isVerified: boolean;
  isAdmin: boolean;
  forgotPasswordToken: string | undefined;
  forgotPasswordTokenExpiry: Date | undefined;
  verifyToken: string | undefined;
  verifyTokenExpiry: Date | undefined;
} 

const userSchema = new mongoose.Schema<IUser>({
  username: {
    unique: [true, "Username must be unique"],
    type: String,
    required: [true, "Username is required"],
  },
  email: {
    unique: [true, "Email must be unique"],
    type: String,
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: { type: String },
  forgotPasswordTokenExpiry: { type: Date },
  verifyToken: { type: String },
  verifyTokenExpiry: { type: Date },
});

const User: Model<IUser> =
  // if mongoose.models.users exists, use it otherwise create one   
  mongoose.models.users || mongoose.model("users", userSchema);
export default User;
