const express = require('express');
const database = require('../utils/Database');
const router = express.Router();
const models = require('../Models/models');
const ShopController = require('../controllers/ShopController');
const ProductController = require('../controllers/ProductControllers');
const HomeController = require('../controllers/HomeControllers');
/* GET home page. */
router.get('/', HomeController.Home);
router.get('/shop', ShopController.Shop);
router.get('/product', ProductController.Product);
/*models.Category.GetAll(function (err,listCategories) {
       if(err)throw err;
        models.Products.GetProductByCategoryId(id, function (err, listProduct) {
            if (err) throw err;
            models.Products.CountItemGroupByCategoryId(id,function (err,count){
                if (err) throw err;
                res.render('shop', {category: listCategories, product: listProduct, item_count: count});
            })
        })
})*/

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