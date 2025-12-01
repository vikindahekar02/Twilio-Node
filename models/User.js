const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  mobileNumber: { type: String, unique: true, required: true },
  otp: { type: String },
  otpExpiresAt: { type: Date },
  isVerified: { type: Boolean, default: false }
});

module.exports = mongoose.model("User", UserSchema);
