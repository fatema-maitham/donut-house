const express = require('express');
const router = express.Router();
const cartCtrl = require('../controllers/cartController');
const isSignedIn = require('../middleware/isSignedIn');

// View Cart
router.get('/', isSignedIn, cartCtrl.index);

// Add/Increase Cart Items (GET-friendly anchors)
router.post('/add/:id', isSignedIn, cartCtrl.addToCart);
router.get('/add/:id', isSignedIn, cartCtrl.addToCart);

// Adjust Cart Quantities
router.get('/increase/:id', isSignedIn, cartCtrl.increase);
router.get('/decrease/:id', isSignedIn, cartCtrl.decrease);

// Remove Item from Cart
router.post('/remove/:id', isSignedIn, cartCtrl.remove);

module.exports = router;