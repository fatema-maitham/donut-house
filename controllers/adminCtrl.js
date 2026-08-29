const Donut = require('../models/donut');

const Location = require('../models/location');

const Order = require('../models/Order');

const User = require('../models/user');

const dashboard = async (req, res) => {
    try {
        const donutCount = await Donut.countDocuments();

        const locationCount = await Location.countDocuments();

        const orderCount = await Order.countDocuments();

        const userCount = await User.countDocuments();

        res.render('admin/dashboard.ejs', {
            donutCount,
            locationCount,
            orderCount,
            userCount,
        });
    } catch (err) {
        res.send('Something went wrong');
    }
};

module.exports = {
    dashboard,
};