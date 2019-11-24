const mysql = require('mysql');
const dotenv=require('dotenv').config();
const con = mysql.createConnection({
    host:process.env.DB_SERVER,
    user:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});
class Database {
    constructor() {
        this.connection = mysql.createConnection({
            host:process.env.DB_SERVER,
            user:process.env.DB_USERNAME,
            password:process.env.DB_PASSWORD,
            database: process.env.DB_NAME
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