const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authentification = async (req, res, next) => {
    try {
        const authToken = req.header('Authorization').replace('Bearer ', '');
        const decodedToken = jwt.verify(authToken, process.env.JWT_SECRET);
        const user = await User.findOne({ id: decodedToken.id, 'authToken': authToken });

        if (!user) throw new Error();

        req.authToken = authToken;
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json('Merci de vous authentifier.');
    }
}

module.exports = authentification;