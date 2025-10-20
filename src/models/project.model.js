const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Le titre du projet est requis'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'La description est requise'],
        trim: true
    },
    thumbnail: {
        type: String,
        required: [true, 'L\'image du projet est requise']
    },
    technologies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Skill',
        required: true
    }],
    githubLink: {
        type: String,
        required: false
    },
    demoLink: {
        type: String,
        required: false
    },
    featured: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ['En cours', 'Terminé', 'En pause'],
        default: 'En cours'
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Project', projectSchema);