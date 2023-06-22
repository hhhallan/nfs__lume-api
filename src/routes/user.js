const express = require('express');
const User = require('../models/user');
// const authentification = require('../middlewares/authentification');
const router = new express.Router();

// Authentification
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findUser(email, password);
        const token = await user.generateAuthTokenAndSaveUser2(user);
        res.json({ user, message: "Utilisateur connecté." });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});

router.post('/logout', async (req, res) => {
    try {
        req.user.authToken = req.user.authToken
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});

// Create
router.post('/', async (req, res) => {
    const user = new User(req.body);

    try {
        const saveUser = await user.save();
        res.status(201).json(saveUser);
    } catch (error) {
        res.status(400).json(error);
    }
});

// Read
router.get('/', async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({error});
    }
});
router.get('/:id', async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.findByPk(userId);
        if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé' });
        res.json(user);
    } catch (error) {
        res.status(500).json({error});
    }
});

// Update
router.patch('/:id', async (req, res) => {
    const userId = req.params.id;
    const updateData = req.body;

    try {
        const user = await User.findByPk(userId);
        if (!user) return res.status(404).json({error: "Utilisateur non trouvé."});
        const updatedUser = await user.update(updateData);

        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({error});
    }
});

// Delete
router.delete('/:id', async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.findByPk(userId);
        if (!user) return res.status(404).json({error: "Utilisateur non trouvé."});
        const deletedUser = await user.destroy(userId)

        res.json(deletedUser);
    } catch (error) {
        res.status(500).json({error});
    }
});

module.exports = router;