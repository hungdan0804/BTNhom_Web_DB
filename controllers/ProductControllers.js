const models = require('../Models/models');


exports.Product = (req, res, next) => {
    let id = req.query.id;
    if (id===undefined)
        res.redirect('/');
    let product, comments;
    models.Products.findById(id).then(rs1 => {
        if (rs1 === undefined)
            res.redirect('/');
        product = rs1;
        return models.Category.findById(rs1.CATEGORY_ID);
    }).then(rs2 => {
        product.CATEGORY = rs2.name;
        return models.Comment.findByProductId(product.ID);
    }).then(rs3=>{
        comments = rs3;
        return models.Products.GetRelatedProduct(id);
    }).then(related_products => {
        res.render('product', { product: product,comment: comments, related_product: related_products});
    });
};