const express = require('express');
const { submitContactForm, getContactMessages } = require('../controllers/contactController');
const { protect, admin } = require('../middlewares/auth');

const router = express.Router();

router.post('/', submitContactForm);
router.get('/', protect, admin, getContactMessages);

module.exports = router;