const Bill = require('../Models/BillModel');
const BillDetail = require('../Models/BillDetailModel');
let CryptoJS = require("crypto-js");
exports.Checkout = (req, res, next) => {
    if (req.user === undefined){
        res.redirect('/user/login');
        return;
    }
    res.render('checkout', { title: 'Express' });
};
exports.CheckoutSuccess = (req, res, next) => {
    if (req.user === undefined) {
        res.redirect('/user/login');
        return;
    }
    res.render('checkout_success', { title: 'Checked out' });
};
exports.CheckoutPOST = (req, res, next) => {
    if (req.user === undefined) {
        res.redirect('/');
        return;
    }
    let user_id = req.user.user_id;
    let form = req.body;
    let cart = CryptoJS.AES.decrypt(form.cart,'checkout').toString(CryptoJS.enc.Utf8);
    cart = JSON.parse(cart);
    if (cart.products.length == 0)
        res.redirect('/cart');
    let bill = new Bill();
    bill.customer = user_id;
    bill.description = form.comment;
    cart.products.forEach(n => {
        let bill_detail = new BillDetail();
        bill_detail.amount = n.amount;
        bill_detail.product_id = n.id;
        bill.total_price += parseInt(n.amount) * parseInt(n.price);
        bill.bill_detail.push(bill_detail);
    });
    bill.insert();
    res.redirect('/checkout/success');
};