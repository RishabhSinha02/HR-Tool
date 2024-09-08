const users = require("../models/user.model");

async function findUserByEmail(email) {
  return await users.findOne({ email: { $eq: email } }).exec();
}
async function findUserById(id) {
  return await users.findById(id).exec();
}
const createUser = async (user) => {
  console.log("creating new user => ", user.email);
  const userExists = await findUserByEmail(user.email);
  if (userExists != null) {
    console.error("User already exists => ", user.email);
    return userExists;
  }
  const newUser = await users.create(user);
  return newUser;
};

async function getAllUsers() {
  try {
    return await users.find({}).exec();
  } catch (error) {
    return null;
  }
}

async function deleteUserByEmail(email) {
  await users
    .deleteOne({ email: { $eq: email } })
    .exec()
    .then((result) => {
      console.log(`User deleted successfully => email = (${email})`);
      console.log(`Deleted count = ${result.deletedCount}`);
      return result;
    })
    .catch((err) => {
      return null;
    });
}

module.exports = {
  createUser,
  deleteUserByEmail,
  findUserByEmail,
  findUserById,
  getAllUsers,
};
