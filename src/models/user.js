const {DataTypes, Sequelize} = require('sequelize');
const sequelize = require('../services/sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
            min: {
                args: 4,
                msg: 'Le mot de passe doit contenir au minimum 8 caractères.'
            }
        }*/
    },
    phone_number: {
        type: DataTypes.STRING,
        allowNull: true,
        /*validate: {
            isValidPhoneNumber(value) {
                if (!/^(\+\d{1,3})?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/.test(value)) {
                    throw new Error('Le numéro de téléphone doit être au format valide.');
                }
            },
        }*/
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'User',
        validate: {
            isIn: [['Admin', 'User']],
        },
    },
    authToken: {
        type: DataTypes.TEXT('long'),
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

User.prototype.generateAuthTokenAndSaveUser = async function (user) {
    const token = jwt.sign({ id: user.id.toString() }, process.env.JWT_SECRET);
    user.authToken = token;
    await user.save();
    return token;
};

User.findUser = async function (email, password) {
    const user = await this.findOne({ where: { email } });
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