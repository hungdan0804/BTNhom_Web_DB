const models = require('../Models/models');

exports.Cart = (req, res, next) => {
    res.render('cart', { user: req.user });
};