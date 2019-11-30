const product = require("./ProductsModel");
const category= require("./CategoryModel");
const producer = require("./ProducerModel");
const user = require("./UsersModel");
module.exports = {
    Products: product,
    Category: category,
    Producer: producer,
    User: user,
};