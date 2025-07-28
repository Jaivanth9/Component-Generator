const mongoose = require('mongoose');

const geminiComponentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  prompt: {
    type: String,
    required: true,
  },
  jsx: {
    type: String,
    required: true,
  },
  css: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('GeminiComponent', geminiComponentSchema);
