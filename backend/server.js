// Placeholder for backend/server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./utils/connectDB');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Connect to DB
connectDB();

// Routes
app.use('/api/auth', require('./routes/authRoutes'));

app.use('/api/session', require('./routes/sessionRoutes'));
app.use('/api/chat', require('./routes/chatRoutes'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
