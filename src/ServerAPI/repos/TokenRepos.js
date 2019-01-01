var db = require('../fn/Connectiondata');
var md5=require('crypto-js/md5');

exports.getRefreshToken = function(rows) {
	var sql = `select * from token where id_user = ${rows[0].id}`;
	console.log(sql);
	return db.write(sql);
}
exports.deleteRefreshToken = function(id) {
	var sql = `delete * from token where id_user = ${id}`;
	console.log(sql);
	return db.write(sql);
}
exports.addRefreshToken = function(c) {
	var sql = `insert into token(id_user,refresh_token,isFrist) values('${c.id_user}','${c.refresh_token}',${c.isFrist})`;
	console.log(sql);
	return db.write(sql);
}
exports.getRefreshTokenByToken = function(c) {
	var sql = `select * from token where refresh_token = '${c}'`
	console.log(sql);
	return db.write(sql);
}
