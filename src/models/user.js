const {DataTypes, Sequelize} = require('sequelize');
const sequelize = require('../services/sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {uuid} = require('uuidv4');

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
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'User',
        validate: {
            isIn: [['Admin', 'User']],
        },
    },
    tmpToken: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
});

User.generateAuthToken = function () {
    const token = jwt.sign({id: uuid().toString()}, process.env.JWT_SECRET);
    return {
        type: 'authToken',
        token
    };
};

User.prototype.generateAuthTokenAndSaveUser = async function () {
    const authToken = jwt.sign({id: uuid().toString()}, process.env.JWT_SECRET);

    // Sauvegarde du jeton JWT dans le localStorage
    localStorage.setItem('jwtToken', authToken.token);

    return authToken.token;
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