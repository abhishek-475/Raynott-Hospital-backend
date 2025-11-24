const express = require('express');
const { register, login, getMe, registerAdmin } = require('../controllers/authController');
const { protect, admin } = require('../middlewares/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.post('/register-admin', protect, admin, registerAdmin); // Only admins can create other admins

module.exports = router;