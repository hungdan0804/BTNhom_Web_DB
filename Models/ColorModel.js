const database = require("../utils/Database");
class Color {
    constructor() {
        this.id = 0;
        this.name = "";
        this.hexcolor= "";
    }
    static GetAll() {
        return new Promise((resolve, reject) => {
            database.query("select * from color")
                .then(dataset =>resolve(dataset))
                .catch(err => reject(err))
        })
    }
    static getByName(name) {
        return new Promise((resolve, reject) => {
            let sql = "select * from color where name='" + name + "'";
            database.query(sql)
                .then(dataset => {
                    if (dataset == null || dataset.length == 0)
                        resolve(dataset);
                    else
                        resolve(dataset[0])
                })
                .catch(err => reject(err))
        })
    }
}
module.exports = Color;