const Location = require('../models/location');

// =========================
// CUSTOMER + ADMIN
// =========================

// GET /locations
const index = async (req, res) => {
    try {
        const locations = await Location.find().sort({ name: 1 });

        res.render('locations/index.ejs', {
            locations,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Unable to load locations.');
    }
};

// GET /locations/:id
const show = async (req, res) => {
    try {
        const location = await Location.findById(req.params.id);

        if (!location) {
            return res.status(404).render('404.ejs');
        }

        return res.render('locations/show.ejs', {
            location,
        });
    } catch (error) {
        return res.status(404).render('404.ejs');
    }
};

// =========================
// ADMIN
// =========================

// GET /locations/new
const newLocation = (req, res) => {
    res.render('locations/new.ejs');
};

// POST /locations
const create = async (req, res) => {
    try {
        await Location.create({
            name: req.body.name,
            address: req.body.address,
            city: req.body.city,
            phone: req.body.phone,
            openingTime: req.body.openingTime,
            closingTime: req.body.closingTime,
            available: req.body.available === 'true',
        });

        res.redirect('/locations');
    } catch (error) {
        res.status(400).send('Unable to create location.');
    }
};

// GET /locations/:id/edit
const edit = async (req, res) => {
    try {
        const location = await Location.findById(req.params.id);

        if (!location) {
            return res.status(404).render('404.ejs');
        }

        return res.render('locations/edit.ejs', {
            location,
        });
    } catch (error) {
        return res.status(404).render('404.ejs');
    }
};

// PUT /locations/:id
const update = async (req, res) => {
    try {
        const location = await Location.findById(req.params.id);

        if (!location) {
            return res.status(404).render('404.ejs');
        }

        location.name = req.body.name;
        location.address = req.body.address;
        location.city = req.body.city;
        location.phone = req.body.phone;
        location.openingTime = req.body.openingTime;
        location.closingTime = req.body.closingTime;
        location.available = req.body.available === 'true';

        await location.save();

        res.redirect(`/locations/${location._id}`);
    } catch (error) {
        res.status(400).send('Unable to update location.');
    }
};

// DELETE /locations/:id
const destroy = async (req, res) => {
    try {
        const location = await Location.findByIdAndDelete(req.params.id);

        if (!location) {
            return res.status(404).render('404.ejs');
        }

        res.redirect('/locations');
    } catch (error) {
        res.status(400).send('Unable to delete location.');
    }
};

module.exports = {
    index,
    show,
    newLocation,
    create,
    edit,
    update,
    destroy,
};