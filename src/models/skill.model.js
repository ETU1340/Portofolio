const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Le nom de la compétence est requis'],
        trim: true
    },
    category: {
        type: String,
        required: [true, 'La catégorie est requise'],
        enum: ['Frontend', 'Backend', 'Database', 'DevOps', 'Mobile', 'Other'],
        trim: true
    },
    proficiencyLevel: {
        type: Number,
        required: true,
        min: [1, 'Le niveau minimum est 1'],
        max: [5, 'Le niveau maximum est 5']
    },
    icon: {
        type: String,
        required: false
    },
    yearStarted: {
        type: Number,
        required: true
    },
    featured: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Skill', skillSchema);