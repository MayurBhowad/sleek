const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const User = require('../../models/users.model');
const keys = require('../../config/keys');

//LOAD INPUT VALIDATION
const validateRegisterInput = require('../../validation/register.validation');
const validateLoginInput = require('../../validation/login.validation');

//@route    GET api/users/tests
//@dest     Test users route
//@access   Public
router.get('/test', (req, res) => res.json({ msg: 'users WOrks' }));

//@route    POST api/users/register
//@dest     Register users
//@access   Public
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  //CHECK VALIDATION
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      errors.email = 'Email already Exist!';
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        password: req.body.password,
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

//@route    POST api/users/register
//@dest     Register users
//@access   Public
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  //CHECK VALIDATION
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then((user) => {
    //CHECK FOR USER
    if (!user) {
      errors.email = 'User not Found!';
      return res.status(404).json(errors);
    }
    //CHECK PASSWORD
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        const payload = { id: user, name: user.name, email: user.email };

        //SIGN TOKEN
        jwt.sign(payload, keys.secretKey, { expiresIn: 3600 }, (err, token) => {
          res.json({ success: true, token: 'Bearer ' + token });
        });
      } else {
        errors.password = 'Password Incorrect!';
        return res.status(400).json(errors);
      }
    });
  });
});

//@route    GET api/users/current
//@dest     Return current user
//@access   Private
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      Name: req.user.name,
      Email: req.user.email,
      surname: req.user.surname,
    });
  }
);

module.exports = router;
