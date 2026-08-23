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
        min: 0,
    },

    image: {
        type: String,
        required: true,
    },

    category: {
        type: String,
        required: true,
    },

    available: {
        type: Boolean,
        default: true,
    },
});

const Donut = mongoose.model('Donut', donutSchema);

module.exports = Donut;