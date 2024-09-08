const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  nodeEnv: process.env.NODE_ENV || "dev",
  clientHost: process.env.CLIENT_HOST || "http://localhost:3000",
  serverPort: parseInt(process.env.SERVER_PORT, 10) || 3003,
  sessionSecret: process.env.SESSION_SECRET || "very-strong-secret",
  crossSite: process.env.CROSS_SITE === "true",
  allowedOrigins: process.env.ALLOWED_ORIGINS?.split(";") || [],
  dbConnectionURL: process.env.DB_CONNECTION_URL || "",
  hashingSalt: parseInt(process.env.HASHING_SALT, 10) || 10,
  tokenExpiry: parseInt(process.env.TOKEN_EXPIRY, 10) || 86400,
  jwtSecret: process.env.JWT_SECRET || "",
  sendGridApiKey: process.env.SENDGRID_API_KEY || "",
  senderEmail : process.env.SENDER_EMAIL || ""
};
