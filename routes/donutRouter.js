const express = require('express');

const router = express.Router();

const donutCtrl = require('../controllers/donutCtrl');

const isSignedIn = require('../middleware/isSignedIn');

const isAdmin = require('../middleware/isAdmin');

// ADMIN — create
router.get('/new', isSignedIn, isAdmin, donutCtrl.newDonut);

router.post('/', isSignedIn, isAdmin, donutCtrl.create);

// PUBLIC
router.get('/', donutCtrl.index);

// ADMIN — edit
router.get('/:id/edit', isSignedIn, isAdmin, donutCtrl.edit);

router.put('/:id', isSignedIn, isAdmin, donutCtrl.update);

// ADMIN — delete
router.delete('/:id', isSignedIn, isAdmin, donutCtrl.deleteDonut);

// PUBLIC — one donut
router.get('/:id', donutCtrl.show);

module.exports = router;