var express = require('express');
var router = express.Router();
const HomeController=require('../controllers/HomeControllers');


router.get('/', HomeController.Home);
router.get('/admin', function (req, res, next) {
    res.status(301).redirect('http://admin316324.herokuapp.com/');
});
module.exports = router;