const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
    institution: {
        type: String,
        required: [true, 'Le nom de l\'établissement est requis'],
        trim: true
    },
    degree: {
        type: String,
        required: [true, 'Le diplôme est requis'],
        trim: true
    },
    field: {
        type: String,
        required: [true, 'Le domaine d\'étude est requis'],
        trim: true
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
        type: String
    },
    achievements: [{
        type: String
    }],
    certifications: [{
        name: {
            type: String,
            required: true
        },
        issuer: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        credentialUrl: {
            type: String
        }
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Education', educationSchema);