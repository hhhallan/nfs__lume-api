const { DataTypes } = require('sequelize');
const sequelize = require('../services/sequelize');

const Rental = sequelize.define('Rental', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    rental_start_time: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    rental_end_time: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    total_distance: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
    },
    total_amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
}, {
    tableName: 'Rentals',
    timestamps: false,
});

module.exports = Rental;
