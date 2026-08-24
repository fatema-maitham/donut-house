const mongoose = require('mongoose');

const donutSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    price: {
        type: Number,
        required: true,
    },

    category: {
        type: String,
        required: true,
        enum: ['classic', 'special', 'box', 'weekend'], // Added weekend here
    },

    image: {
        type: String,
        required: true,
    },

    available: {
        type: Boolean,
        default: true,
    },
});

module.exports = mongoose.model('Donut', donutSchema);