const User = require('../models/user');
const Donut = require('../models/donut');

// Redirect back
const redirectBack = (req, res, fallback = '/donuts') => {
    const referrer = req.get('Referrer');
    res.redirect(referrer || fallback);
};

// ============================================
// ADD DONUT
// ============================================

const addToCart = async (req, res) => {
    try {
        const user = await User.findById(req.session.user._id);

        if (!user) {
            return res.status(404).send('User not found');
        }

        const donut = await Donut.findById(req.params.id);

        if (!donut) {
            return res.status(404).send('Donut not found');
        }

        const existingItem = user.cart.find(
            item => item.donutId.toString() === req.params.id
        );

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            user.cart.push({
                donutId: donut._id,
                quantity: 1
            });
        }

        await user.save();

        redirectBack(req, res, '/donuts');
    } catch (err) {
        res.status(500).send('Something went wrong');
    }
};

// ============================================
// SHOW CART
// ============================================

const index = async (req, res) => {
    try {
        const user = await User.findById(req.session.user._id)
            .populate('cart.donutId');

        if (!user) {
            return res.status(404).send('User not found');
        }

        res.render('cart/index.ejs', {
            cart: user.cart,
            user: user
        });
    } catch (err) {
        res.status(500).send('Something went wrong');
    }
};

// ============================================
// INCREASE
// ============================================

const increase = async (req, res) => {
    try {
        const user = await User.findById(req.session.user._id);

        if (!user) {
            return res.status(404).send('User not found');
        }

        const item = user.cart.find(
            item => item.donutId.toString() === req.params.id
        );

        if (!item) {
            return res.status(404).send('Cart item not found');
        }

        item.quantity += 1;

        await user.save();

        res.redirect('/cart');
    } catch (err) {
        res.status(500).send('Something went wrong');
    }
};

// ============================================
// DECREASE
// ============================================

const decrease = async (req, res) => {
    try {
        const user = await User.findById(req.session.user._id);

        if (!user) {
            return res.status(404).send('User not found');
        }

        const item = user.cart.find(
            item => item.donutId.toString() === req.params.id
        );

        if (!item) {
            return res.redirect('/cart');
        }

        if (item.quantity > 1) {
            item.quantity -= 1;
        } else {
            user.cart = user.cart.filter(
                cartItem =>
                    cartItem.donutId.toString() !== req.params.id
            );
        }

        await user.save();

        res.redirect('/cart');
    } catch (err) {
        res.status(500).send('Something went wrong');
    }
};

// ============================================
// REMOVE
// ============================================

const remove = async (req, res) => {
    try {
        const user = await User.findById(req.session.user._id);

        if (!user) {
            return res.status(404).send('User not found');
        }

        user.cart = user.cart.filter(
            item =>
                item.donutId.toString() !== req.params.id
        );

        await user.save();

        res.redirect('/cart');
    } catch (err) {
        res.status(500).send('Something went wrong');
    }
};

module.exports = {
    addToCart,
    index,
    increase,
    decrease,
    remove
};