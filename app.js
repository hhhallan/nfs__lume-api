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
        res.status(201).json(saveUser);
    } catch (error) {
        res.status(400).json(error);
    }
});

app.get('/users', async (req, res, next) => {
   try {
       const users = await User.findAll();
       res.status(200).json(users);
   } catch (error) {
       res.status(500).json(error);
   }
});

app.get('/users/:id', async (req, res, next) => {
    const userId = req.params.id;

    try {
        const user = await User.findByPk(userId);
        if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé' });
        res.json(user);
    } catch (error) {
        res.status(500).json(error);
    }
});

app.patch('/user/:id', async (req, res, next) => {
    const userId = req.params.id;
    const updateData = req.body;

    try {
        const user = await User.findByPk(userId);
        if (!user) return res.status(404).json({error: "Utilisateur non trouvé."});
        const updatedUser = await user.update(updateData);

        res.json(updatedUser);
    } catch (error) {
        res.status(500).json(error);
    }
});

app.delete('/user/:id', async (req, res, next) => {
    const userId = req.params.id;

    try {
        const user = await User.findByPk(userId);
        if (!user) return res.status(404).json({error: "Utilisateur non trouvé."});
        const deletedUser = await user.destroy(userId)

        res.json(deletedUser);
    } catch (error) {
        res.status(500).json(error);
    }
});


// Lancement
app.listen(port, () => {
    console.log(`Serveur lancé sur: http://localhost:${port}`)
});