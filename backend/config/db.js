import mongoose from "mongoose";
import { DBURL } from "../config/constants";

export const dbConnection = async () => {
  try {
    await mongoose.connect(DBURL);
    console.log("MongoDB Server Started");
  } catch (error) {
    console.log(error.message);
    return error;
  }
};
