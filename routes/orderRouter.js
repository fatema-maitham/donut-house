const express = require('express');

const router = express.Router();

const orderCtrl = require('../controllers/orderCtrl');

router.get('/', orderCtrl.index);

router.get('/:id', orderCtrl.show);

module.exports = router;