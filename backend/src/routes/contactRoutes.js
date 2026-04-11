const express = require('express');
const router = express.Router();
const { createContactMessage } = require('../controllers/contactController');

router.post('/', createContactMessage);

module.exports = router;
