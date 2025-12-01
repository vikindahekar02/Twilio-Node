const User = require("../models/User");
const { generateOTP } = require("../utils/otpGenerator");
const { sendOTP } = require("../services/twilioService");
const { getToken } = require("../utils/jwt");
const { resOtpSend, resOtpVerify } = require("../utils/response");

exports.requestOTP = async (req, res) => {
  try {
    let { mobileNumber } = req.body;

    if (!mobileNumber) return res.status(400).json({ error: "Mobile number is required" });

    let user = await User.findOne({ mobileNumber });

    const otp = generateOTP();
    const otpExpiresAt = new Date(Date.now() + 2 * 60 * 1000);

    if (!user) {
      user = await User.create({ mobileNumber, otp, otpExpiresAt });
    } else {
      user.otp = otp;
      user.otpExpiresAt = otpExpiresAt;
      user.isVerified = false;
      await user.save();
    }

    let data = {
        mobileNumber,   
        // otp
    }

    await sendOTP(`+91${mobileNumber}`, otp);
    return resOtpSend(res, data);
  } catch (err) {
    console.log("error", err);
    res.status(500).json({ error: err.message });
  }
};


exports.verifyOTP = async (req, res) => {
  try {
    const { mobileNumber, otp } = req.body;

    const user = await User.findOne({ mobileNumber });

    if (!user) return res.status(400).json({ error: "User not found" });

    if (user.otp !== otp){
      return res.status(400).json({ error: "Invalid OTP" });
    }
    if (new Date() > user.otpExpiresAt){
        return res.status(400).json({ error: "OTP expired" });
    }

    user.isVerified = true;
    user.otp = null;
    await user.save();

    const token = await getToken({ mobileNumber: user.mobileNumber, id: user._id });
    return resOtpVerify(res, { token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
