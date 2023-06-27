const express = require('express');
const router = new express.Router();
const userController = require('../controllers/user');

/* * * * * * *
*  C R U D
* * * * * * */
// Obtenir tous les utilisateurs
router.get('/', userController.getAll);
// Obtenir un utilisateur via son ID
router.get('/:id', userController.getOneById);
// Création d'un utilisateur
router.post('/', userController.create);
// Edition d'un utilisateur via son ID
router.patch('/:id', userController.update);
// Suppression d'un utilisateur via son ID
router.delete('/:id', userController.delete);

/* * * * * * *
*  User
* * * * * * */
// Connexion
router.post('/login', userController.login);
// Déconnexion
router.post('/logout', userController.logout);
// Mot de passe oublié
router.post('/forgot-password', userController.forgotPassword);
// Réinitialisation du mot de passe
router.post('/reset-password', userController.resetPassword);



module.exports = router;