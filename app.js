let dotenv = require("dotenv").config();
let config = dotenv.parsed;
const express = require("express");
var cors = require("cors");
const app = express();
const path = require("path");
const routers = require("./routes/index");
const connectToMongoDB = require("./config/mongoConfig");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const whitelist = [
  "http://localhost:4200",
];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("You are not allowed to access SSC portal."));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

app.use((req, res, next) => {
  const allowedHosts = [
    "localhost:3000",
    "localhost:4200",
  ];
  const host = req.get("Host");
  if (!allowedHosts.includes(host)) {
    return res.redirect("/error/invalid-request");
  } else {
    next();
  }
});

app.use((req, res, next) => {
  const allowedMethods = ["GET", "POST", "PUT", "DELETE"];
  if (allowedMethods.includes(req.method)) {
    next();
  } else {
    res.status(405).send("Method Not Allowed");
  }
});

app.use("/api/v1/user", routers.user);
app.use("/api/v1/otp", routers.otp);

const PORT = process.env.PORT || config.PORT;
const HOST_NAME = process.env.HOST || config.HOST;

app.listen(PORT, HOST_NAME, async () => {
  await connectToMongoDB();
  console.log(`server is running on ${HOST_NAME}:${PORT}`);
});