var db  = require('../fn/mysql-db');

exports.login = (u) => {
    var sql = `select * from account where username = '${u.username}' and password = '${u.password}' and type = '${u.type}'`;
    return db.load(sql);
}