const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, 'Le nom de l\'entreprise est requis'],
        trim: true
    },
    position: {
        type: String,
        required: [true, 'Le poste est requis'],
        trim: true
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        enum: ['CDI', 'CDD', 'Stage', 'Freelance', 'Autre'],
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date
    },
    current: {
        type: Boolean,
        default: false
    },
    description: {
        type: String,
        required: [true, 'La description est requise']
    },
    achievements: [{
        type: String,
        required: true
    }],
    technologies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Skill'
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Experience', experienceSchema);