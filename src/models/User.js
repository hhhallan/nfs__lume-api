const { DataTypes } = require('sequelize');
const sequelize = require('../services/sequelize');
const validator = require('validator');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
                args: true,
                msg: 'Veuillez fournir une adresse e-mail valide.',
            }
        },
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [2, 55],
                msg: 'Le prénom doit contenir entre 2 et 55 caractères.',
            }
        }
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [2, 55],
                msg: 'Le prénom doit contenir entre 2 et 55 caractères.',
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            min: {
                args: 8,
                msg: 'Le mot de passe doit contenir au minimum 8 caractères.'
            }
        }
    },
    phone_number: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            isValidPhoneNumber(value) {
                if (!/^(\+\d{1,3})?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/.test(value)) {
                    throw new Error('Le numéro de téléphone doit être au format valide.');
                }
            },
        }
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'User',
        validate: {
            isIn: [['Admin', 'User']],
        },
    },
    token: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'Users',
    timestamps: false,
});

module.exports = User;