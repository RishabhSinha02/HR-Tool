// const {
//   findUserByEmail,
//   findUserById,
// } = require("../middlewares/user.db.middleware");
// const { comparePassword } = require("../utils/hash");

// async function getPassportConfig(passport, LocalStrategy) {
//   const authenticateUser = async (email, password, done) => {
//     findUserByEmail(email)
//       .then(async (user) => {
//         if (!user) {
//           return done(null, false, { message: "Email does not exists" });
//         }
//         if (await comparePassword(password, user.password.toString())) {
//           return done(null, user);
//         } else {
//           return done(null, false, { message: "Invalid Password" });
//         }
//       })
//       .catch((err) => {
//         console.log("Error in authentication", err);
//         done(err);
//       });
//   };
//   const strategy = new LocalStrategy(
//     { usernameField: "email", passwordField: "password" },
//     authenticateUser
//   );
//   passport.use(strategy);

//   passport.serializeUser((user, done) => {
//     console.log("authenticated, searializing", user);
//     done(null, user._id);
//   });

//   passport.deserializeUser((id, done) => {
//     console.log("deserialing ", id);
//     findUserById(id)
//       .then((user) => {
//         if (user !== null) {
//           done(null, user);
//         } else {
//           throw new Error("No User Found");
//         }
//       })
//       .catch((err) => {
//         console.error("Error occured", err);
//         done(err, null);
//       });
//   });
// }

// module.exports = {
//   getPassportConfig,
// };
