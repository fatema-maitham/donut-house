const User = require('../models/user');
const Donut = require('../models/donut');

// Redirect back to the page the user came from
const redirectBack = (req, res, fallback = '/donuts') => {
    const referrer = req.get('Referrer');

    res.redirect(referrer || fallback);
};


// ============================================
// ADD DONUT TO CART
// ============================================

const addToCart = async (req, res) => {
    try {
        const user = await User.findById(req.session.user._id);

        if (!user) {
            return res.status(404).send('User not found');
        }

        const donutId = req.params.id;

        // Make sure donut exists
        const donut = await Donut.findById(donutId);

        if (!donut) {
            return res.status(404).send('Donut not found');
        }

        // Find existing item
        const existingItem = user.cart.find(
            item => item.donutId.toString() === donutId
        );

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            user.cart.push({
                donutId: donutId,
                quantity: 1
            });
        }

        await user.save();

        // Stay on Menu page
        redirectBack(req, res, '/donuts');

    } catch (err) {
        console.error('ADD TO CART ERROR:', err);
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
        console.error('CART INDEX ERROR:', err);
        res.status(500).send('Something went wrong');
    }
};


// ============================================
// INCREASE QUANTITY
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

        redirectBack(req, res, '/cart');

    } catch (err) {
        console.error('INCREASE CART ERROR:', err);
        res.status(500).send('Something went wrong');
    }
};


// ============================================
// DECREASE QUANTITY
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
            return redirectBack(req, res, '/donuts');
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

        redirectBack(req, res, '/donuts');

    } catch (err) {
        console.error('DECREASE CART ERROR:', err);
        res.status(500).send('Something went wrong');
    }
};


// ============================================
// REMOVE ENTIRE ITEM
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

        redirectBack(req, res, '/cart');

    } catch (err) {
        console.error('REMOVE CART ERROR:', err);
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