const jwt = require("jsonwebtoken")

const fetchUser = async (req, res, next) => {
    try {
        const secretKey = process.env.SECRET_KEY;
        const authToken = req.header("authToken");
        if (!authToken) {
            return res.status(400).json({ success: false, message: "authentication failed" })
        }
        const data = jwt.verify(authToken, secretKey);
        if (!data) {
            return res.status(400).json({ success: false, message: "authentication failed" })
        }
        req.user = data;
        next();

    } catch (err) {
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

module.exports = fetchUser;