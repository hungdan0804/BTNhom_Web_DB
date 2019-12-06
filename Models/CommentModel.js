const database = require("../utils/Database");
class Comment {
    constructor() {
        this.comment_id;
        this.username;
        this.product_id;
        this.content;
    }
    static GetAll() {
        return new Promise((resolve, reject) => {
            database.query("select * from comment")
                .then(dataset =>resolve(dataset))
                .catch(err => reject(err))
        })
    }
    static findByProductId(product_id) {
        return new Promise((resolve, reject) => {
            const sql = 'select * from comment where product_id='+ product_id;
            database.query(sql)
                .then(dataset => {
                    if (dataset != undefined)
                        resolve(dataset);
                    else
                        resolve(dataset);
                }).catch(err => reject(err));
        })
    }
    static insert(username,content,product_id) {
        return new Promise((resolve, reject) => {
            const sql = "insert into comment(product_id,content,username) values('"+product_id+"','"+content+"','"
                +username+"')";
            database.query(sql)
                .then(dataset => resolve(dataset))
                .catch(err => reject(err));
        })
    }
}
module.exports = Comment;