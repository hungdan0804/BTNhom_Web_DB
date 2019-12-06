const express = require('express');
const database = require('../utils/Database');
const router = express.Router();
const models = require('../Models/models');
const ShopController = require('../controllers/ShopController');
const ProductController = require('../controllers/ProductControllers');
const HomeController = require('../controllers/HomeControllers');
const Pusher=require('../utils/PusherConfig');
require('../controllers/LoginController');
const passport=require('passport');


/* GET home page. */
router.get('/', HomeController.Home);
router.get('/shop', ShopController.Shop);
router.get('/product', ProductController.Product);
router.post('/product',Pusher.Comment);
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});
router.get('/logout',(req,res)=> {
  req.logout();
  res.redirect('/');
});
router.get('/dang-ky', function(req, res, next) {
  res.render('signup', { title: 'Express' });
});
router.get('/auth/facebook',passport.authenticate('facebook',{scope:['email']}));
router.get('/auth/facebook/callback',passport.authenticate('facebook',{
  successRedirect:'/',
  failureRedirect:'/',
}))

router.post('/login',passport.authenticate('local-login',{
  successRedirect:'/',
  failureRedirect:'/Login',
}));

router.post('/dang-ky',passport.authenticate('local-signup',{
  successRedirect:'/Login',
  failureRedirect:'/dang-ky',
}));
router.get('/thay-doi', function(req, res, next) {
  res.render('edit_profile', { user:req.user});
});

router.get('/gio-hang', function(req, res, next) {
  res.render('gio_hang', { title: 'Express' });
});
router.get('/thanh-toan', function(req, res, next) {
  res.render('thanh_toan', { title: 'Express' });
});

router.get('/quen-mat-khau', function(req, res, next) {
  res.render('forgot_password', { title: 'Express' });
});
router.get('/top10', function(req, res, next) {
  res.render('top10', { title: 'Express' });
});

module.exports = router;