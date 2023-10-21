const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function (req, res, next) {
    const token = req.header('jwt_token');
    if (!token) return res.status(403).json({ message: 'Authorization denied' });

    try {
        const payload = jwt.verify(token, process.env.jwtsecret);
        req.user = payload.user;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Authentication failed' });
    }
}