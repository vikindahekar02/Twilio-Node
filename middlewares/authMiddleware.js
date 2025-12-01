const jwt = require("jsonwebtoken");
let jwtSecret = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
  if (req.headers["authorization"]) {

    const authHeader = req.headers["authorization"].split("Bearer")[1].trim();

    jwt.verify(authHeader, jwtSecret, async (err, user) => {
      if (err) {
        return res
          .status(403)
          .json({ status: 403, error: err.message, msg: "" });
      } else {
        let user = jwt.decode(authHeader);
        req.user = user;
        next();
      }
    });
  } else {
    return res
      .status(401)
      .json({ status: 401, error: "You are not authenticated! " });
  }
};



module.exports = {
  verifyToken,
};