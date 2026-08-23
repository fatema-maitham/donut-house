const express = require('express');

const router = express.Router();

const orderCtrl = require('../controllers/orderCtrl');

const isSignedIn = require('../middleware/isSignedIn');
const isAdmin = require('../middleware/isAdmin');


// CUSTOMER

router.get('/', isSignedIn, orderCtrl.index);

router.get('/new', isSignedIn, orderCtrl.new);

router.post('/', isSignedIn, orderCtrl.create);

router.put('/:id/cancel', isSignedIn, orderCtrl.cancel);


// ADMIN

router.get('/admin', isSignedIn, isAdmin, orderCtrl.adminIndex);

router.put(
    '/admin/:id/status',
    isSignedIn,
    isAdmin,
    orderCtrl.updateStatus
);

router.get('/:id', isSignedIn, orderCtrl.show);

module.exports = router;