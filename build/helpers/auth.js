var jwt = require("jsonwebtoken");
var dotenv = require("dotenv");
dotenv.config();
var config = process.env;
var verifyToken = function (req, res, next) {
    var auth_header = req.headers["authorization"];
    var token = auth_header && auth_header.split(" ")[1];
    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        var decoded = jwt.verify(token, config.TOKEN_KEY);
        req.user = decoded;
    }
    catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
};
module.exports = verifyToken;
//# sourceMappingURL=auth.js.map