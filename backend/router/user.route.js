/**
 * Importing required packages
 */
import express from "express";
import userController from "../controller/user.controller";
import verifyToken from "../middleware/tokenVerifier";
import { uploadimage } from "../controller/user.controller";
import { uploadMiddleware } from "../helper/multer.js";

const router = express.Router();

/**
 * HTTP route initialization along with their methods (get, post, put and delete)
 */

// For Creating, Reading, Updating, and Deleting (CRUD)
router.get("/api", userController.getUserDetail);
router.get("/api/:id", verifyToken, userController.getUserDetailById);
router.post("/api", userController.createUserDetail);
router.put("/api/:id", verifyToken, userController.updateUserDetail);
router.delete("/api/:id", userController.deleteUserDetail);

// For Viewing & Creating in New Model
router.get("/useData", userController.getUserData);
router.post("/api/useData/:id", userController.newUserStorage);

// For Login
router.post("/api/login", userController.loginUser);

// For Mail
// router.post("/api/mail", userController.mailUser);

// For Multer
router.post("/image", uploadMiddleware.single("image"), uploadimage);

/**
 *  Exporting the router File
 */
export default router;
