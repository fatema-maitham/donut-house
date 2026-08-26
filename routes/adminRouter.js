const express = require('express');

const router = express.Router();

const isSignedIn = require('../middleware/isSignedIn');

const isAdmin = require('../middleware/isAdmin');

const adminCtrl = require('../controllers/adminCtrl');

router.get(
    '/dashboard',
    isSignedIn,
    isAdmin,
    adminCtrl.dashboard
);

module.exports = router;