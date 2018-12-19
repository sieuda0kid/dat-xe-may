var db  = require('../fn/mysql-db');
var md5 = require('crypto-js/md5');


exports.loadAll = function() {
	 
}


exports.loadOne = function(id) {
	 
}


exports.loadOnebyType = function(type) {
	
	 
}

exports.getUserByRefreshToken = function(reToken) {
 
}


exports.login = (u) => {
    var sql = `select * from account where username = '${u.username}' and password = '${u.password}' and type = '${u.type}'`;
	console.log(sql);
	return db.load(sql);
}


exports.loadForType = function(difriend) {
 
	
}


exports.add = function(c) {
	var sql = `insert into staff(username,password,fullname,userType,isDelete,phone,dob) values('${c.username}','${c.password}','${c.fullname}',${c.userType},${c.isDelete},'${c.phone}','${c.dob}')`;
	return db.write(sql);
}

exports.delete = function(id) {
	var sql = `delete from staff where id = ${id}`;
	return db.write(sql);
}