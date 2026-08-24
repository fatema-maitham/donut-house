const express = require('express');

const router = express.Router();

const locationController = require('../controllers/locationCtrl');

const isSignedIn = require('../middleware/isSignedIn');
const isAdmin = require('../middleware/isAdmin');

// =========================
// CUSTOMER + ADMIN
// =========================

router.get('/', locationController.index);

router.get('/:id', locationController.show);

// =========================
// ADMIN ONLY
// =========================

router.get(
    '/new',
    isSignedIn,
    isAdmin,
    locationController.newLocation
);

router.post(
    '/',
    isSignedIn,
    isAdmin,
    locationController.create
);

router.get(
    '/:id/edit',
    isSignedIn,
    isAdmin,
    locationController.edit
);

router.put(
    '/:id',
    isSignedIn,
    isAdmin,
    locationController.update
);

router.delete(
    '/:id',
    isSignedIn,
    isAdmin,
    locationController.destroy
);

module.exports = router;