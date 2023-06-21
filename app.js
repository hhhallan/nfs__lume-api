require('dotenv').config();
const sequelize = require('./src/services/sequelize');

// Models
const User = require('./src/models/User');

// Lancement
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Routes
app.post('/users', async (req, res, next) => {
    const user = new User(req.body);

    try {
        const saveUser = await user.save();
        res.status(201).send(saveUser);
    } catch (e) {
        res.status(400).send(e);
    }
});

app.get('/users', async (req, res, next) => {
   try {
       const users = await User.findAll();
       res.send(users);
   } catch (e) {
       res.status(500).send(e);
   }
});

app.get('/user/:id', async (req, res, next) => {
    const userId = req.params.id;

    try {
        const user = await User.findByPk(userId);
        res.send(user);
    } catch (e) {
        res.status(500).send(e);
    }
});

// Lancement
app.listen(port, () => {
    console.log(`Serveur lancé sur: http://localhost:${port}`)
});