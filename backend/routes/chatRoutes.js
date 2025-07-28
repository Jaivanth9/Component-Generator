const express = require('express');
const router = express.Router();
const { handlePrompt } = require('../controllers/chatController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/prompt', authMiddleware, handlePrompt);

module.exports = router;
