const twilio = require("twilio");

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

module.exports.sendOTP = async (mobileNumber, otp) => {
  return client.messages.create({
    body: `Your verification code is: ${otp}`,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: mobileNumber
  });
};
