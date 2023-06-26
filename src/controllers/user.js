const User = require('../models/user');

// CRUD
exports.getAll = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({error});
    }
};

exports.getOneById = async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.findByPk(userId);
        if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé' });
        res.json(user);
    } catch (error) {
        res.status(500).json({error});
    }
};

exports.create = async (req, res) => {
    const { email, password, first_name, last_name } = req.body;

    try {
        const existingUser = await User.findOne({
            where: { email }
        });
        if (existingUser) {
            return res.status(409).json({ message: 'Un utilisateur avec cette adresse e-mail existe déjà.' });
        }

        const newUser = await User.create({
            email,
            password,
            first_name,
            last_name
        });

        res.status(201).json({ user: newUser, message: 'Inscription réussie.' });
    } catch (error) {
        console.log('Une erreur est survenue lors de l\'inscription.', error);
        res.status(400).json({ error: 'Une erreur est survenue lors de l\'inscription.' });
    }
};

exports.update = async (req, res) => {
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
};

exports.delete = async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.findByPk(userId);
        if (!user) return res.status(404).json({error: "Utilisateur non trouvé."});
        const deletedUser = await user.destroy(userId)

        res.json(deletedUser);
    } catch (error) {
        res.status(500).json({error});
    }
};

// Authentification
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findUser(email, password);
        const token = await user.generateAuthTokenAndSaveUser();

        res.json({ token, message: "Utilisateur connecté." });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

exports.logout = async (req, res) => {
    try {
        res.status(200).json({ message: 'Déconnexion réussie' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la déconnexion' });
    }
};