var express = require('express');
var mysql = require('mysql')
var router = express.Router();
var name = "";

var con=mysql.createConnection({
    host:"remotemysql.com",
    user:"z66oihq6CP",
    password: "D5UVmEnBZU",
    database: "z66oihq6CP"
});

/* GET home page. */
router.get('/', function(req, res, next) {
    con.query("SELECT * FROM Items", function (err, result, fields) {
        if (err) throw err;
        res.render('index', {title: 'Express', products: result});
    });
});
router.get('/shop', function(req, res, next) {
  res.render('shop', { title: 'Express' });
});
router.get('/san-pham', function(req, res, next) {
    con.query("SELECT * FROM Items", function (err, result, fields) {
        if (err) throw err;
        res.render('san_pham', { item_name:result[0].NAME,item_price:result[0].PRICE});
    });
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
