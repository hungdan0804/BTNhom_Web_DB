let express = require('express');
let router = express.Router();
const cartController = require('../controllers/CartController.js');
router.get('/', cartController.Cart);
module.exports = router;