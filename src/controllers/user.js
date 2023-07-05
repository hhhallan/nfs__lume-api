const User = require('../models/user');
const Rental = require('../models/rent');
const Scooter = require('../models/scooter');
const moment = require('moment');

// CRUD
exports.getAll = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({
            error,
            message: 'Une erreur est survenue lors de la récupération.'
        });
    }
};

exports.getOneById = async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.findByPk(userId);
        if (!user) return res.status(404).json({error: 'Utilisateur non trouvé'});
        res.json(user);
    } catch (error) {
        res.status(500).json({
            error,
            message: 'Une erreur est survenue lors de la récupération.'
        });
    }
};

exports.create = async (req, res) => {
    const {email, password, confirmPassword, first_name, last_name} = req.body;

    try {
        const existingUser = await User.findOne({
            where: {email}
        });
        if (existingUser) {
            return res.status(409).json({message: 'Un utilisateur avec cette adresse e-mail existe déjà.'});
        }

        if (!password) return res.status(404).json({message: "Veuillez rentrer un mot de passe."});
        if (!confirmPassword) return res.status(404).json({message: "Veuillez confirmer le mot de passe."});
        if (confirmPassword !== password) return res.status(404).json({message: "Les mots de passe de correspondent pas."});

        const newUser = await User.create({
            email,
            password,
            first_name,
            last_name
        });

        res.status(201).json({user: newUser, message: 'Inscription réussie.'});
    } catch (error) {
        res.status(500).json({
            error,
            message: 'Une erreur est survenue lors de l\'inscription.'
        });
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
        res.status(500).json({
            error,
            message: 'Une erreur est survenue lors de la modification.'
        });
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
        res.status(500).json({
            error,
            message: 'Une erreur est survenue lors de la suppression.'
        });
    }
};

// Gestion
exports.login = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.findUser(email, password);
        const token = await user.generateToken((7 * 24) * 60);

        res.json({token, message: "Utilisateur connecté."});
    } catch (error) {
        res.status(500).json({
            error,
            message: 'Une erreur est survenue lors de la connexion.'
        });
    }
};

exports.logout = async (req, res) => {
    try {
        res.status(200).json({message: 'Déconnexion réussie'});
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error,
            message: 'Une erreur est survenue lors de la déconnexion.'
        });
    }
};

exports.forgotPassword = async (req, res) => {
    const {email} = req.body;

    try {
        const user = await User.findOne({where: {email}});
        if (!user) return res.status(404).json({message: 'Utilisateur non trouvé.'});
        const token = await user.generateToken(15);

        // Envoi du mail avec lien contenant le token (dans l'url)

        // Ajout du token
        await user.update({tmp_token: token});

        res.status(200).json({token, message: "Un mail vous a été envoyé, il est valable 15 minutes."})
    } catch (error) {
        res.status(500).json({
            error,
            message: 'Une erreur est survenue lors du forgot.'
        });
        ;
    }
};

exports.resetPassword = async (req, res) => {
    const {tmp_token} = req.query;
    const {email, password, confirmPassword} = req.body;

    try {
        // Vérifier si l'utilisateur existe avec l'e-mail fourni
        const user = await User.findOne({where: {email}});
        if (!user) return res.status(404).json({message: 'Utilisateur introuvable.'});

        // Vérifier si le token correspond au token temporaire de l'utilisateur
        if (tmp_token !== user.tmp_token) return res.status(400).json({message: 'Token invalide.'});

        // Modification du mot de passe
        if (!password) return res.status(400).json({message: "Veuillez rentrer un mot de passe."});
        if (!confirmPassword) return res.status(400).json({message: "Veuillez confirmer le mot de passe."});
        if (confirmPassword !== password) return res.status(400).json({message: "Les mots de passe de correspondent pas."});

        await user.update({
            password,
            tmp_token: null
        });

        res.status(200).json({message: "Votre mot de passe a été modifié !"});
    } catch (error) {
        res.status(500).json({
            error,
            message: 'Une erreur est survenue lors du resets.'
        });
    }
};

// Location
/**
 * Get all rentals of user
 * @param req
 * @param res
 * @returns {Promise<Rental[]>}
 */
exports.rentalsByUser = async (req, res) => {
    const userId = req.params.userId;

    try {
        const user = await User.findByPk(userId);
        if (!user) return res.status(404).json({message: "L'utilsateur n'existe pas."});

        const rentals = await Rental.findAll({
            where: {
                user_id: userId
            }
        });
        if (rentals.length <= 0) return res.status(404).json({error: "Aucune location n'a été trouvé."});

        res.status(200).json({rentals});
    } catch (error) {
        res.status(500).json({
            error,
            message: 'Une erreur est survenue lors de la récupération.'
        });
    }
};

exports.rentScooter = async (req, res) => {
    const {user_id, scooter_id} = req.body;

    try {
        // User & Scooter existent ?
        const user = await User.findByPk(user_id);
        const scooter = await Scooter.findByPk(scooter_id);

        if (!user) return res.status(404).json({message: "L'utilsateur n'existe pas."});
        if (!scooter) return res.status(404).json({message: "La trottinette n'existe pas."});

        const rental_start_time = moment();
        const rental_end_time = moment().add(Math.floor(Math.random() * 10) + 10, 'minutes');

        const newRental = await Rental.create({
            user_id: user.id,
            scooter_id: scooter.id,
            rental_start_time,
            rental_end_time,
            total_distance: (Math.random() * 10).toFixed(1),
            total_amount: (rental_end_time.diff(rental_start_time, 'minutes') * 0.10).toFixed(2)

        /*{
            include: [{
                User,
                Scooter
            }], */
        });

        res.status(200).json({newRental, message: "La location a démarré, roulez bien igo."});
    } catch (error) {
        res.status(500).json({
            error,
            message: 'Une erreur est survenue lors de la récupération.'
        });
    }
};

exports.stopRentScooter = async (req, res) => {

};