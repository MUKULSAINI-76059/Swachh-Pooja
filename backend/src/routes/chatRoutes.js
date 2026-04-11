const express = require('express');
const router = express.Router();
const { queryChat } = require('../controllers/chatController');

router.post('/query', queryChat);

module.exports = router;
