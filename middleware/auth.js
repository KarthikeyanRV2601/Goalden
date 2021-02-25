const jwt = require('jsonwebtoken');
require("dotenv").config();

module.exports = function(req, res, next) {
    const token = req.header('auth-token');

    if(!token) {
        return res.status(401).json({
            msg: "Authorization denied."
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).json({ msg: "Token is not valid" });
    }
}