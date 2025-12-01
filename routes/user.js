let routes = require("express").Router();
let userController = require("../controllers/userController");
const { verifyToken } = require("../middlewares/authMiddleware");


routes.get("/user", verifyToken, userController.getUserInfo);


module.exports = routes;