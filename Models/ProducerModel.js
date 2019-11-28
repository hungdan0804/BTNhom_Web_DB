const database = require("../utils/Database");
class Producer {
    constructor() {
        this.producer_id = 0;
        this.name = "";
        this.address = "";
    }
    static GetAll() {
        return new Promise((resolve, reject) => {
            database.query("select * from producer")
                .then(dataset =>resolve(dataset))
                .catch(err => reject(err))
        })
    }
    static findById(id) {
        return new Promise((resolve, reject) => {
            const sql = 'select * from producer where producer_id=' + id;
            database.query(sql)
                .then(dataset => {
                    if (dataset != undefined)
                        resolve(dataset[0]);
                    else
                        resolve(dataset);
                })
                .catch(err => reject(err));
        })
    }
}
module.exports = Producer;