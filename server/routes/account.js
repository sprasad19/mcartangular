
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../model/User');
const checkJwt = require('../middleware/checkjwt');

router.post('/signup', (req, res, next) => {
  const user = new User(req.body);
  user.name = req.body.name;
  user.email = req.body.email;
  user.password = req.body.password;
  user.picture = user.gravatar();
  user.isSeller = req.body.isSeller;
  User.findOne({ email: req.body.email }, (err, existingUser) => {

    if (existingUser) {
      res.json({
        success: false,
        message: 'Email alredy registered !!'
      })
    } else {
      user.save();

      var token = jwt.sign({ user: user }, config.secret, { expiresIn: '7d' });
      res.json({
        success: true,
        message: 'Your Token',
        token: token
      });
    }
  });
});

router.post('/login', (req, res, next) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) throw err;

    if (!user) {
      res.json({
        success: false,
        message: 'Invalid Email Address'
      });
    } else if (user) {
      var validPassword = user.comparePassword(req.body.password);
      if (!validPassword) {
        res.json({
          success: false,
          message: 'Invalid Password'
        });
      }
      else {
        var token = jwt.sign({ user: user }, config.secret, { expiresIn: '7d' });
        res.json({
          success: true,
          message: ' ',
          token: token
        });
      }
    }
  });
});

router.route('/profile')
  .get(checkJwt, (req, res, next) => {
    User.findOne({ _id: req.decoded.user._id }, (err, user) => {
      res.json({
        success: true,
        user: user,
        message: "Successfull"
      });
    });
  })
  .post(checkJwt, (req, res, next) => {
    User.findOne({ _id: req.decoded.user._id }, (err, user) => {
      if (err) return next(err);
      if (req.body.name) user.name = req.body.name;
      if (req.body.email) user.email = req.body.email;
      if (req.body.password) user.password = req.body.password;
      user.isSeller = req.body.isSeller;
      user.save();
      res.json({
        success: true,
        message: 'Successfully edited your profile'
      });
    });
  });


router.route('/address')
  .get(checkJwt, (req, res, next) => {
    User.findOne({ _id: req.decoded.user._id }, (err, user) => {
      res.json({
        success: true,
        address: user.address,
        message: "Successfull"
      });
    });
  })
  .post(checkJwt, (req, res, next) => {
    User.findOne({ _id: req.decoded.user._id }, (err, user) => {
      if (err) return next(err);
      if (req.body.addr1) user.address.addr1 = req.body.addr1;
      if (req.body.addr2) user.address.addr1  = req.body.addr1;
      if (req.body.city) user.address.city  = req.body.city;
      if (req.body.state) user.address.state  = req.body.state;
      if (req.body.country) user.address.country  = req.body.country;
      if (req.body.postalcode) user.address.postalCode  = req.body.postalCode;

      user.isSeller = req.body.isSeller;
      user.save();
      res.json({
        success: true,
        message: 'Successfully edited your Address'
      });
    });
  });
module.exports = router;
