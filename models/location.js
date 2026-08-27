const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        address: {
            type: String,
            required: true,
            trim: true,
        },

        city: {
            type: String,
            required: true,
            trim: true,
        },

        phone: {
            type: String,
            required: true,
            trim: true,
        },

        openingTime: {
            type: String,
            required: true,
            trim: true,
        },

        closingTime: {
            type: String,
            required: true,
            trim: true,
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