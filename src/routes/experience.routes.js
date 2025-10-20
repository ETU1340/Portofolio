const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
    getExperiences,
    getExperienceSkillsSummary,
    createExperience
} = require('../controllers/experience.controller');

// Routes publiques
router.get('/', getExperiences); // Récupérer toutes les expériences
router.get('/skills-summary', getExperienceSkillsSummary); // Obtenir le résumé des compétences

// Routes protégées
router.post('/', auth, createExperience); // Créer une nouvelle expérience

module.exports = router;