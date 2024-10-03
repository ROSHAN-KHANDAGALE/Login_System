/**
 * The Following files contains the unchangable code of variable
 */
module.exports = {
  DBURL: "mongodb://localhost:27017/LoginHandleAssessment",

  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,

  RECORD_FOUND: "USER DATA FOUND",
  RECORD_NOT_FOUND: "USER RECORD NOT FOUND",
  REGISTERED: "USER REGISTERED SUCCESSFULLY",
  REGISTER_FAILED: "FAILED TO REGISTER the USER",
  UPDATED: "RECORD UPDATED SUCCESSFULLY",
  UPDATE_FAILED: "FAILED TO UPDATE RECORD",
  REMOVED: "RECORD removed SUCCESSFULLY",
  REMOVE_FAIL: "FAILED TO remove RECORD",
  EMAIL_SENT: "Email SEND SUCCESSFULLY",
  EMAIL_SEND_FAIL: "FAILED TO SEND email",
  MAIL_SEND: "MAIL SENDED SUCCESSFULLY!!",
  PAGINATE: "TOTAL RECORD FOUNDED!!",

  ACCESS_DENIED: "ACCESS DENIED!!",
  EXISTS: "USER ALREADY EXISTS",
  SERVER_MESSAGE_ERROR: "SERVER FAILED",

  messages: {
    imageType: "Invalid Image Type. Try .jpeg, .jpg or .png files only...",
  },
};
