const models = require('../Models/models');
var Pusher = require('pusher');
exports.Comment = (req, res, next) => {
    var pusher = new Pusher({
        appId: process.env.PUSHER_APP_ID,
        key: process.env.PUSHER_KEY,
        secret: process.env.PUSHER_SECRET,
        cluster: 'ap1',
        encrypted: true
    });
    models.Comment.insert(req.user.username,req.body.comment,req.body.product);

    pusher.trigger('post', 'add', {
        username:req.user.username,
        content: req.body.comment
    });
    res.json({message:"Thank you for your support"});
};