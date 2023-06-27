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
        if (!user) return res.status(404).json({error: 'Utilisateur non trouvé'});
        res.json(user);
    } catch (error) {
        res.status(500).json({error});
    }
};

exports.create = async (req, res) => {
    const {email, password, first_name, last_name} = req.body;

    try {
        const existingUser = await User.findOne({
            where: {email}
        });
        if (existingUser) {
            return res.status(409).json({message: 'Un utilisateur avec cette adresse e-mail existe déjà.'});
        }

        const newUser = await User.create({
            email,
            password,
            first_name,
            last_name
        });

        res.status(201).json({user: newUser, message: 'Inscription réussie.'});
    } catch (error) {
        console.log('Une erreur est survenue lors de l\'inscription.', error);
        res.status(400).json({error: 'Une erreur est survenue lors de l\'inscription.'});
    }
};

exports.update = async (req, res) => {
    const userId = req.params.id;
    const updateData = req.body;

    try {
        const user = await User.findByPk(userId);
        if (!user) return res.status(404).json({error: "Utilisateur non trouvé."});
        const updatedUser = await user.update(updateData);

        res.status(201).json(updatedUser);
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

// Gestion
exports.login = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.findUser(email, password);
        const token = await user.generateToken((7*24)*60);

        res.json({token, message: "Utilisateur connecté."});
    } catch (error) {
        res.status(401).json({error: error.message});
    }
};

exports.logout = async (req, res) => {
    try {
        res.status(200).json({message: 'Déconnexion réussie'});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Une erreur est survenue lors de la déconnexion'});
    }
};

exports.forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ where: { email }});
        if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        const token = await user.generateToken(15);

        // Envoi du mail

        // Ajout du token
        await user.update({tmp_token: token});

        res.status(200).json({token, message: "Un mail vous a été envoyé, il est valable 15 minutes."})
    } catch (error) {
        res.status(500).json({message: 'Une erreur est survenue lors du mdp oublié.'});
    }
};

exports.resetPassword = async (req, res) => {
    const { tmp_token } = req.query;
    const { password, confirmPassword } = req.body;

    try {
        const user = await User.findOne({ where: {tmp_token}})
        if (!user) return res.status(404).json({ message: "Utilisateur non trouvé via Token." });

        // Modification du mot de passe
        if (!password) return res.status(404).json({ message: "Veuillez rentrer un mot de passe." });
        if (!confirmPassword) return res.status(404).json({ message: "Veuillez confirmer le mot de passe." });
        if (confirmPassword !== password) return res.status(404).json({ message: "Les mots de passe de correspondent pas." });

        await user.update({
            password,
            tmp_token: null
        });

        res.status(200).json({message: "Votre mot de passe a été modifié !"});
    } catch (error) {
        res.status(500).json({message: 'Une erreur est survenue lors du resets.'});
    }
};