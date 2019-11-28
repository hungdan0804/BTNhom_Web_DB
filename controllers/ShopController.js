const models = require('../Models/models');
function sortAscDate(a,b) {
    let aDate = new Date(a.CREATED_DATE);
    let bDate = new Date(b.CREATED_DATE);
    return aDate - bDate;
}
function sortDescDate(a,b) {
    let aDate = new Date(a.CREATED_DATE);
    let bDate = new Date(b.CREATED_DATE);
    return bDate - aDate;
}
function sortAscPrice(a,b) {
    let numA = Number(a.PRICE);
    let numB = Number(b.PRICE);
    return numA - numB;
}
function sortDescPrice(a,b) {
    let numA = Number(a.PRICE);
    let numB = Number(b.PRICE);
    return numB - numA;
}
/**
 * @return {string}
 */
function GetSortValue(ref) {
    let result = "Mới nhất";
    switch (ref.toLowerCase()) {
        case "lowest":
            result = "Giá thấp nhất";
            break;
        case "highest":
            result = "Giá cao nhất";
            break;
        case "oldest":
            result = "Cũ nhất";
            break;
        default:
            break;
    }
    return result;
}
exports.Shop = (req, res, next) => {
    let ref_category = req.query.category;
    let ref_color = req.query.color;
    let ref_producer = req.query.producer;
    let ref_sort = req.query.sort;
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
            return models.Products.findByCategory(ref_category);
        }
    }).then(listProduct => {
        if (listProduct === undefined) {
            listProducts = listProduct;
            count = 0;
        }
        else {
            //Producer filter
            if (ref_producer === undefined) {
                listProducts = listProduct;
            }
            else {
                if (!Array.isArray(ref_producer)) {
                    listProducts = listProduct.filter(n => n.PRODUCER_ID.toString() === ref_producer);
                }
                else {
                    listProducts = listProduct.filter(n => ref_producer.includes(n.PRODUCER_ID.toString()));
                }
            }
            count = listProducts.length;
            if (ref_sort !== undefined) {
                switch (ref_sort.toLowerCase()) {
                    case "newest":
                        listProducts.sort(sortAscDate);
                        break;
                    case "oldest":
                        listProducts.sort(sortDescDate);
                        break;
                    case "lowest":
                        listProducts.sort(sortAscPrice);
                        break;
                    case "highest":
                        listProducts.sort(sortDescPrice);
                }
            }
            else ref_sort = "newest";
        }
        res.render('shop', {
            category: listCategories,
            product: listProducts,
            item_count: count,
            producers: listProducers,
            sort_value: GetSortValue(ref_sort),
        });
    });
};