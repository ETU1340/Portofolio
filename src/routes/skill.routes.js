const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
    getSkillsByCategory,
    getFeaturedSkills,
    addSkill,
    updateSkill
} = require('../controllers/skill.controller');

// Routes publiques
router.get('/categories', getSkillsByCategory);
router.get('/featured', getFeaturedSkills);

// Routes protégées
router.post('/', auth, addSkill);
router.put('/:id', auth, updateSkill);

module.exports = router;