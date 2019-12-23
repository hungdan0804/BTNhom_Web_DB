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