const User = require("../models/User");
const { resFound } = require("../utils/response");


exports.getUserInfo = async (req, res) => {
    try {
        console.log("Req User:", req.user);
        const userId = req.user.userData.id;
        
        const user = await User.findOne({ _id: userId });
        return resFound(res, user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}