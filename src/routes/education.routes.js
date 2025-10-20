const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
    getEducation,
    createEducation,
    addCertification
} = require('../controllers/education.controller');

// Routes publiques
router.get('/', getEducation); // Récupérer tout le parcours éducatif

// Routes protégées
router.post('/', auth, createEducation); // Créer une nouvelle formation
router.post('/:id/certifications', auth, addCertification); // Ajouter une certification

module.exports = router;