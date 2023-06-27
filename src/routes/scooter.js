const express = require('express');
const router = new express.Router();
const scooterController = require('../controllers/scooter');

router.get('/available', scooterController.available);
router.post('/:id/rent', scooterController.rent);
router.post('/:id/stop-rent', scooterController.stopRent);


router.get('/', scooterController.getAll);
router.get('/:id', scooterController.getOneById);
router.post('/', scooterController.create);
router.patch('/:id', scooterController.update);
router.delete('/:id', scooterController.delete);

module.exports = router;