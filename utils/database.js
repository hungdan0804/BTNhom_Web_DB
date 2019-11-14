const mysql = require('mysql');
const con = mysql.createConnection({
    host:"remotemysql.com",
    user:"z66oihq6CP",
    password: "D5UVmEnBZU",
    database: "z66oihq6CP"
});
module.exports = {
    GetConnection: function() {
        if (con.state == 'disconnected') {
            con.connect(function(err) {
                if (err) throw err;
                console.log("Connected!");
            });
        }
        return con;
    },
    GetAllFromTable: function(table_name, callback) {
        const sql = "select * from " + table_name;
        this.GetConnection().query(sql, function(err, result) {
            if (err)
                callback(err,null);
            else
                callback(null,result);
        });
    },
    Query: function (sql, callback) {
        this.GetConnection().query(sql, function (err, result) {
            if (err)
                callback(err,null);
            else
                callback(null,result);
        })
    }
};
