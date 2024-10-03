import jwt from "jsonwebtoken";
import {
  FORBIDDEN,
  ACCESS_DENIED,
  UNAUTHORIZED,
  NOT_FOUND,
} from "../config/constants";

const verifyToken = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
      return res.status(FORBIDDEN).json({ message: ACCESS_DENIED });
    }

    const verifiedToken = jwt.verify(token, "This_is_key : ");

    if (!verifiedToken) {
      return res.status(NOT_FOUND).json({ message: ACCESS_DENIED });
    }
    next();
  } catch (error) {
    res.status(UNAUTHORIZED).json({ error: error.message });
  }
};

export default verifyToken;
