const jwt = require("jsonwebtoken");
let JWT_SECRET = process.env.JWT_SECRET;
let EXPIRES_IN = process.env.EXPIRES_IN;

let getToken = async (userData) => {
  return jwt.sign({ userData }, JWT_SECRET, { expiresIn: EXPIRES_IN });
};

module.exports = {
  getToken
}