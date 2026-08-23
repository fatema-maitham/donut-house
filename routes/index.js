const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('home.ejs');
});

router.get('/about', (req, res) => {
    res.render('about.ejs');
});

module.exports = router;