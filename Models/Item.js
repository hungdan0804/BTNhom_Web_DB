var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectID,
    name: String,
    price: Number
});

var Item=mongoose.model('item',schema);