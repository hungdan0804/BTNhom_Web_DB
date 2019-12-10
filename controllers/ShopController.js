const models = require('../Models/models');
exports.Shop = (req, res, next) => {
    let ref_category = req.query.category;
    let ref_producer = req.query.producer;
    let amount_from = req.query.from;
    let amount_to = req.query.to;
    if (amount_from === undefined) {
        amount_from = 100000;
    }
    else {
        amount_from = parseInt(amount_from);
    }
    if (amount_to === undefined) {
        amount_to = 50000000;
    }
    else {
        amount_to = parseInt(amount_to);
    }
    let listProducts, listCategories, listProducers, count;
    models.Category.GetAll().then(listCategory => {
        listCategories = listCategory;
        return models.Producer.GetAll();
    }).then(listProducer => {
        listProducers = listProducer;
        //Category filter
        if (ref_category === undefined || ref_category === 'all') {
            return models.Products.GetAll();
        }
        else {
            if (Array.isArray(ref_category)) {
                ref_category = ref_category[0];
            }
            return models.Products.findByCategory(ref_category);
        }
    }).then(listProduct => {
        if (listProduct === undefined) {
            listProducts = listProduct;
            count = 0;
        }
        else {
            //Producer filter
            listProducts = models.Products.filterByProducers(ref_producer, listProduct);
            listProducts = models.Products.filterByPrice(listProducts, amount_from, amount_to);
            count = listProducts.length;
        }
        res.render('shop', {
            category: listCategories,
            product: listProducts,
            item_count: count,
            producers: listProducers,
            user: req.user,
        });
    });
};