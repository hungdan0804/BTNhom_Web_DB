const models = require('../Models/models');
exports.Shop = (req, res, next) => {
    let id = req.query.category;
    let listProducts, listCategories, count;
    if (id===undefined || id ==='all') {
        models.Category.GetAll().then(listCategory => {
            listCategories = listCategory;
            return models.Products.GetAll();
        }).then(listProduct => {
            listProducts = listProduct;
            count = listProducts.length;
            res.render('shop', {category: listCategories, product: listProducts, item_count: count});
        });
    }
};