// Middleware pour vérifier si l'utilisateur est connecté
const isAuthenticated = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Accès non autorisé. Vous devez vous connecter.' });
    }

    next();
};

module.exports = isAuthenticated;

// Il faudra ajouter la vérification si le user est bien en train de reservé la bonne trott