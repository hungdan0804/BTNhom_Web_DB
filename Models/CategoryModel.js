const database = require("../utils/Database");
class Category {
    constructor() {
        this.category_id = 0;
        this.name = "";
    }
    static GetAll() {
        return new Promise((resolve, reject) => {
            database.query("select * from category")
                .then(dataset =>resolve(dataset))
                .catch(err => reject(err))
        })
    }
    static findById(id) {
        return new Promise((resolve, reject) => {
            const sql = 'select * from category where category_id=' + id;
            database.query(sql)
                .then(dataset => resolve(dataset[0]))
                .catch(err => reject(err));
        })
    }
}
module.exports = Category;
/*{
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
                const category = require("../ViewModels/CategoryModel").Category(result[0]);
                callback(null,category);
            }

        })
    },
}*/