const express = require('express');

const router = express.Router();

const locationCtrl = require('../controllers/locationCtrl');

router.get('/', locationCtrl.index);

router.get('/new', locationCtrl.new);

router.get('/:id/edit', locationCtrl.edit);

router.get('/:id', locationCtrl.show);

router.post('/', locationCtrl.create);

router.put('/:id', locationCtrl.update);

module.exports = router;