const User = require('../models/user');

const addToCart = async (req, res) => {
    try {
        const user = await User.findById(req.session.user._id);

        const donutId = req.params.id;

        const existingItem = user.cart.find(
            (item) => item.donutId.toString() === donutId
        );

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            user.cart.push({
                donutId: donutId,
                quantity: 1,
            });
        }

        await user.save();

        res.redirect('/cart');
    } catch (err) {
        console.log(err);
        res.send('Something went wrong');
    }
};


const index = async (req, res) => {
    try {
        const user = await User.findById(req.session.user._id)
            .populate('cart.donutId');

        res.render('cart/index.ejs', {
            cart: user.cart,
        });
    } catch (err) {
        console.log(err);
        res.send('Something went wrong');
    }
};


// Increase quantity
const increase = async (req, res) => {
    try {
        const user = await User.findById(req.session.user._id);

        const item = user.cart.find(
            (item) => item.donutId.toString() === req.params.id
        );

        if (item) {
            item.quantity += 1;
        }

        await user.save();

        res.redirect('/cart');
    } catch (err) {
        console.log(err);
        res.send('Something went wrong');
    }
};


// Decrease quantity
const decrease = async (req, res) => {
    try {
        const user = await User.findById(req.session.user._id);

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

        res.redirect('/cart');
    } catch (err) {
        console.log(err);
        res.send('Something went wrong');
    }
};


// Remove item
const remove = async (req, res) => {
    try {
        const user = await User.findById(req.session.user._id);

        user.cart = user.cart.filter(
            (item) =>
                item.donutId.toString() !== req.params.id
        );

        await user.save();

        res.redirect('/cart');
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