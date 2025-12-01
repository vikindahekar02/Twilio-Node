let routes = require("express").Router();
let otpController = require("../controllers/otpController");

routes.post("/requestOtp", otpController.requestOTP);
routes.post("/verifyOtp", otpController.verifyOTP);


module.exports = routes;