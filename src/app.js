require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');

// Initialize express
const app = express();

// Connect to database
connectDB();

// Import des routes
const projectRoutes = require('./routes/project.routes');
const experienceRoutes = require('./routes/experience.routes');
const educationRoutes = require('./routes/education.routes');
const skillRoutes = require('./routes/skill.routes');
const authRoutes = require('./routes/auth.routes');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Routes
app.use('/api/projects', projectRoutes);
app.use('/api/experiences', experienceRoutes);
app.use('/api/education', educationRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Portfolio API' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Une erreur est survenue!',
        error: process.env.NODE_ENV === 'development' ? err.message : {}
    });
});

module.exports = app;
