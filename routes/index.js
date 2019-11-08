var express = require('express');
var router = express.Router();
var app = express();

var mongoose=require('mongoose');
var Item = require('../Models/Item');


/* GET home page. */
router.get('/', function(req, res, next) {
  // const item = new Item({
  //   id:new mongoose.Types.ObjectId(),
  //   name: "Ghế dựa trắng",
  //   price: "300000"
  // });
  // item.save().then(result=>{
  //   console.log(result);
  // }).catch(err=> console.log(err));
  res.render('index', { title: 'Express', });
});
router.get('/shop', function(req, res, next) {
  res.render('shop', { title: 'Express' });
});
router.get('/san-pham', function(req, res, next) {
  res.render('san_pham', { title: 'Express' });
});
router.get('/gio-hang', function(req, res, next) {
  res.render('gio_hang', { title: 'Express' });
});
router.get('/thanh-toan', function(req, res, next) {
  res.render('thanh_toan', { title: 'Express' });
});
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});
router.get('/dang-ky', function(req, res, next) {
  res.render('signup', { title: 'Express' });
});
router.get('/thay-doi', function(req, res, next) {
  res.render('edit_profile', { title: 'Express' });
});
router.get('/quen-mat-khau', function(req, res, next) {
  res.render('forgot_password', { title: 'Express' });
});
router.get('/top10', function(req, res, next) {
  res.render('top10', { title: 'Express' });
});
module.exports = router;
