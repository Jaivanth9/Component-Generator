const Session = require('../models/Session');

/**
 * Get all sessions for the authenticated user, sorted by most recent.
 */
exports.getSessions = async (req, res) => {
  try {
    // Find all sessions for the user, sorted by creation order (ascending)
    const sessions = await Session.find({ user: req.user.id }).sort({ createdAt: 1 });
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch sessions' });
  }
};

/**
 * Create a new session for the authenticated user.
 * Name the session as "Session 1", "Session 2", ... based on the count of existing sessions.
 */
exports.createSession = async (req, res) => {
  try {
    // Count existing sessions for this user
    const sessionCount = await Session.countDocuments({ user: req.user.id });
    const name = `Session ${sessionCount + 1}`;

    const newSession = await Session.create({
      user: req.user.id,
      jsx: '',
      css: '',
      name
    });
    res.json(newSession);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create session' });
  }
};

/**
 * (Optional) Get a single session by ID for the authenticated user.
 * This can be used if you want to fetch a session's data by its ID.
 */
exports.getSessionById = async (req, res) => {
  try {
    const session = await Session.findOne({ _id: req.params.id, user: req.user.id });
    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }
    res.json(session);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch session' });
  }
};
