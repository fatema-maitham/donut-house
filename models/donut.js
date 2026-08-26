const mongoose = require('mongoose');

const donutSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },

    description: {
        type: String,
        required: true,
        trim: true,
    },

    price: {
        type: Number,
        required: true,
        min: 0,
    },

    category: {
        type: String,
        required: true,
        enum: ['classic', 'special', 'box', 'weekend'],
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