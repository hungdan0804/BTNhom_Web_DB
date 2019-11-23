const database = require("../utils/Database");
class Product {
    constructor() {
        this.ID = 0;
        this.NAME = "";
        this.DESCRIPTION = "";
        this.CATEGORY_ID = 0;
        this.PRICE = 0;
    }
    static GetAll() {
        return new Promise((resolve, reject) => {
            database.query("select * from product")
                    .then(dataset =>resolve(dataset))
                    .catch(err => reject(err))
        })
    }
    static findById(id) {
        return new Promise((resolve, reject) => {
            const sql = 'select * from product where ID=' + id;
            database.query(sql)
                .then(dataset => resolve(dataset[0]))
                .catch(err => reject(err));
        })
    }
    static findByCategory(category_id) {
        return new Promise((resolve, reject) => {
            const sql = "select * from product p, category c where c.category_id=" + category_id + " and c.category_id=p.CATEGORY_ID";
            database.query(sql)
                .then(dataset => resolve(dataset))
                .catch(err => reject(err));
        })
    }
    static getByColor(color_name) {
        return new Promise((resolve, reject) => {
            const sql = "select * from product p, color c where c.name='" + color_name + "' and c.id=p.COLOR_ID";
            database.query(sql)
                .then(dataset => resolve(dataset))
                .catch(err => reject(err));
        })
    }
}
module.exports = Product;
/*{
    GetAll: function (callback) {
        db.GetAllFromTable("Items", function (err, result) {
            if (err)
                callback(err,null);
            else
                callback(null,result);
        })
    },
    getall: () => {
        db.GetAllFromTable("Items", function (err, result) {
            return result;
        })
    },
    findById: function (id, callback) {
        const sql = "select * from Items where ID=" + id;
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
                const product = require("../ViewModels/ProductModel").Product(result[0]);
                callback(null,product);
            }

        })
    },
    GetProductByCategoryId: function (id, callback) {
        const sql = "select * from Items p, category c where c.category_id=" + id + " and c.category_id=p.CATEGORY_ID";
        db.Query(sql, function (err, result) {
            if (err)
                callback(err,null);
            else {
                callback(null,result);
            }

        })
    },
    CountItemGroupByCategoryId: function (id, callback) {
        const sql="SELECT CATEGORY_ID,COUNT(id) AS count FROM Items WHERE CATEGORY_ID="+id+" GROUP BY CATEGORY_ID";
        db.Query(sql, function (err, result) {
            if (err)
                callback(err,null);
            else {
                callback(null,result[0]);
            }
        })
    },
    CountItem: function (id, callback) {
        const sql="SELECT COUNT(id) AS count FROM Items";
        db.Query(sql, function (err, result) {
            if (err)
                callback(err,null);
            else {
                callback(null,result[0]);
            }
        })
    },
}*/