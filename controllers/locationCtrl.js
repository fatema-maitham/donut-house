const Location = require('../models/Location');

// GET all locations
const index = async (req, res) => {
    try {
        const locations = await Location.find({});

        res.render('locations/index.ejs', {
            locations,
        });
    } catch (err) {
        console.log(err);
        res.send('Something went wrong');
    }
};

// GET one location
const show = async (req, res) => {
    try {
        const location = await Location.findById(req.params.id);

        res.render('locations/show.ejs', {
            location,
        });
    } catch (err) {
        console.log(err);
        res.send('Something went wrong');
    }
};

const newLocation = async (req, res) => {
    res.render('locations/new.ejs');
};

const create = async (req, res) => {
    try {
        req.body.available = req.body.available === 'true';

        await Location.create(req.body);

        res.redirect('/locations');
    } catch (error) {
        console.log(error);
        res.send(error);
    }
};

const edit = async (req, res) => {
    try {
        const location = await Location.findById(req.params.id);

        res.render('locations/edit.ejs', {
            location,
        });
    } catch (err) {
        console.log(err);
        res.send('Something went wrong');
    }
};

const update = async (req, res) => {
    try {
        req.body.available = req.body.available === 'true';

        await Location.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.redirect(`/locations/${req.params.id}`);
    } catch (err) {
        console.log(err);
        res.send('Something went wrong');
    }
};

module.exports = {
    index,
    show,
    new: newLocation,
    create,
    edit,
    update,
};