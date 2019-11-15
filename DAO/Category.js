const db = require("../utils/database")
module.exports = {
    GetAll: function (callback) {
        db.GetAllFromTable("category", function (err, result) {
            if (err)
                callback(err,null);
            else
                callback(null,result);
        })
    },
    findById: function (id, callback) {
        const sql = "select * from category where category_id=" + id;
        db.Query(sql, function (err, result) {
            if (err)
                callback(err,null);
            else {
                callback(null,result);
            }

        })
    },
    GetProductById: function (id, callback) {
        const sql = "select * from Items p, category c where p.ID=" + id + " and c.category_id=p.CATEGORY_ID";
        db.Query(sql, function (err, result) {
            if (err)
                callback(err,null);
            else {
                const category = require("../models/CategoryModel").Category(result[0]);
                callback(null,category);
            }

        })
    },
}