const Donut = require('../models/donut');

// Show all available donuts
const index = async (req, res) => {
    try {
        const donuts = await Donut.find({ available: true });

        res.render('donuts/index.ejs', {
            donuts,
        });
    } catch (err) {
        console.log(err);
        res.send('Something went wrong');
    }
};

// Show one donut
const show = async (req, res) => {
    try {
        const donut = await Donut.findById(req.params.id);

        if (!donut) {
            return res.send('Donut not found');
        }

        res.render('donuts/show.ejs', {
            donut,
        });
    } catch (err) {
        console.log(err);
        res.send('Something went wrong');
    }
};

// Show create donut form
const newDonut = async (req, res) => {
    res.render('donuts/new.ejs');
};

// Create donut
const create = async (req, res) => {
    try {
        await Donut.create(req.body);

        res.redirect('/donuts');
    } catch (err) {
        console.log(err);
        res.send('Something went wrong');
    }
};

// Show edit form
const edit = async (req, res) => {
    try {
        const donut = await Donut.findById(req.params.id);

        if (!donut) {
            return res.send('Donut not found');
        }

        res.render('donuts/edit.ejs', {
            donut,
        });
    } catch (err) {
        console.log(err);
        res.send('Something went wrong');
    }
};

// Update donut
const update = async (req, res) => {
    try {
        await Donut.findByIdAndUpdate(req.params.id, req.body);

        res.redirect(`/donuts/${req.params.id}`);
    } catch (err) {
        console.log(err);
        res.send('Something went wrong');
    }
};

// Delete donut
const deleteDonut = async (req, res) => {
    try {
        await Donut.findByIdAndDelete(req.params.id);

        res.redirect('/donuts');
    } catch (err) {
        console.log(err);
        res.send('Something went wrong');
    }
};

module.exports = {
    index,
    show,
    newDonut,
    create,
    edit,
    update,
    deleteDonut,
};