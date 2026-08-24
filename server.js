/* eslint-disable prefer-destructuring */
require('dotenv').config();
require('./config/database');

const path = require('path');
const express = require('express');
const app = express();

// Middleware
const session = require('express-session');
const MongoStore = require('connect-mongo').MongoStore;
const methodOverride = require('method-override');
const morgan = require('morgan');
const isSignedIn = require('./middleware/isSignedIn');
const isAdmin = require('./middleware/isAdmin');
const addUserToViews = require('./middleware/addUserToViews');
const aboutRouter = require('./routes/aboutRouter');

// Routers
const authRouter = require('./routes/authRouter');
const pagesRouter = require('./routes/pagesRouter');
const donutRouter = require('./routes/donutRouter');
const cartRouter = require('./routes/cartRouter');
const locationRouter = require('./routes/locationRouter');
const orderRouter = require('./routes/orderRouter');

// Set the port from environment variable or default to 3000
const port = process.env.PORT ? process.env.PORT : '3000';

// MIDDLEWARE
app.use(express.static(path.join(__dirname, 'public')));
// Middleware to parse URL-encoded data from forms
app.use(express.urlencoded({ extended: false }));
// Middleware for using HTTP verbs such as PUT or DELETE
app.use(methodOverride('_method'));
// Morgan for logging HTTP requests
app.use(morgan('dev'));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
  })
);
app.use(addUserToViews);

// ROUTES
app.use('', pagesRouter);
app.use('/auth', authRouter);
app.use('/donuts', donutRouter);
app.use('/locations', locationRouter);
app.use('/cart', cartRouter);
app.use('/orders', orderRouter);
app.use('/about', aboutRouter);

// Customer middleware
app.use(isSignedIn);


app.get('/protected', async (req, res) => {
  res.send(`You are logged in as ${req.session.user.username}`);
});

app.get('/admin-test', isAdmin, async (req, res) => {
  res.send('Welcome Admin!');
});

app.use((req, res) => {
  res.status(404).render('404.ejs');
});

app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});
