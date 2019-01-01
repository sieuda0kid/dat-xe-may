var db = require('../fn/mysql-db');
var md5=require('crypto-js/md5');

exports.getRefreshToken = function(rows) {
	var sql = `select * from token where id_user = ${rows[0].id}`;
	return db.write(sql);
}
exports.deleteRefreshToken = function(id) {
	var sql = `delete * from token where id_user = ${id}`;
	return db.write(sql);
}
exports.addRefreshToken = function(c) {
	var sql = `insert into token(id_user,refresh_token,isFrist) values('${c.id_user}','${c.refresh_token}',${c.isFrist})`;
	return db.write(sql);
}
exports.getRefreshTokenByToken = function(c) {
	var sql = `select * from token where refresh_token = '${c}'`
	return db.write(sql);
}