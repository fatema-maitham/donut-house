const Order = require('../models/Order');

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

module.exports = {
    index,
    show,
};