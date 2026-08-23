const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },

        address: {
            type: String,
            required: true,
        },

        city: {
            type: String,
            required: true,
        },

        phone: {
            type: String,
            required: true,
        },

        openingHours: {
            type: String,
            required: true,
        },

        available: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Location', locationSchema);