/**
 * Importing all neccessary Packages
 */
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import File from "../models/multer.model";
import userModel from "../models/user";
import userdataModel from "../models/userData";
import {
  OK,
  BAD_REQUEST,
  NOT_FOUND,
  REGISTER_FAILED,
  RECORD_FOUND,
  RECORD_NOT_FOUND,
  REGISTERED,
  REMOVED,
  UPDATED,
  UPDATE_FAILED,
  CREATED,
  UNAUTHORIZED,
  SERVER_ERROR,
  FORBIDDEN,
  EXISTS,
  SERVER_MESSAGE_ERROR,
} from "../config/constants";

/**
 * For Controller Logic of how each API should works
 */

// For Fetching All Users
exports.getUserDetail = async (req, res) => {
  const { page = 1, limit = 5, search = "" } = req.query;
  const pageNo = Number(page);
  const limitNo = Number(limit);
  const skip = (pageNo - 1) * limitNo;
  try {
    const searchRegex = new RegExp(search, "i");
    const query = {
      $or: [
        { firstName: { $regex: searchRegex } },
        { lastName: { $regex: searchRegex } },
        { email: { $regex: searchRegex } },
        { marriedStatus: search.toLowerCase() === "true" },
        { gender: { $regex: searchRegex } },
      ],
    };

    const userFetch = await userModel
      .find(query)
      .sort({ firstName: 1 })
      .skip(skip)
      .limit(limitNo);
    const totalNoOfRecords = await userModel.countDocuments(query);
    const totalPages = Math.ceil(totalNoOfRecords / limitNo);

    console.log(userFetch);

    res.status(OK).json({
      message: "RECORD_FOUND",
      user: userFetch,
      totalNoOfRecords,
      totalPages,
    });
  } catch (error) {
    console.error("Error fetching user details:", error);
    res
      .status(BAD_REQUEST)
      .json({ message: "RECORD_NOT_FOUND", error: error.message });
  }
};

// For Fetching User by Id
exports.getUserDetailById = async (req, res) => {
  try {
    const getUserById = await userModel.findById({ _id: req.params.id });
    res.status(OK).json({ message: RECORD_FOUND, report: getUserById });
  } catch (error) {
    res.status(NOT_FOUND).json({ error: RECORD_NOT_FOUND });
  }
};

// For Creating an User Record
exports.createUserDetail = async (req, res) => {
  const { firstName, lastName, email, dob, marriedStatus, gender, password } =
    req.body;
  try {
    const user = new userModel(req.body);
    const hashPass = await bcrypt.hash(password, 10);
    const newUser = new userModel({
      firstName,
      lastName,
      email,
      dob,
      marriedStatus,
      gender,
      password: hashPass,
    });

    await newUser.save();
    res.status(OK).json({ message: REGISTERED, record: newUser });
  } catch (error) {
    res.status(BAD_REQUEST).json({ message: REGISTER_FAILED });
  }
};

// To fetch the populated mmodel
exports.getUserData = async (req, res) => {
  const { page = 1, limit = 5, search = "" } = req.query;
  const pageNo = Number(page);
  const limitNo = Number(limit);
  const skip = (pageNo - 1) * limitNo;

  try {
    const searchRegex = new RegExp(search, "i");

    const query = {
      $or: [
        { firstName: { $regex: searchRegex } },
        { lastName: { $regex: searchRegex } },
        { marriedStatus: search.toLowerCase() === "true" },
        { gender: { $regex: searchRegex } },
      ],
    };

    // Fetch user details and populate email with data from userDataModel
    const getUserDataNew = await userModel
      .find(query)
      .select("users")
      .sort({ firstName: 1 })
      .skip(skip)
      .limit(limitNo)
      .populate({
        path: "users", 
        model: "userData", 
        select: "firstName lastName email",
      });

    const usersData = getUserDataNew.map((user) => user.users).flat();

    const totalNoOfRecords = await userModel.countDocuments(query);
    const totalPages = Math.ceil(totalNoOfRecords / limitNo);

    res
      .status(OK)
      .json({ message: "Records found", info: usersData, totalPages });
  } catch (error) {
    console.error(error);
    res.status(SERVER_ERROR).json({ message: SERVER_MESSAGE_ERROR });
  }
};

// For populating into ref model
// For post method
exports.newUserStorage = async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;
    const { id } = req.params;

    // Check if the userDetails document exists
    const isExistUser = await userModel.findById(id);
    if (!isExistUser) {
      return res.status(NOT_FOUND).json({ message: EXISTS });
    }

    // Create a new userData entry
    const newUserModel = new userdataModel({
      firstName,
      lastName,
      email,
    });

    // Save the new userData entry
    const savedUserData = await newUserModel.save();

    // Update userDetails: Save the reference to userDataModel in email and push into users array
    isExistUser.users.push(savedUserData._id);
    await isExistUser.save();

    res
      .status(OK)
      .json({ message: "User successfully registered", user: savedUserData });
  } catch (error) {
    console.error("Error Message: ", error);
    res.status(FORBIDDEN).json({ message: SERVER_ERROR });
  }
};

// For Updating an User Record
exports.updateUserDetail = async (req, res) => {
  try {
    const updateUser = await userModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!updateUser) {
      return res.status(NOT_FOUND).json({ error: RECORD_NOT_FOUND });
    }
    res.status(OK).json({ message: UPDATED, item: updateUser });
  } catch (error) {
    console.log(error);
    res.status(NOT_FOUND).json({ error: UPDATE_FAILED });
  }
};

// For Deleting an User Record
exports.deleteUserDetail = async (req, res) => {
  try {
    const removeID = await userModel.findByIdAndDelete(req.params.id);
    if (!removeID) {
      res.status(BAD_REQUEST).json({ error: "No Record Found!!" });
    }
    res.json({ message: REMOVED, record: removeID });
  } catch (error) {
    res.status(NOT_FOUND).json({ error: error.message });
  }
};

// For LoginUser
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userInfo = await userModel.findOne({ email }).select("password");
    // .populate("users");
    console.log(userInfo, "userInfo");
    if (!userInfo) {
      return res.status(NOT_FOUND).json({ msg: "user not found" });
    }
    const isMatch = await bcrypt.compare(password, userInfo.password);

    if (isMatch) {
      const token = jwt.sign({ email, password }, "This_is_key : ", {
        expiresIn: "2h",
      });
      console.log(userInfo, "------");
      /**
       * To save Token on Successfull generation
       */
      userInfo.token = token;
      await userInfo.save();

      return res.status(CREATED).json({
        msg: "User Logged In",
        token,
        userInfo: { _id: userInfo._id },
      });
    } else {
      return res.status(UNAUTHORIZED).json({ msg: "Invalid Credentials" });
    }
  } catch (error) {
    res.status(UNAUTHORIZED).json({ ERROR: error.message });
  }
};

// For Sending Mail
exports.mailUser = async (req, res) => {
  try {
    const { email, firstName, lastName } = req.body;
    sendRegistrationEmail(email, firstName, lastName);
    res.status(OK).json({ message: constants.EMAIL_SENT });
  } catch (error) {
    console.error("EMAIL CANNOT SEND:", error);
    res.status(BAD_REQUEST).json({ error: error.message });
  }
};

// For File Uploading
exports.uploadimage = async (req, res) => {
  if (!req.file) {
    return res.status(BAD_REQUEST).json({ message: "No file uploaded" });
  }

  try {
    const newFile = new File({
      filename: req.file.filename,
      path: req.file.path,
      mimetype: req.file.mimetype,
      size: req.file.size,
    });

    await newFile.save();
    res
      .status(OK)
      .json({ message: "File uploaded successfully", file: req.file });
  } catch (error) {
    console.error(error.message);
    res.status(SERVER_ERROR).send("Server error");
  }
};
