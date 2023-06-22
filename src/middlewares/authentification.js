const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {Op} = require("sequelize");

const authentification = async (req, res, next) => {
    try {
        const authToken = req.header('Authorization').replace('Bearer ', '');
        const decodedToken = jwt.verify(authToken, process.env.JWT_SECRET);
        const user = await User.findOne({
            where: {
                id: decodedToken.id,
                tokens: {
                    [Op.like]: `%${authToken}%`
                }
            }
        });

        if (!user) throw new Error();

        req.authToken = authToken;
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json('Merci de vous authentifier.');
    }
};

module.exports = authentification;