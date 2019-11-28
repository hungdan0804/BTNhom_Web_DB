const database = require("../utils/Database");
class Product {
    constructor() {
        this.ID = 0;
        this.NAME = "";
        this.DESCRIPTION = "";
        this.CATEGORY_ID = 0;
        this.PRICE = 0;
        this.PRODUCER_ID = 0;
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
            const sql = 'select * from product where ID='+ id;
            database.query(sql)
                .then(dataset => {
                    if (dataset != undefined)
                        resolve(dataset[0]);
                    else
                        resolve(dataset);
                }).catch(err => reject(err));
        })
    }
    static findByCategory(category_id) {
        return new Promise((resolve, reject) => {
            const sql = `select * from product p, category c where c.category_id=${category_id} and c.category_id=p.CATEGORY_ID`;
            database.query(sql)
                .then(dataset => resolve(dataset))
                .catch(err => reject(err));
        })
    }
    static findByProducer(producer_id) {
        return new Promise((resolve, reject) => {
            const sql = 'select * from product p, producer pr where pr.producer_id='+producer_id+' and pr.producer_id=p.PRODUCER_ID';
            database.query(sql)
                .then(dataset => resolve(dataset))
                .catch(err => reject(err));
        })
    }
}
module.exports = Product;