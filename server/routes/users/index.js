const express = require('express');
const passport = require('passport');
const UserModel = require('../../database/models/UserModel');

const router = express.Router();

function redirectIfLogged(req, res, next) {
  if (req.user) return res.redirect('/users/account');
  return next();
}

module.exports = () => {
  
  router.get('/logout', (req, res) => {
    req.logout();
    return res.redirect('/');
  });

  router.get('/login', redirectIfLogged, (req, res) => {
    res.render('users/login', { error: req.query.error });
  });

  router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login?error=true'
  }));

  router.get('/registration', redirectIfLogged, (req, res) => res.render('users/registration', { success: req.query.success }));

  router.post('/registration', async (req, res, next) => {
    try {
      const user = new UserModel({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      });

      const savedUser = await user.save();

      if (savedUser) return res.redirect('/users/registration?success=true');
      return next(new Error('Failed to save user.'));
    } catch (error) {
      return next(error);
    }
  });

  router.get('/account',(req, res, next) => {
    if (req.user) return next();
    return res.status(403).end();
  }, (req, res) => res.render('users/account', { user: req.user }));

  return router;
};
