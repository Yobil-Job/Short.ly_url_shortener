const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Registration
router.get('/register', authController.getRegister);
router.post('/register', authController.postRegister);

// Login
router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);

// Logout
router.get('/logout', authController.logout);

module.exports = router;