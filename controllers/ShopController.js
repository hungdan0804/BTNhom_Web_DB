const models = require('../Models/models');
exports.Shop = (req, res, next) => {
    let id = req.query.category;
    let ref_color = req.query.color;
    let listProducts, listCategories, listColors, count;
    if (id===undefined || id ==='all') {
        models.Category.GetAll().then(listCategory => {
            listCategories = listCategory;
            return models.Color.GetAll();
        }).then(listColor => {
            listColors = listColor;
            if (ref_color === undefined)
                return models.Products.GetAll();
            else
                return models.Products.getByColor(ref_color);
        }).then(listProduct => {
            listProducts = listProduct;
            count = listProducts.length;
            res.render('shop', {
                category: listCategories,
                product: listProducts,
                item_count: count,
                colors: listColors
            });
        });
    }
    else {
        models.Category.GetAll().then(listCategory => {
            listCategories = listCategory;
            return models.Color.GetAll();
        }).then(listColor => {
            listColors = listColor;
            if (ref_color == undefined) {
                return models.Products.findByCategory(id);
            }
            else {
                return models.Products.findByCategoryColor(id, ref_color);
            }
        }).then(listProduct => {
            listProducts = listProduct;
            count = listProducts.length;
            res.render('shop', {
                category: listCategories,
                product: listProducts,
                item_count: count,
                colors: listColors
            });
        })
    }
};