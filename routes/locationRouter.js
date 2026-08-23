const express = require('express');

const router = express.Router();

const locationCtrl = require('../controllers/locationCtrl');
const isAdmin = require('../middleware/isAdmin');

router.get('/', locationCtrl.index);

router.get('/new', isAdmin, locationCtrl.new);

router.get('/:id/edit', isAdmin, locationCtrl.edit);

router.get('/:id', locationCtrl.show);

router.post('/', isAdmin, locationCtrl.create);

router.put('/:id', isAdmin, locationCtrl.update);

module.exports = router;