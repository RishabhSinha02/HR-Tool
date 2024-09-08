const cors = require("cors");
const { CorsOptions } = require("cors");
const express = require("express");
const MongoStore = require("connect-mongo");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
// const { getPassportConfig } = require("./passport");
const {
  jobsRouter,
  userRouter,
  candidateRouter,
  processRouter,
} = require("../routes");
const helmet = require("helmet");
const responseTime = require("response-time");
const config = require("./config");

function createApp() {
  const app = express();

  app.use(helmet());
  app.use(responseTime());
  app.disable("x-powered-by");
  const corsOptions = {
    origin: (origin, callback) => {
      if (config.allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  };

  app.use(cors(corsOptions));
  app.use(cookieParser());

  app.use(
    session({
      secret: config.sessionSecret,
      resave: false,
      saveUninitialized: false,
      name: "workfox_hr.session", //change name
      store: MongoStore.create({
        mongoUrl: config.dbConnectionURL,
        collectionName: "sessions",
      }),
      cookie: {
        sameSite: config.crossSite ? "none" : "strict",
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
      },
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  // getPassportConfig(passport, LocalStrategy);

  app.use(express.json({ limit: "1024mb" }));
  app.use(express.urlencoded({ extended: true }));

  app.use((req, res, next) => {
    console.log(`New Request Session ID : ${req.sessionID}`);
    next();
  });

  app.use("/user", userRouter);
  app.use("/jobs", jobsRouter);
  app.use("/candidates", candidateRouter);
  app.use("/process", processRouter);

  app.listen(config.serverPort, () => {
    console.log(`Server started successfully at PORT = ${config.serverPort}`);
  });
  return app;
}

module.exports = createApp;
