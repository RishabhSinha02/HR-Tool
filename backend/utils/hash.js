const config = require("../config/config");
const bcrypt = require("bcrypt");

async function comparePassword(password1, password2) {
  return await bcrypt.compare(password1, password2);
}
async function encryptPassword(plainTextPassword, salt = config.hashingSalt) {
  return await bcrypt.hash(plainTextPassword, salt);
}


module.exports = {
  comparePassword,
  encryptPassword,
};
