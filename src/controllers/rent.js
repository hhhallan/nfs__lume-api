const Rental = require('../models/rent');

// CRUD
exports.getAll = async (req, res) => {
    try {
        const rents = await Rental.findAll();
        res.status(200).json(rents);
    } catch (error) {
        res.status(500).json({
            error,
            message: 'Une erreur est survenue lors de la récupération.'
        });
    }
};

exports.getOneById = async (req, res) => {
    const rentId = req.params.id;

    try {
        const rent = await Rental.findByPk(rentId);
        if (!rent) return res.status(404).json({error: 'Location non trouvée'});
        res.json(rent);
    } catch (error) {
        res.status(500).json({
            error,
            message: 'Une erreur est survenue lors de la récupération.'
        });
    }
};

exports.create = async (req, res) => {
    // Recup data


    // Vérifier que la trott est dispo et que le user est connecté, qu'il n'a pas de resa en cours


    try {

    } catch (error) {

    }
};