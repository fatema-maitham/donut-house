/* eslint-disable prefer-destructuring */

require('dotenv').config();

require('./config/database');

const path = require('path');

const express = require('express');

const app = express();


// =========================
// MIDDLEWARE
// =========================

const session = require('express-session');

const MongoStore = require('connect-mongo').MongoStore;

const methodOverride = require('method-override');

const morgan = require('morgan');

const isSignedIn = require('./middleware/isSignedIn');

const isAdmin = require('./middleware/isAdmin');

const addUserToViews = require('./middleware/addUserToViews');


// =========================
// ROUTERS
// =========================

const authRouter = require('./routes/authRouter');

const pagesRouter = require('./routes/pagesRouter');

const donutRouter = require('./routes/donutRouter');

const cartRouter = require('./routes/cartRouter');

const locationRouter = require('./routes/locationRouter');

const orderRouter = require('./routes/orderRouter');

const aboutRouter = require('./routes/aboutRouter');


// =========================
// PORT
// =========================

const port = process.env.PORT
  ? process.env.PORT
  : '3000';


// =========================
// APP MIDDLEWARE
// =========================

app.use(
  express.static(
    path.join(__dirname, 'public')
  )
);

app.use(
  express.urlencoded({
    extended: false
  })
);

app.use(
  methodOverride('_method')
);

app.use(
  morgan('dev')
);


// =========================
// SESSION
// =========================

app.use(
  session({

    secret: process.env.SESSION_SECRET,

    resave: false,

    saveUninitialized: false,

    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI
    })

  })
);


// =========================
// USER AVAILABLE IN VIEWS
// =========================

app.use(addUserToViews);


// =========================
// ROUTES
// =========================

// HOME
app.use('/', pagesRouter);


// AUTH
app.use('/auth', authRouter);


// DONUTS
app.use('/donuts', donutRouter);


// LOCATIONS
app.use('/locations', locationRouter);


// CART
app.use('/cart', cartRouter);


// ORDERS
app.use('/orders', orderRouter);


// ABOUT
app.use('/about', aboutRouter);


// =========================
// TEST PROTECTED ROUTE
// =========================

app.get(
  '/protected',
  isSignedIn,
  async (req, res) => {

    res.send(
      `You are logged in as ${req.session.user.username}`
    );

  }
);


// =========================
// ADMIN TEST
// =========================

app.get(
  '/admin-test',
  isSignedIn,
  isAdmin,
  async (req, res) => {

    res.send('Welcome Admin!');

  }
);


// =========================
// 404
// =========================

app.use(
  (req, res) => {

    res.status(404).render('404.ejs');

  }
);


// =========================
// START SERVER
// =========================

app.listen(
  port,
  () => {

    console.log(
      `The express app is ready on port ${port}!`
    );

  }
);