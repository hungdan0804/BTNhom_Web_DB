const database = require("../utils/Database");
class User {
    constructor() {
        this.user_id=0;
        this.username = "";
        this.password="";
        this.name="";
        this.email="";
        this.phone="";
    }
    static GetAll() {
        return new Promise((resolve, reject) => {
            database.query("select * from users")
                .then(dataset =>resolve(dataset))
                .catch(err => reject(err))
        })
    }
    static UpdatePassword(username,New) {
        return new Promise((resolve, reject) => {
            database.query("update users set password='"+New+"'where username like '"+username+"'")
                .then(dataset =>resolve(dataset))
                .catch(err => reject(err))
        })
    }
    static UpdateActive(username) {
        return new Promise((resolve, reject) => {
            database.query("update users set is_active='"+1+"'where username like '"+username+"'")
                .then(dataset =>resolve(dataset))
                .catch(err => reject(err))
        })
    }
    static UpdateProfile(username,fullname,email) {
        return new Promise((resolve, reject) => {
            database.query("update users set fullname='"+fullname+"' and email='"+ email+"' where username like '"+username+"'")
                .then(dataset =>resolve(dataset))
                .catch(err => reject(err))
        })
    }
    static findById(id) {
        return new Promise((resolve, reject) => {
            const sql = 'select * from users where user_id='+ id;
            database.query(sql)
                .then(dataset => {
                    if (dataset != undefined)
                        resolve(dataset[0]);
                    else
                        resolve(dataset);
                }).catch(err => reject(err));
        })
    }
    static findByUsername(username) {
        return new Promise((resolve, reject) => {
            const sql = "select * from users where username like '"+username+"'";
            database.query(sql)
                .then(dataset => resolve(dataset))
                .catch(err => reject(err));
        })
    }
    static findByEmail(email) {
        return new Promise((resolve, reject) => {
            const sql = "select * from users where email like '"+email+"'";
            database.query(sql)
                .then(dataset => resolve(dataset))
                .catch(err => reject(err));
        })
    }
    static insert(username,password,fullname,email,phone) {
        return new Promise((resolve, reject) => {
            const sql = "insert into users(username,password,fullname,email,phone) values('"+username+"','"+password+"','"
            +fullname+"','"+email+"','"+phone+"')";
            database.query(sql)
                .then(dataset => resolve(dataset))
                .catch(err => reject(err));
        })
    }
}
module.exports = User;