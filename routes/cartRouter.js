const express = require('express');

const router = express.Router();

const cartCtrl = require('../controllers/cartController');

const isSignedIn = require('../middleware/isSignedIn');


// View cart
router.get('/', isSignedIn, cartCtrl.index);


// Add donut
router.post('/add/:id', isSignedIn, cartCtrl.addToCart);


// Increase quantity
router.post('/increase/:id', isSignedIn, cartCtrl.increase);


// Decrease quantity
router.post('/decrease/:id', isSignedIn, cartCtrl.decrease);


// Remove donut
router.post('/remove/:id', isSignedIn, cartCtrl.remove);


module.exports = router;