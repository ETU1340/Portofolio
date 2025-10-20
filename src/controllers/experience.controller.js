const Experience = require('../models/experience.model');

// Récupérer les expériences avec chronologie
exports.getExperiences = async (req, res) => {
    try {
        const experiences = await Experience.find()
            .populate('technologies', 'name icon')
            .sort({ current: -1, startDate: -1 }); // Trie par expérience actuelle puis par date

        // Calcul de la durée totale d'expérience
        const totalExperience = experiences.reduce((total, exp) => {
            const end = exp.current ? new Date() : exp.endDate;
            const duration = end - exp.startDate;
            return total + duration;
        }, 0);

        res.status(200).json({
            success: true,
            totalYearsExperience: Math.floor(totalExperience / (1000 * 60 * 60 * 24 * 365)),
            data: experiences
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erreur lors de la récupération des expériences',
            error: error.message
        });
    }
};

// Obtenir un résumé des compétences par expérience
exports.getExperienceSkillsSummary = async (req, res) => {
    try {
        const summary = await Experience.aggregate([
            // Dérouler le tableau technologies
            { $unwind: '$technologies' },
            // Grouper par technologie
            {
                $group: {
                    _id: '$technologies',
                    experienceCount: { $sum: 1 },
                    companies: { $addToSet: '$company' }
                }
            },
            // Ajouter les détails des technologies
            {
                $lookup: {
                    from: 'skills',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'skillDetails'
                }
            }
        ]);

        res.status(200).json({
            success: true,
            data: summary
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erreur lors de la récupération du résumé',
            error: error.message
        });
    }
};

// Créer une nouvelle expérience
exports.createExperience = async (req, res) => {
    try {
        // Si c'est une expérience actuelle, on s'assure qu'il n'y en a pas d'autre
        if (req.body.current) {
            await Experience.updateMany(
                { current: true },
                { current: false }
            );
        }

        const experience = await Experience.create(req.body);
        await experience.populate('technologies', 'name icon');

        res.status(201).json({
            success: true,
            message: 'Expérience créée avec succès',
            data: experience
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Erreur lors de la création de l\'expérience',
            error: error.message
        });
    }
};