const database = require("../utils/Database");
const BillDetail = require('./BillDetailModel');
class Bill {
    constructor() {
        this.bill_id = 0;
        this.customer = 0;
        this.total_price = 0;
        this.description = "";
        this.status = "new";
        this.bill_detail = [];
    }
    static GetNewestBillId() {
        return new Promise((resolve, reject) => {
            database.query("SELECT bill_id FROM bill ORDER BY bill_id DESC limit 1")
                .then(dataset =>resolve(dataset[0].bill_id))
                .catch(err => reject(err))
        })
    }
    insert() {
        this.insertBillOnly();
        Bill.GetNewestBillId().then(bill_id => {
            this.bill_detail.forEach(n => {
                n.bill_id = bill_id;
                BillDetail.Insert(n);
            })
        });
    }
    insertBillOnly() {
        let sql = `insert into bill(customer, description, total_price, status,
                    firstname,lastname,company,email,country,address,town,zipcode,phone,pay_type) 
                    values (${this.customer},'${this.description}',${this.total_price},'${this.status}',
                    '${this.firstname}','${this.lastname}','${this.company}','${this.email}','${this.country}',
                    '${this.address}','${this.town}','${this.zipcode}','${this.phone}','${this.pay_type}')`;
        database.query(sql);
    }
    static GetAll() {
        return new Promise((resolve, reject) => {
            database.query("select * from bill")
                .then(dataset =>resolve(dataset))
                .catch(err => reject(err))
        })
    }
    static findById(id) {
        return new Promise((resolve, reject) => {
            const sql = 'select * from bill where bill_id=' + id;
            database.query(sql)
                .then(dataset => resolve(dataset[0]))
                .catch(err => reject(err));
        })
    }
    static GetAllWithCustomerName() {
        return new Promise((resolve, reject) => {
            database.query("select b.*, u.fullname as customer_name from bill b, users u where u.user_id=b.customer")
                .then(dataset =>resolve(dataset))
                .catch(err => reject(err))
        })
    }
    static GetByCustomer(user_id) {
        return new Promise((resolve, reject) => {
            database.query(`select * from bill where customer=${user_id}`)
                .then(dataset =>resolve(dataset))
                .catch(err => reject(err))
        })
    }
    static findByIdWithCustomerName(id) {
        return new Promise((resolve, reject) => {
            const sql = `select b.*, u.fullname as customer_name from bill b, users u where b.bill_id=${id} and u.user_id=b.customer`;
            database.query(sql)
                .then(dataset => resolve(dataset[0]))
                .catch(err => reject(err));
        })
    }
}
module.exports = Bill;