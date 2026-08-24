const express = require('express');
const router = express.Router();

const cartCtrl = require('../controllers/cartController');
const isSignedIn = require('../middleware/isSignedIn');


// ============================================
// CART PAGE
// ============================================

router.get('/', isSignedIn, cartCtrl.index);


// ============================================
// ADD DONUT
// ============================================

router.get('/add/:id', isSignedIn, cartCtrl.addToCart);


// ============================================
// INCREASE
// ============================================

router.get('/increase/:id', isSignedIn, cartCtrl.increase);


// ============================================
// DECREASE
// ============================================

router.get('/decrease/:id', isSignedIn, cartCtrl.decrease);


// ============================================
// REMOVE
// ============================================

router.get('/remove/:id', isSignedIn, cartCtrl.remove);


module.exports = router;