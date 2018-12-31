var mysql = require('mysql');

// thưc thi các query select database
exports.load = function(sql) {
    return new Promise((resolve, reject) => {
        var connection = mysql.createConnection({
            host: 'us-cdbr-iron-east-01.cleardb.net',
            port: '3306',
            user: 'b7d771d665cbf4',
            password: 'b3e6e3b9',
            database: 'heroku_7c0f2df8574bd81'
        });

        connection.query(sql, (error, results, fields) => {
            if (error)
                reject(error);
            else resolve(results);

            connection.end();
        });
    });
}

//thưc thi các query insert,update,delete database
exports.write = function(sql) {
    return new Promise((resolve, reject) => {
        var connection = mysql.createConnection({
            host: 'us-cdbr-iron-east-01.cleardb.net',
            port: '3306',
            user: 'b7d771d665cbf4',
            password: 'b3e6e3b9',
            database: 'heroku_7c0f2df8574bd81'
        });

        connection.connect();

        connection.query(sql, (error, value) => {
            if (error)
                reject(error);
            else resolve(value);

            connection.end();
        });
    });
}