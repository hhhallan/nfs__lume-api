const {DataTypes, Sequelize} = require('sequelize');
const sequelize = require('../services/sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Rental = require('./rent');

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
        /*validate: {
            isStrongPassword: {
                args: [
                    {
                        minLength: 8,
                        maxLength: 255,
                        minLowercase: 0,
                        minUppercase: 1,
                        minNumbers: 1,
                    },
                ],
                msg:
                    'Le mot de passe doit contenir au moins 8 caractères, une majuscule et un chiffre.',
            },
        },*/
    },
    phone_number: {
        type: DataTypes.STRING,
        allowNull: true,
        /*validate: {
            isFrenchPhoneNumber: function (value) {
                const phoneRegex = /^(?:\+33|0)[1-9](?:[.-\s]?\d{2}){4}$/;
                if (value && !phoneRegex.test(value)) {
                    throw new Error('Le numéro de téléphone doit être au format français.');
                }
            },
        },*/
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'User',
        validate: {
            isIn: [['Admin', 'User']]
        },
    },
    tmp_token: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
}, {
    tableName: 'Users',
    timestamps: false,
});

User.Rental = User.hasMany(Rental);

User.prototype.generateToken = async function (durationInMinutes) {
    const expirationTime = Math.floor(Date.now() / 1000) + (durationInMinutes * 60);
    const payload = {id: this.id, exp: expirationTime};
    return jwt.sign(payload, process.env.JWT_SECRET);
};

User.findUser = async function (email, password) {
    const user = await this.findOne({where: {email}});
    if (!user) throw new Error('Impossible de se connecter.');
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error('Mot de passe incorrect.');

    return user;
};

User.beforeSave(async (user) => {
    if (user.changed('password')) {
        user.password = await bcrypt.hash(user.password, 11);
    }
});

module.exports = User;