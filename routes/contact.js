const express = require('express');
const router = express.Router();
const { submitContactForm, getContactMessages } = require('../controllers/contactController');

router.post('/', submitContactForm);
router.get('/', getContactMessages); // For admin to view messages

module.exports = router;