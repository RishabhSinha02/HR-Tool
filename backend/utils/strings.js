const isNullOrEmpty = (str) => {
  console.log(str);
  return str === null || str === undefined || str.trim() === "";
};

const isValidEmail = (email) => {
  console.log(email);
  if (isNullOrEmpty(email)) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPassword = (password) => {
  if (isNullOrEmpty(password)) return false;
  return password.trim().length >= 8;
};

module.exports = {
  isNullOrEmpty,
  isValidEmail,
  isValidPassword,
};
