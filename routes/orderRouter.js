const express = require('express');

const router = express.Router();

const orderCtrl = require('../controllers/orderCtrl');

router.get('/', orderCtrl.index);

router.get('/new', orderCtrl.new);

router.get('/:id', orderCtrl.show);

router.post('/', orderCtrl.create);

module.exports = router;