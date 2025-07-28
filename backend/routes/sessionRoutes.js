const express = require('express');
const router = express.Router();
const { getSessions, createSession } = require('../controllers/sessionController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, getSessions);         // ✅ Protected
router.post('/create', authMiddleware, createSession);
router.get('/:id', requireLogin, getSessionById);

module.exports = router;
