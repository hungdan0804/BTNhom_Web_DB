const models = require('../Models/models');
exports.Comment = (req, res, next) => {
    models.Comment.insert(req.user.username,req.body.comment,req.query.id);
    req.method='get';
    res.redirect('/product?id='+req.query.id);
};