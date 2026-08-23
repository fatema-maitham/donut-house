const express = require('express');

const router = express.Router();

const donutCtrl = require('../controllers/donutCtrl');

const isSignedIn = require('../middleware/isSignedIn');

const isAdmin = require('../middleware/isAdmin');

// Admin routes
router.get('/new', isSignedIn, isAdmin, donutCtrl.newDonut);

// Public routes
router.get('/', donutCtrl.index);

router.get('/:id', donutCtrl.show);

// Admin create
router.post('/', isSignedIn, isAdmin, donutCtrl.create);

module.exports = router;