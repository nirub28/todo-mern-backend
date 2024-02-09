const express = require('express');
const router = express.Router();

// Auth controller
const authController = require('../controllers/authController');

// Routes
router.post('/login', authController.login);
router.post('/checkUsername', authController.checkUsernameAvailability);
router.post('/register', authController.signup);

module.exports = router;
