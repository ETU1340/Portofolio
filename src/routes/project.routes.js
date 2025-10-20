const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
    getProjects,
    getProjectStats,
    createProject,
    updateProjectStatus
} = require('../controllers/project.controller');

// Routes publiques
router.get('/', getProjects); // Récupérer tous les projets avec filtres
router.get('/stats', getProjectStats); // Obtenir les statistiques des projets

// Routes protégées (nécessitent authentification)
router.post('/', auth, createProject); // Créer un nouveau projet
router.patch('/:id/status', auth, updateProjectStatus); // Mettre à jour le statut d'un projet

module.exports = router;