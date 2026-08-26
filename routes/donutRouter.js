const express = require('express');

const router = express.Router();

const multer = require('multer');
const { storage } = require('../config/cloudinary');

const upload = multer({ storage });

const donutCtrl = require('../controllers/donutCtrl');

const isSignedIn = require('../middleware/isSignedIn');
const isAdmin = require('../middleware/isAdmin');

// ADMIN — add donut
router.get(
    '/new',
    isSignedIn,
    isAdmin,
    donutCtrl.newDonut
);

router.post(
    '/',
    isSignedIn,
    isAdmin,
    upload.single('image'),
    donutCtrl.create
);

// CUSTOMER + ADMIN — view donuts
router.get(
    '/',
    donutCtrl.index
);

// ADMIN — edit donut
router.get(
    '/:id/edit',
    isSignedIn,
    isAdmin,
    donutCtrl.edit
);

router.put(
    '/:id',
    isSignedIn,
    isAdmin,
    upload.single('image'),
    donutCtrl.update
);

// ADMIN — delete donut
router.delete(
    '/:id',
    isSignedIn,
    isAdmin,
    donutCtrl.deleteDonut
);

// CUSTOMER + ADMIN — view one donut
router.get(
    '/:id',
    donutCtrl.show
);

module.exports = router;