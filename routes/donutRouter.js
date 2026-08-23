const express = require('express');

const router = express.Router();

const donutCtrl = require('../controllers/donutCtrl');

router.get('/', donutCtrl.index);

router.get('/:id', donutCtrl.show);

module.exports = router;