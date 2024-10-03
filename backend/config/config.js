/**
 * Importing dotenv package
 */
require("dotenv/config");

/**
 * exporting config file info
 */
export const config = {
  local: {
    DB: {
      HOST: "127.0.0.1",
      PORT: "27017",
      DATABASE: "LoginHandleAssessment",
    },
    apiPort: "5000",
  },
  staging: {},
  production: {},
};
