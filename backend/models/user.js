import mongoose from "mongoose";

/**
 * Declaring Schema for Mongoose to store values
 */
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    marriedStatus: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      select: false,
      required: true,
    },
    avatar: {
      // Field for storing the profile image URL
      type: String,
      default: "",
    },
    token: {
      type: String,
      select: false,
    },
    // Referencing userDataModel by email
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userData",
      },
    ],
  },
  { timestamps: true }
);

/**
 * Creating collection and importing the Schema
 */
const userDetails = mongoose.model("userDetails", userSchema);

/**
 * Exporting UserModel
 */
export default userDetails;
