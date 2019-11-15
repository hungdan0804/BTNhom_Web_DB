var express = require('express');
var db = require('../utils/database');
var router = express.Router();
var name = "";
const mysql = require('mysql');
const models = require('../DAO/models');
/* GET home page. */
router.get('/', function(req, res, next) {
    models.Products.GetAll(function (err, result) {
        if (err) throw err;
        res.render('index', {title: 'Express', products: result});
    })
});
router.get('/shop-:id', function(req, res, next) {
    const id = req.params["id"];
    models.Category.GetAll(function (err,result) {
       if(err)throw err;
        models.Products.GetProductByCategoryId(id, function (err, result2) {
            if (err) throw err;
            models.Products.CountItemGroupByCategoryId(id,function (err,result3){
                if (err) throw err;
                res.render('shop', {category: result, product: result2, item_count: result3[0]});
            })
        })
   })
});
router.get('/san-pham-:id', function(req, res, next) {
    const id = req.params["id"];
    models.Products.GetProductById(id, function (err, result) {
        if (err) throw err;
        res.render('san_pham', { product: result});
    })
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
