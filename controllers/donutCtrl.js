const Donut = require('../models/donut');

const User = require('../models/user');


// ============================================
// CUSTOMER — SHOW AVAILABLE DONUTS
// ============================================

const index = async (req, res) => {

    try {

        const donuts = await Donut.find({
            available: true
        });

        const cartQuantities = {};

        if (req.session.user) {

            const currentUser = await User
                .findById(req.session.user._id)
                .select('cart');

            if (currentUser && currentUser.cart) {

                currentUser.cart.forEach((item) => {

                    if (item.donutId) {

                        cartQuantities[
                            item.donutId.toString()
                        ] = item.quantity;

                    }

                });

            }

        }

        res.render('donuts/index.ejs', {

            donuts,

            cartQuantities,

        });

    } catch (err) {

        res.send('Something went wrong');

    }

};


// ============================================
// ADMIN — SHOW ALL DONUTS
// ============================================

const adminIndex = async (req, res) => {

    try {

        const donuts = await Donut.find()
            .sort({
                createdAt: -1
            });

        res.render('donuts/admin-index.ejs', {

            donuts,

        });

    } catch (err) {

        res.send('Something went wrong');

    }

};


// ============================================
// SHOW ONE DONUT
// ============================================

const show = async (req, res) => {

    try {

        const donut = await Donut.findById(
            req.params.id
        );

        if (!donut) {

            return res.send('Donut not found');

        }

        res.render('donuts/show.ejs', {

            donut,

        });

    } catch (err) {
        res.send('Something went wrong');

    }

};


// ============================================
// ADMIN — SHOW CREATE FORM
// ============================================

const newDonut = async (req, res) => {

    res.render('donuts/new.ejs');

};


// ============================================
// ADMIN — CREATE DONUT
// ============================================

const create = async (req, res) => {

    try {

        await Donut.create({

            name: req.body.name,

            description: req.body.description,

            price: req.body.price,

            category: req.body.category,

            image: req.file
                ? req.file.path
                : '',

            available:
                req.body.available === 'true',

        });

        res.redirect('/donuts/admin');

    } catch (err) {
        res.send('Something went wrong');

    }

};


// ============================================
// ADMIN — SHOW EDIT FORM
// ============================================

const edit = async (req, res) => {

    try {

        const donut = await Donut.findById(
            req.params.id
        );

        if (!donut) {

            return res.send('Donut not found');

        }

        res.render('donuts/edit.ejs', {

            donut,

        });

    } catch (err) {
        res.send('Something went wrong');

    }

};


// ============================================
// ADMIN — UPDATE DONUT
// ============================================

const update = async (req, res) => {

    try {

        const donut = await Donut.findById(
            req.params.id
        );

        if (!donut) {

            return res
                .status(404)
                .send('Donut not found');

        }

        donut.name =
            req.body.name;

        donut.description =
            req.body.description;

        donut.price =
            req.body.price;

        donut.category =
            req.body.category;

        donut.available =
            req.body.available === 'true';


        if (req.file) {

            donut.image =
                req.file.path;

        }

        await donut.save();

        res.redirect(
            `/donuts/admin`
        );

    } catch (err) {
        res.send('Something went wrong');

    }

};


// ============================================
// ADMIN — DELETE DONUT
// ============================================

const deleteDonut = async (req, res) => {

    try {

        await Donut.findByIdAndDelete(
            req.params.id
        );

        res.redirect(
            '/donuts/admin'
        );

    } catch (err) {
        res.send('Something went wrong');

    }

};


// ============================================
// EXPORTS
// ============================================

module.exports = {

    index,

    adminIndex,

    show,

    newDonut,

    create,

    edit,

    update,

    deleteDonut,

};
