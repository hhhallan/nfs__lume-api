const Scooter = require('../models/scooter');

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
        if (!scooter) return res.status(404).json({ message: "Trottinette non trouvvée !" });
        res.status(200).json(scooter)
    } catch (error) {

    }
}