const bcrypt = require('bcryptjs');

class HashHelper {
    constructor(){

    }
    static createHash=function(password){
        return bcrypt.hashSync(password,bcrypt.genSaltSync(10),null);
    }
    static isValidPassword=function(user,password){
        return bcrypt.compareSync(password,user[0].password);
    }
}
module.exports = HashHelper;