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
            database.query("select * from product order by CREATED_DATE desc")
                    .then(dataset =>resolve(dataset))
                    .catch(err => reject(err))
        })
    }
    static GetTop9() {
        return new Promise((resolve, reject) => {
            database.query("select * from product order by CREATED_DATE limit 9")
                .then(dataset =>resolve(dataset))
                .catch(err => reject(err))
        })
    }
    static GetRelatedProduct(id) {
        return new Promise((resolve, reject) => {
            let sql = `select distinct b.product_id as id, p.PHOTO_LINK as photo_link, p.NAME as name,count(b.product_id) as amount
                        from bill_detail b inner join product p
                        on b.product_id=p.ID
                        where bill_id 
                        in (select bill_id from bill_detail where product_id=${id}) and b.product_id != ${id}
                        group by id, photo_link, name
                        order by amount desc limit 4`;
            database.query(sql)
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
    static getNameById(id) {
        return new Promise((resolve, reject) => {
            const sql = 'select * from product where ID='+ id;
            database.query(sql)
                .then(dataset => {
                    if (dataset != undefined)
                        resolve(dataset[0].NAME);
                    else
                        resolve('');
                }).catch(err => reject(err));
        })
    }
    static findByCategory(category_id) {
        return new Promise((resolve, reject) => {
            const sql = `select * from product p, category c where c.category_id=${category_id} and c.category_id=p.CATEGORY_ID order by p.CREATED_DATE`;
            database.query(sql)
                .then(dataset => resolve(dataset))
                .catch(err => reject(err));
        })
    }
    static findByProducer(producer_id) {
        return new Promise((resolve, reject) => {
            const sql = 'select * from product p, producer pr where pr.producer_id='+producer_id+' and pr.producer_id=p.PRODUCER_ID order by p.CREATED_DATE';
            database.query(sql)
                .then(dataset => resolve(dataset))
                .catch(err => reject(err));
        })
    }
    static filterByProducers(ref_producer, listProduct) {
        if (ref_producer === undefined) {
            return listProduct;
        }
        if (!Array.isArray(ref_producer)) {
            return listProduct.filter(n => n.PRODUCER_ID.toString() === ref_producer);
        }
        else {
            return listProduct.filter(n => ref_producer.includes(n.PRODUCER_ID.toString()));
        }
    }
    static filterByPrice(listProduct, from_amount, to_amount) {
        return listProduct.filter(n => parseInt(n.PRICE) >= from_amount && parseInt(n.PRICE) <= to_amount);
    }
}
module.exports = Product;