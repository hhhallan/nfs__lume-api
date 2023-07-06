const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize({
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: process.env.DB_PORT
});

module.exports = sequelize;