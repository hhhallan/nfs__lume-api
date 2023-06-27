const express = require('express');
const router = new express.Router();
const scooterController = require('../controllers/scooter');

router.get('/', scooterController.getAll);
router.get('/:id', scooterController.getOneById);

module.exports = router;