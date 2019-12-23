const database = require("../utils/Database");
class BillDetail {
    constructor() {
        this.bill_id = 0;
        this.product_id = 0;
        this.amount = 0;
    }
    insert() {
        let sql = `insert into bill_detail(bill_id, product_id, amount) values (${this.bill_id},${this.product_id},${this.amount})`;
        database.query(sql);
    }
    static Insert(bill_detail) {
        let sql = `insert into bill_detail(bill_id, product_id, amount) values (${bill_detail.bill_id},${bill_detail.product_id},${bill_detail.amount})`;
        database.query(sql);
    }
    static GetAll() {
        return new Promise((resolve, reject) => {
            database.query("select * from bill_detail")
                .then(dataset =>resolve(dataset))
                .catch(err => reject(err))
        })
    }
    static findByBillId(id) {
        return new Promise((resolve, reject) => {
            const sql = 'select * from bill_detail where bill_id=' + id;
            database.query(sql)
                .then(dataset => resolve(dataset))
                .catch(err => reject(err));
        })
    }
}
module.exports = BillDetail;