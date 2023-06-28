const express = require('express');
const router = new express.Router();
const isAuthenticated = require('../middlewares/auth');
const scooterController = require('../controllers/scooter');

// Users
router.get('/available', scooterController.available);
// router.post('/:id/rent', isAuthenticated, scooterController.rent);
// router.post('/:id/stop-rent', isAuthenticated, scooterController.stopRent);

// Admin
router.get('/', scooterController.getAll);
router.get('/:id', scooterController.getOneById);
router.post('/', scooterController.create);
router.patch('/:id', scooterController.update);
router.delete('/:id', scooterController.delete);

module.exports = router;