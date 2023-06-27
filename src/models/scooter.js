const { DataTypes } = require('sequelize');
const sequelize = require('../services/sequelize');

const Scooter = sequelize.define('Scooter', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    battery_status: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    available: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    latitude: {
        type: DataTypes.DECIMAL(9, 6),
        allowNull: true,
    },
    longitude: {
        type: DataTypes.DECIMAL(9, 6),
        allowNull: true,
    },
    total_distance: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
}, {
    tableName: 'Scooters',
    timestamps: false,
});

module.exports = Scooter;