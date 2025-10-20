const Skill = require('../models/skill.model');

// Get skills grouped by category
exports.getSkillsByCategory = async (req, res) => {
    try {
        const skills = await Skill.aggregate([
            {
                $group: {
                    _id: '$category',
                    skills: { $push: '$$ROOT' }
                }
            },
            {
                $sort: { '_id': 1 }
            }
        ]);

        res.status(200).json({
            success: true,
            data: skills
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erreur lors de la récupération des compétences',
            error: error.message
        });
    }
};

// Get featured skills
exports.getFeaturedSkills = async (req, res) => {
    try {
        const skills = await Skill.find({ featured: true })
            .sort({ proficiencyLevel: -1 });

        res.status(200).json({
            success: true,
            count: skills.length,
            data: skills
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erreur lors de la récupération des compétences mises en avant',
            error: error.message
        });
    }
};

// Add new skill
exports.addSkill = async (req, res) => {
    try {
        const skill = await Skill.create(req.body);

        res.status(201).json({
            success: true,
            message: 'Compétence ajoutée avec succès',
            data: skill
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Erreur lors de l\'ajout de la compétence',
            error: error.message
        });
    }
};

// Update skill
exports.updateSkill = async (req, res) => {
    try {
        const skill = await Skill.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!skill) {
            return res.status(404).json({
                success: false,
                message: 'Compétence non trouvée'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Compétence mise à jour avec succès',
            data: skill
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Erreur lors de la mise à jour de la compétence',
            error: error.message
        });
    }
};