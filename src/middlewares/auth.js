const jwt = require('jsonwebtoken');

const User = require('../models/userModel');



const authMiddleware = async (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(401).json({
            message: 'not authorize'
        });
    }

    let token = authHeader.split(' ')[1];

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
     
        const user = await User.findById(payload.userId).select('-password');

        req.user = user;

        next();
    } catch (error) {
        return res.status(401).json({
            message: 'not authorize'
        });
    }

};

module.exports = authMiddleware;