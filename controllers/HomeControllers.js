const models = require('../Models/models');
exports.Home = (req, res, next) => {
    if(req.isAuthenticated()) {
        models.Products.GetAll().then(result => {
            res.render('index', {title: 'Express', products: result,user:req.user});
        });
    }else{
        models.Products.GetAll().then(result => {
            res.render('index', {title: 'Express', products: result});
        });
    }
};