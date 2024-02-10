const express = require('express');
const router = express.Router();

// Auth controller
const authController = require('../controllers/authController');

// Routes
router.post('/login', authController.login);
router.post('/signup', authController.signup);

module.exports = router;
