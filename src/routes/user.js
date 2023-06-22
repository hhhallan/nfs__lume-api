const express = require('express');
const User = require('../models/user');
const authentification = require('../middlewares/authentification');
const router = new express.Router();
const { Op } = require('sequelize');
const userController = require('../controllers/user');

/* * * * * * *
*  C R U D
* * * * * * */
// GET: Obtenir tous les utilisateurs
router.get('/', userController.getAll);
// GET: Obtenir un utilisateur via son ID
router.get('/:id', userController.getOneById);
// POST: Création d'un utilisateur
router.post('/', userController.create);
// PATCH: Edition d'un utilisateur via son ID
router.patch('/:id', userController.update);
// DELETE: Suppression d'un utilisateur via son ID
router.delete('/:id', userController.delete);

/* * * * * * *
*  Authentification
* * * * * * */
// Connexion
router.post('/login', userController.login);
// Déconnexion
router.post('/logout', userController.logout);

module.exports = router;