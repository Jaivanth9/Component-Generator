// Placeholder for backend/models/Session.js
const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  jsx: { type: String, default: '' },
  css: { type: String, default: '' },
  name: { type: String, default: 'Untitled' }
});

module.exports = mongoose.model('Session', sessionSchema);
