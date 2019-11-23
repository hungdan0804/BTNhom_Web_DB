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
            database.query("select * from color where name=" + name)
                .then(dataset =>resolve(dataset[0]))
                .catch(err => reject(err))
        })
    }
}
module.exports = Color;