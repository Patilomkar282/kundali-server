const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

// Basic routes without validation for now
router.post('/register', register);
router.post('/login', login);

module.exports = router;