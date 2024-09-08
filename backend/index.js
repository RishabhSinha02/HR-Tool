const createDatabaseConnection = require("./config/database");
const createApp = require("./config/server");
createApp();
createDatabaseConnection();
