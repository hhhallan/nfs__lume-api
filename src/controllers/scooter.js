const Scooter = require('../models/scooter');
const User = require("../models/user");

// CRUD
exports.getAll = async (req, res) => {
    try {
        const scooters = await Scooter.findAll();
        res.status(200).json({scooters})
    } catch (error) {
        res.status(500).json({
            error,
            message: "Une erreur est survenue lors de la récupération."
        });
    }
};

exports.getOneById = async (req, res) => {
    const scooterId = req.params.id;

    try {
        const scooter = await Scooter.findByPk(scooterId);
        if (!scooter) return res.status(404).json({message: "Trottinette non trouvvée !"});
        res.status(200).json(scooter)
    } catch (error) {

    }
}

exports.create = async (req, res) => {
    const {name} = req.body;

    try {
        const newScooter = await Scooter.create({
            name
        });

        res.status(201).json({
            scooter: newScooter,
            message: "Trottinette enregistrée."
        })
    } catch (error) {
        res.status(500).json({
            error,
            message: "Une erreur est survenue."
        });
    }
};

exports.update = async (req, res) => {
    const scooterId = req.params.id;
    const updateData = req.body;

    try {
        const scooter = await Scooter.findByPk(scooterId);
        if (!scooter) return res.status(404).json({error: "Trottinette non trouvée."});
        const updatedScooter = await scooter.update(updateData);

        res.status(201).json(updatedScooter);
    } catch (error) {
        res.status(500).json({
            error,
            message: 'Une erreur est survenue lors de la modification.'
        });
    }
};

exports.delete = async (req, res) => {
    const scooterId = req.params.id;

    try {
        const scooter = await Scooter.findByPk(scooterId);
        if (!scooter) return res.status(404).json({error: "Trottinette non trouvée."});
        const scooterDeleted = await scooter.destroy(scooterId)

        res.json(scooterDeleted);
    } catch (error) {
        res.status(500).json({
            error,
            message: 'Une erreur est survenue lors de la suppression.'
        });
    }
};