var db  = require('../fn/mysql-db');
var md5 = require('crypto-js/md5');


exports.loadAll = function() {
	var sql = `select * from staff where isDelete = 0`;
	return db.load(sql);
}


exports.loadOne = function(id) {
	console.log("id load one :"+id);
	var sql = `select * from staff where isDelete = 0 and id = ${id}`;
	return db.load(sql);
}


exports.getUserByRefreshToken = function(reToken) {
	var sql = `select * from staff st ,token tk where tk.refresh_token = '${reToken}' and st.id=tk.id_user`;
	console.log(sql);
	return db.load(sql);
}


exports.login = (u) => {
    var sql = `select * from account where username = '${u.username}' and password = '${u.password}' and type = '${u.type}'`;
    return db.load(sql);
}


exports.loadForType = function(difriend) {
	if(difriend===0)
	{
		var sql = `select * from staff where isDelete = 0 and userType = 4`;
	    return db.load(sql);
	}else{
		var sql = `select * from staff where isDelete = 0 and userType != 4`;
	    return db.load(sql);
	}
	
}


exports.add = function(c) {
	var sql = `insert into staff(username,password,fullname,userType,isDelete,phone,dob) values('${c.username}','${c.password}','${c.fullname}',${c.userType},${c.isDelete},'${c.phone}','${c.dob}')`;
	return db.write(sql);
}

exports.delete = function(id) {
	var sql = `delete from staff where id = ${id}`;
	return db.write(sql);
}