const models = require('../Models/models');
exports.Shop = (req, res, next) => {
    let ref_category = req.query.category;
    let ref_producer = req.query.producer;
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
            count = listProducts.length;
        }
        res.render('shop', {
            category: listCategories,
            product: listProducts,
            item_count: count,
            producers: listProducers,
        });
    });
};