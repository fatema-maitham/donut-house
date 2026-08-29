/* eslint-disable no-console */

const bcrypt = require('bcrypt');
const User = require('../models/user');

const SALT_ROUNDS = 10;

// Show sign-up page
const signup = async (req, res) => {
  res.render('auth/sign-up.ejs');
};

// Create new user
const register = async (req, res) => {
  try {
    // Check if username already exists
    const usernameExists = await User.findOne({
      username: req.body.username,
    });

    if (usernameExists) {
      return res.send('Username already exists');
    }

    // Check if email already exists
    const emailExists = await User.findOne({
      email: req.body.email,
    });

    if (emailExists) {
      return res.send('Email already exists');
    }

    // Check passwords
    if (req.body.password !== req.body.confirmPassword) {
      return res.send('Passwords do not match');
    }

    // Hash password
    const hashedPassword = bcrypt.hashSync(
      req.body.password,
      SALT_ROUNDS
    );

    // Create user
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      role: 'customer',
    });

    // Store user information in session
    req.session.user = {
      username: user.username,
      email: user.email,
      role: user.role,
      _id: user._id,
    };

    req.session.save(() => {
      res.redirect('/');
    });
  } catch (err) {
    res.send('Something went wrong');
  }
};

// Show sign-in page
const signin = async (req, res) => {
  res.render('auth/sign-in.ejs');
};

// Login
const login = async (req, res) => {
  try {
    const userInDatabase = await User.findOne({
      username: req.body.username,
    });

    // User doesn't exist
    if (!userInDatabase) {
      return res.send('Invalid credentials');
    }

    // Check password
    if (
      !bcrypt.compareSync(
        req.body.password,
        userInDatabase.password
      )
    ) {
      return res.send('Invalid credentials');
    }

    // Store user information in session
    req.session.user = {
      username: userInDatabase.username,
      email: userInDatabase.email,
      role: userInDatabase.role,
      _id: userInDatabase._id,
    };

    req.session.save(() => {
      // ADMIN → Admin Dashboard
      if (userInDatabase.role === 'admin') {
        res.redirect('/admin/dashboard');
      } else {
        // CUSTOMER → Customer Home
        res.redirect('/');
      }
    });

  } catch (err) {
    res.send('Something went wrong');
  }
};

// Logout
const signout = async (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
};

module.exports = {
  signup,
  register,
  signin,
  login,
  signout,
};