const Order = require('../models/Order');
const Donut = require('../models/donut');
const Location = require('../models/Location');
const User = require('../models/user');

// GET user's orders
const index = async (req, res) => {
    try {
        const orders = await Order.find({
            user: req.session.user._id,
        })
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

        if (!order) {
            return res.send('Order not found');
        }

        // Customer can only see their own order
        if (
            req.session.user.role !== 'admin' &&
            order.user.toString() !== req.session.user._id.toString()
        ) {
            return res.status(403).send('Access denied');
        }

        res.render('orders/show.ejs', {
            order,
        });
    } catch (err) {
        console.log(err);
        res.send('Something went wrong');
    }
};

// GET checkout page
const newOrder = async (req, res) => {
    try {
        const locations = await Location.find({
            available: true,
        });

        res.render('orders/new.ejs', {
            locations,
        });
    } catch (err) {
        console.log(err);
        res.send('Something went wrong');
    }
};

// CREATE order from cart
const create = async (req, res) => {
    try {
        const user = await User.findById(req.session.user._id);

        const location = req.body.location;

        if (!user.cart || user.cart.length === 0) {
            return res.send('Your cart is empty');
        }

        const items = [];

        for (const cartItem of user.cart) {
            const donut = await Donut.findById(cartItem.donutId);

            if (!donut) {
                continue;
            }

            items.push({
                donut: donut._id,
                quantity: cartItem.quantity,
                price: donut.price,
            });
        }

        if (items.length === 0) {
            return res.send('No valid items in cart');
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

        // Clear cart
        user.cart = [];
        await user.save();

        res.redirect(`/orders/${order._id}`);
    } catch (err) {
        console.log(err);
        res.send('Something went wrong');
    }
};

// CANCEL order
const cancel = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.send('Order not found');
        }

        // Make sure customer owns the order
        if (
            req.session.user.role !== 'admin' &&
            order.user.toString() !== req.session.user._id.toString()
        ) {
            return res.status(403).send('Access denied');
        }

        // Only pending orders can be cancelled
        if (order.status !== 'pending') {
            return res.send('This order can no longer be cancelled');
        }

        order.status = 'cancelled';

        await order.save();

        res.redirect(`/orders/${order._id}`);
    } catch (err) {
        console.log(err);
        res.send('Something went wrong');
    }
};

// ADMIN - see all orders
const adminIndex = async (req, res) => {
    try {
        const orders = await Order.find({})
            .populate('user')
            .populate('location')
            .populate('items.donut');

        res.render('orders/admin-index.ejs', {
            orders,
        });
    } catch (err) {
        console.log(err);
        res.send('Something went wrong');
    }
};

// ADMIN - update order status
const updateStatus = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.send('Order not found');
        }

        order.status = req.body.status;

        await order.save();

        res.redirect('/orders/admin');
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
    cancel,
    adminIndex,
    updateStatus,
};