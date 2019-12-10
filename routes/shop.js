var express = require('express');
var router = express.Router();
const ShopController = require('../controllers/ShopController');
const ProductController = require('../controllers/ProductControllers');
const Pusher=require('../utils/PusherConfig');

router.get('/', ShopController.Shop);
router.get('/product', ProductController.Product);
router.post('/product',Pusher.Comment);


router.get('/gio-hang', function(req, res, next) {
    res.render('gio_hang', { title: 'Express' });
});
router.get('/thanh-toan', function(req, res, next) {
    res.render('thanh_toan', { title: 'Express' });
});

router.get('/top10', function(req, res, next) {
    res.render('top10', { title: 'Express' });
});

module.exports = router;