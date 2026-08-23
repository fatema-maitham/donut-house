const express = require('express');

const router = express.Router();

const locationCtrl = require('../controllers/locationCtrl');

const isSignedIn = require('../middleware/isSignedIn');
const isAdmin = require('../middleware/isAdmin');

router.get('/', locationCtrl.index);

router.get('/new', isSignedIn, isAdmin, locationCtrl.new);

router.get('/:id/edit', isSignedIn, isAdmin, locationCtrl.edit);

router.get('/:id', locationCtrl.show);

router.post('/', isSignedIn, isAdmin, locationCtrl.create);

router.put('/:id', isSignedIn, isAdmin, locationCtrl.update);

router.delete('/:id', isSignedIn, isAdmin, locationCtrl.delete);

module.exports = router;