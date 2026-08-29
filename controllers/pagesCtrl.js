const Donut = require('../models/donut');

const home = async (req, res) => {

  try {

    const donuts = await Donut.find({
      available: true
    });

    res.render('index.ejs', {
      donuts
    });

  } catch (error) {

    res.status(500).send('Server Error');

  }

};

module.exports = {
  home
};