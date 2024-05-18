const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    // Get token from the header
    const token = req.headers.authorization?.split(' ')[1]; // Bearer TOKEN

    if (!token) {
        return res.status(403).json({ error: "A token is required for authentication" });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
    } catch (err) {
        return res.status(401).json({ error: "Invalid Token" });
    }
    return next();
};

module.exports = verifyToken;
