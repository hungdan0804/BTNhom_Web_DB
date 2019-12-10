var express = require('express');
var router = express.Router();
const HomeController=require('../controllers/HomeControllers');


router.get('/', HomeController.Home);

module.exports = router;