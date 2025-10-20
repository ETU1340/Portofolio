const Project = require('../models/project.model');

// Récupérer les projets avec filtre et tri
exports.getProjects = async (req, res) => {
    try {
        const { status, featured, technology } = req.query;
        let query = {};

        // Filtres dynamiques
        if (status) query.status = status;
        if (featured) query.featured = featured === 'true';
        if (technology) query.technologies = technology;

        const projects = await Project.find(query)
            .populate('technologies', 'name icon') // Pour avoir les détails des technologies
            .sort({ featured: -1, startDate: -1 });

        res.status(200).json({
            success: true,
            count: projects.length,
            data: projects
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erreur lors de la récupération des projets',
            error: error.message
        });
    }
};

// Obtenir les statistiques des projets
exports.getProjectStats = async (req, res) => {
    try {
        const stats = await Project.aggregate([
            // Grouper par status
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 },
                    technologies: { $addToSet: '$technologies' }
                }
            },
            // Ajouter le total des technologies uniques
            {
                $project: {
                    status: '$_id',
                    count: 1,
                    technologiesCount: { $size: '$technologies' }
                }
            }
        ]);

        res.status(200).json({
            success: true,
            data: stats
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erreur lors du calcul des statistiques',
            error: error.message
        });
    }
};

// Créer un nouveau projet
exports.createProject = async (req, res) => {
    try {
        const project = await Project.create(req.body);
        await project.populate('technologies', 'name icon');

        res.status(201).json({
            success: true,
            message: 'Projet créé avec succès',
            data: project
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Erreur lors de la création du projet',
            error: error.message
        });
    }
};

// Mettre à jour le statut d'un projet
exports.updateProjectStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const project = await Project.findByIdAndUpdate(
            req.params.id,
            { 
                status,
                ...(status === 'Terminé' ? { endDate: Date.now() } : {})
            },
            { new: true, runValidators: true }
        ).populate('technologies', 'name icon');

        if (!project) {
            return res.status(404).json({
                success: false,
                message: 'Projet non trouvé'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Statut du projet mis à jour',
            data: project
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Erreur lors de la mise à jour du statut',
            error: error.message
        });
    }
};