const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize({
    database: 'lume_api',
    username: 'root',
    password: '',
    host: 'localhost',
    dialect: 'mysql',
});

module.exports = sequelize;