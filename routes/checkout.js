let express = require('express');
let router = express.Router();
const CheckoutController = require("../controllers/CheckoutController");

router.get('/', CheckoutController.Checkout);
router.post('/', CheckoutController.CheckoutPOST);
router.get('/success', CheckoutController.CheckoutSuccess);

module.exports = router;


