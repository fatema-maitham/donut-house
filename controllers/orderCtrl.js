const Order = require('../models/Order');
const Donut = require('../models/donut');
const Location = require('../models/Location');

// GET user's orders
const index = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.session.user._id })
            .populate('location')
            .populate('items.donut');

        res.render('orders/index.ejs', {
            orders,
        });
    } catch (err) {
        console.log(err);
        res.send('Something went wrong');
    }
};

// GET one order
const show = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('location')
            .populate('items.donut');

        res.render('orders/show.ejs', {
            order,
        });
    } catch (err) {
        console.log(err);
        res.send('Something went wrong');
    }
};

// POST one order
const create = async (req, res) => {
    try {
        const user = req.session.user;
        const location = req.body.location;

        if (!user.cart || user.cart.length === 0) {
            return res.send('Your cart is empty');
        }

        const items = [];

        for (const cartItem of user.cart) {
            const donut = await Donut.findById(cartItem.donutId);

            items.push({
                donut: donut._id,
                quantity: cartItem.quantity,
                price: donut.price,
            });
        }

        const total = items.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );

        const order = await Order.create({
            user: user._id,
            location,
            items,
            total,
        });

        user.cart = [];
        await user.save();

        res.redirect(`/orders/${order._id}`);
    } catch (err) {
        console.log(err);
        res.send('Something went wrong');
    }
};

const newOrder = async (req, res) => {
    try {
        const locations = await Location.find({ available: true });

        res.render('orders/new.ejs', {
            locations,
        });
    } catch (err) {
        console.log(err);
        res.send('Something went wrong');
    }
};

module.exports = {
    index,
    show,
    new: newOrder,
    create,
};