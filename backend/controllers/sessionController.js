// controllers/sessionController.js
const Session = require('../models/Session');

exports.getSessionById = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }
    res.status(200).json(session);
  } catch (err) {
    console.error('Get session by ID error:', err);
    res.status(500).json({ message: 'Failed to fetch session' });
  }
};
