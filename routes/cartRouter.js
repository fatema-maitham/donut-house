const express = require('express');

const router = express.Router();

const cartCtrl = require('../controllers/cartController');

const isSignedIn = require('../middleware/isSignedIn');

// Cart page
router.get('/', isSignedIn, cartCtrl.index);

// Add donut
router.post('/add/:id', isSignedIn, cartCtrl.addToCart);

// Increase quantity
router.get('/increase/:id', isSignedIn, cartCtrl.increase);

// Decrease quantity
router.get('/decrease/:id', isSignedIn, cartCtrl.decrease);

// Remove donut
router.get('/remove/:id', isSignedIn, cartCtrl.remove);

module.exports = router;