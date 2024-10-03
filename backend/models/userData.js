import mongoose from "mongoose";

/**
 * Declaring Schema for Mongoose to store values
 */
const userDataSchema = new mongoose.Schema(
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
  },
  { timestamps: true }
);

/**
 * Creating collection and importing the Schema
 */
const userDataModel = mongoose.model("userData", userDataSchema);

/**
 * Exporting UserModel
 */
export default userDataModel;
