const express = require('express');
const User = require('../models/user');
const authentification = require('../middlewares/authentification');
const router = new express.Router();
const { Op } = require('sequelize');

// Authentification
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findUser(email, password);

        const tokensArray = JSON.parse(user.tokens);
        const updatedTokensArray = tokensArray.filter((tokenObj) => tokenObj.type !== 'authToken');
        user.tokens = JSON.stringify(updatedTokensArray);

        const token = await user.generateAuthTokenAndSaveUser(user);
        res.json({ token, message: "Utilisateur connecté." });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});

router.post('/logout', authentification, async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        const authToken = authHeader ? authHeader.split(' ')[1] : null; // Extraction du jeton d'authentification sans le préfixe "Bearer"

        if (!authToken) {
            return res.status(401).json({ message: 'Jeton d\'authentification non fourni' });
        }

        const user = await User.findOne({
            where: {
                tokens: {
                    [Op.like]: `%${authToken}%`
                }
            }
        });

        if (!user) {
            return res.status(401).json({ message: 'Utilisateur non autorisé' });
        }

        const tokensArray = JSON.parse(user.tokens);
        const updatedTokensArray = tokensArray.filter((tokenObj) => tokenObj.token !== authToken);
        user.tokens = JSON.stringify(updatedTokensArray);
        await user.save();

        res.status(200).json({ message: 'Déconnexion réussie' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la déconnexion' });
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