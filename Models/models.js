const product = require("./ProductsModel");
const category= require("./CategoryModel");
const producer = require("./ProducerModel");
const user = require("./UsersModel");
const comment=require("./CommentModel");
const bill = require("./BillModel");
const bill_detail = require("./BillDetailModel");
module.exports = {
    Products: product,
    Category: category,
    Producer: producer,
    User: user,
    Comment: comment,
    Bill: bill,
    BillDetail: bill_detail
};