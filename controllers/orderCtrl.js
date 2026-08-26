const Order = require('../models/Order');
const Donut = require('../models/donut');
const Location = require('../models/location');
const User = require('../models/user');


// =========================================================
// CUSTOMER - VIEW MY ORDERS
// =========================================================

const index = async (req, res) => {
    try {
        const orders = await Order.find({
            user: req.session.user._id,
        })
            .populate('location')
            .populate('items.donut')
            .sort({ createdAt: -1 });

        res.render('orders/index.ejs', {
            orders,
        });

    } catch (err) {
        console.log(err);
        res.status(500).send('Something went wrong');
    }
};


// =========================================================
// CUSTOMER - VIEW ONE ORDER
// =========================================================

const show = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('location')
            .populate('items.donut')
            .populate('user');

        if (!order) {
            return res.status(404).send('Order not found');
        }

        // Customers can only see their own orders.
        // Admins can see any order.
        if (
            req.session.user.role !== 'admin' &&
            order.user._id.toString() !== req.session.user._id.toString()
        ) {
            return res.status(403).send('Access denied');
        }

        res.render('orders/show.ejs', {
            order,
        });

    } catch (err) {
        console.log(err);
        res.status(500).send('Something went wrong');
    }
};


// =========================================================
// CUSTOMER - CHECKOUT PAGE
// =========================================================

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
        res.status(500).send('Something went wrong');
    }
};


// =========================================================
// CUSTOMER - CREATE ORDER
// =========================================================

const create = async (req, res) => {
    try {
        const user = await User.findById(
            req.session.user._id
        );

        if (!user) {
            return res.status(404).send('User not found');
        }

        if (!user.cart || user.cart.length === 0) {
            return res.send('Your cart is empty');
        }


        // Validate pickup location

        const selectedLocation = await Location.findOne({
            _id: req.body.location,
            available: true,
        });

        if (!selectedLocation) {
            return res.status(400).send(
                'Invalid pickup location'
            );
        }


        // Create order items

        const items = [];

        for (const cartItem of user.cart) {

            const donut = await Donut.findById(
                cartItem.donutId
            );

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
            return res.send(
                'No valid items in cart'
            );
        }


        // Calculate total

        const total = items.reduce(
            (sum, item) =>
                sum + item.price * item.quantity,
            0
        );


        // Create order

        const order = await Order.create({
            user: user._id,
            location: selectedLocation._id,
            items,
            total,
        });


        // Clear cart

        user.cart = [];

        await user.save();


        // Send customer to order details

        res.redirect(
            `/orders/${order._id}`
        );

    } catch (err) {
        console.log(err);
        res.status(500).send(
            'Something went wrong'
        );
    }
};


// =========================================================
// CUSTOMER - CANCEL ORDER
// =========================================================

const cancel = async (req, res) => {
    try {

        const order = await Order.findById(
            req.params.id
        );

        if (!order) {
            return res.status(404).send(
                'Order not found'
            );
        }


        // Make sure customer owns order

        if (
            req.session.user.role !== 'admin' &&
            order.user.toString() !==
            req.session.user._id.toString()
        ) {
            return res.status(403).send(
                'Access denied'
            );
        }


        // Only pending orders can be cancelled

        if (order.status !== 'pending') {
            return res.send(
                'This order can no longer be cancelled'
            );
        }


        order.status = 'cancelled';

        await order.save();


        res.redirect(
            `/orders/${order._id}`
        );

    } catch (err) {
        console.log(err);
        res.status(500).send(
            'Something went wrong'
        );
    }
};


// =========================================================
// ADMIN - VIEW ALL ORDERS
// =========================================================

const adminIndex = async (req, res) => {
    try {

        const orders = await Order.find({})
            .populate('user')
            .populate('location')
            .populate('items.donut')
            .sort({ createdAt: -1 });


        res.render('orders/admin-index.ejs', {
            orders,
        });

    } catch (err) {
        console.log(err);
        res.status(500).send(
            'Something went wrong'
        );
    }
};


// =========================================================
// ADMIN - UPDATE ORDER STATUS
// =========================================================

const updateStatus = async (req, res) => {
    try {

        const order = await Order.findById(
            req.params.id
        );

        if (!order) {
            return res.status(404).send(
                'Order not found'
            );
        }


        const validStatuses = [
            'pending',
            'preparing',
            'ready',
            'completed',
            'cancelled',
        ];


        if (
            !validStatuses.includes(
                req.body.status
            )
        ) {
            return res.status(400).send(
                'Invalid order status'
            );
        }


        order.status = req.body.status;

        await order.save();


        // IMPORTANT:
        // Go back to admin Manage Orders page

        res.redirect('/orders/admin');

    } catch (err) {
        console.log(err);
        res.status(500).send(
            'Something went wrong'
        );
    }
};


// =========================================================
// EXPORTS
// =========================================================

module.exports = {
    index,
    show,
    new: newOrder,
    create,
    cancel,
    adminIndex,
    updateStatus,
};