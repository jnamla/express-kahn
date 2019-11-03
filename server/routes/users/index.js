const express = require('express');
const passport = require('passport');
const UserModel = require('../../database/models/UserModel');
const middlewares = require('../middlewares');

const router = express.Router();

module.exports = (params) => {
  
  const {avatars} = params;
  router.get('/logout', (req, res) => {
    req.logout();
    return res.redirect('/');
  });

  router.get('/login', middlewares.redirectIfLogged, (req, res) => {
    res.render('users/login', { error: req.query.error });
  });

  router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login?error=true'
  }));

  router.get('/registration', middlewares.redirectIfLogged, (req, res) => res.render('users/registration', { success: req.query.success }));

  router.post('/registration',
  middlewares.upload.single('avatar'), 
  middlewares.handleAvatar(avatars),
  async (req, res, next) => {
    try {
      const user = new UserModel({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      });
      if(req.file && req.file.storedFilename) {
        user.avatar = req.file.storedFilename;
      }
      const savedUser = await user.save();

      if (savedUser) return res.redirect('/users/registration?success=true');
      return next(new Error('Failed to save user.'));
    } catch (error) {
      if(req.file && req.file.storedFilename) {
          await avatars.delete(req.file.storedFilename);
      }
      return next(error);
    }
  });

  router.get('/account',(req, res, next) => {
    if (req.user) return next();
    return res.status(401).end();
  }, (req, res) => res.render('users/account', { user: req.user }));

  router.get('/avatar/:filename', (req, res, next) => {
    res.type('png');
    return res.sendfile(avatars.filepath('req.params.filename'));
  });

  router.get('/avatartn/:filename', async (req, res, next) => {
    try {
      res.type('png');
      const tn = await avatars.thumbnail(req.params.filename);
      return res.end(tn, 'binary');
    } catch (error) {
      return res.status(500);
    }
  });

  return router;
};
