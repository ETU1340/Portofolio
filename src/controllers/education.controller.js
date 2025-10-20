const Education = require('../models/education.model');

// Récupérer le parcours éducatif
exports.getEducation = async (req, res) => {
    try {
        const education = await Education.find()
            .sort({ startDate: -1 });

        // Grouper par type de certification
        const certifications = await Education.aggregate([
            { $unwind: '$certifications' },
            {
                $group: {
                    _id: '$certifications.issuer',
                    count: { $sum: 1 },
                    certificates: { $push: '$certifications' }
                }
            },
            { $sort: { '_id': 1 } }
        ]);

        res.status(200).json({
            success: true,
            data: {
                education,
                certifications
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erreur lors de la récupération du parcours éducatif',
            error: error.message
        });
    }
};

// Ajouter une certification à une formation
exports.addCertification = async (req, res) => {
    try {
        const education = await Education.findById(req.params.id);
        
        if (!education) {
            return res.status(404).json({
                success: false,
                message: 'Formation non trouvée'
            });
        }

        education.certifications.push(req.body);
        await education.save();

        res.status(200).json({
            success: true,
            message: 'Certification ajoutée avec succès',
            data: education
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Erreur lors de l\'ajout de la certification',
            error: error.message
        });
    }
};

// Créer une nouvelle formation
exports.createEducation = async (req, res) => {
    try {
        // Si c'est une formation en cours, mettre à jour les autres
        if (req.body.current) {
            await Education.updateMany(
                { current: true },
                { current: false }
            );
        }

        const education = await Education.create(req.body);

        res.status(201).json({
            success: true,
            message: 'Formation créée avec succès',
            data: education
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Erreur lors de la création de la formation',
            error: error.message
        });
    }
};