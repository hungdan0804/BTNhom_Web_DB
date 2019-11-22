const mysql = require('mysql');
const con = mysql.createConnection({
    host:"remotemysql.com",
    user:"z66oihq6CP",
    password: "D5UVmEnBZU",
    database: "z66oihq6CP"
});
class Database {
    constructor() {
        this.connection = mysql.createConnection({
            host:"remotemysql.com",
            user:"z66oihq6CP",
            password: "D5UVmEnBZU",
            database: "z66oihq6CP"
        });
    }
    query( sql, args ) {
        return new Promise( ( resolve, reject ) => {
            this.connection.query( sql, args, ( err, rows ) => {
                if ( err )
                    return reject( err );
                resolve(rows);
            } );
        } );
    }
    close() {
        return new Promise( ( resolve, reject ) => {
            this.connection.end( err => {
                if ( err )
                    return reject( err );
                resolve();
            } );
        } );
    }
}
const database = new Database();
module.exports = database;