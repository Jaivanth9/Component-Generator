// Placeholder for backend/controllers/authController.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = user => jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

exports.signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.create({ email, password });
  const token = generateToken(user);
  res.json({ token, user: { email: user.email } });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = generateToken(user);
  res.json({ token, user: { email: user.email } });
};
