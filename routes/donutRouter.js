const express = require('express');

const router = express.Router();

const multer = require('multer');

const { storage } = require('../config/cloudinary');

const upload = multer({ storage });

const donutCtrl = require('../controllers/donutCtrl');

const isSignedIn = require('../middleware/isSignedIn');

const isAdmin = require('../middleware/isAdmin');


// ============================================
// ADMIN — ALL DONUTS
// ============================================

router.get(
    '/admin',
    isSignedIn,
    isAdmin,
    donutCtrl.adminIndex
);


// ============================================
// ADMIN — ADD DONUT
// ============================================

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


// ============================================
// CUSTOMER + ADMIN — VIEW DONUTS
// ============================================

router.get(
    '/',
    donutCtrl.index
);


// ============================================
// ADMIN — EDIT DONUT
// ============================================

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


// ============================================
// ADMIN — DELETE DONUT
// ============================================

router.delete(
    '/:id',
    isSignedIn,
    isAdmin,
    donutCtrl.deleteDonut
);


// ============================================
// CUSTOMER + ADMIN — VIEW ONE DONUT
// ============================================

router.get(
    '/:id',
    donutCtrl.show
);


module.exports = router;