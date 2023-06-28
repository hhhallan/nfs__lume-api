const express = require('express');
const router = new express.Router();
const userController = require('../controllers/user');


router.get('/', userController.getAll);
router.get('/:id', userController.getOneById);
router.post('/', userController.create);
router.patch('/:id', userController.update);
router.delete('/:id', userController.delete);

router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.post('/forgot-password', userController.forgotPassword);
router.post('/reset-password', userController.resetPassword);



module.exports = router;