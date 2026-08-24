const User = require('../models/user');

// Helper: redirect back to same page
const redirectBack = (req, res, fallback = '/cart') => {
    res.redirect(req.body.redirectTo || req.get('Referrer') || fallback);
};

// ADD donut to cart
const addToCart = async (req, res) => {
    try {
        const user = await User.findById(req.session.user._id);

        if (!user) {
            return res.status(404).send('User not found');
        }

        const donutId = req.params.id;

        const existingItem = user.cart.find(
            (item) => item.donutId.toString() === donutId
        );

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            user.cart.push({
                donutId,
                quantity: 1,
            });
        }

        await user.save();

        redirectBack(req, res, '/donuts');
    } catch (err) {
        console.log(err);
        res.send('Something went wrong');
    }
};

// SHOW cart page
const index = async (req, res) => {
    try {
        const user = await User.findById(req.session.user._id)
            .populate('cart.donutId');

        if (!user) {
            return res.status(404).send('User not found');
        }

        res.render('cart/index.ejs', {
            cart: user.cart,
        });
    } catch (err) {
        console.log(err);
        res.send('Something went wrong');
    }
};

// INCREASE quantity
const increase = async (req, res) => {
    try {
        const user = await User.findById(req.session.user._id);

        if (!user) {
            return res.status(404).send('User not found');
        }

        const item = user.cart.find(
            (item) => item.donutId.toString() === req.params.id
        );

        if (item) {
            item.quantity += 1;
        }

        await user.save();

        redirectBack(req, res, '/cart');
    } catch (err) {
        console.log(err);
        res.send('Something went wrong');
    }
};

// DECREASE quantity
const decrease = async (req, res) => {
    try {
        const user = await User.findById(req.session.user._id);

        if (!user) {
            return res.status(404).send('User not found');
        }

        const item = user.cart.find(
            (item) => item.donutId.toString() === req.params.id
        );

        if (item) {
            if (item.quantity > 1) {
                item.quantity -= 1;
            } else {
                user.cart = user.cart.filter(
                    (cartItem) =>
                        cartItem.donutId.toString() !== req.params.id
                );
            }
        }

        await user.save();

        redirectBack(req, res, '/cart');
    } catch (err) {
        console.log(err);
        res.send('Something went wrong');
    }
};

// REMOVE item completely
const remove = async (req, res) => {
    try {
        const user = await User.findById(req.session.user._id);

        if (!user) {
            return res.status(404).send('User not found');
        }

        user.cart = user.cart.filter(
            (item) => item.donutId.toString() !== req.params.id
        );

        await user.save();

        redirectBack(req, res, '/cart');
    } catch (err) {
        console.log(err);
        res.send('Something went wrong');
    }
};

module.exports = {
    addToCart,
    index,
    increase,
    decrease,
    remove,
};