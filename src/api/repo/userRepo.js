var db  = require('../fn/mysql-db');
var md5 = require('crypto-js/md5');

exports.loadAll = function() {
	var sql = `select * from staff where isDelete = 0`;
	console.log(sql);
	return db.load(sql);
}

exports.loadOne = function(id) {

	var sql = `select * from staff where isDelete = 0 and id = ${id}`;
	console.log(sql);
	return db.load(sql);
}


exports.loadOnebyType = function(type) {
	
	var sql = `select * from staff where isDelete = 0 and userType = ${type}`;
	console.log(sql);
	return db.load(sql);
}

exports.getDriverByRefreshToken = function(reToken) {
	var sql = `select * from staff st ,token tk,driver v where tk.refresh_token = '${reToken}' and st.id=tk.id_user and st.id=v.staffId`;
	console.log(sql);
	return db.load(sql);
}

exports.loadForType = function(difriend) {
	if(difriend===0)
	{
		var sql = `select s.id, s.fullname, ds.statusName from staff s, drivestatus ds, driver dr where s.isDelete = 0 and s.userType = 4 and s.id = dr.staffId and dr.status = ds.id`;
	    console.log(sql);
	    return db.load(sql);
	}else{
		var sql = `select * from staff where isDelete = 0 and userType != 4`;
	   console.log(sql);
	    return db.load(sql);
	}
	
}



exports.getUserByRefreshToken = function(reToken) {
	var sql = `select * from staff st ,token tk where tk.refresh_token = '${reToken}' and st.id=tk.id_user`;
	console.log(sql);
	return db.load(sql);
}



exports.login = function(c) {
	var sql = `select * from staff where username = '${c.username}' and password = '${c.password}'`;
	console.log(sql);
	return db.load(sql);
}


exports.add = function(c) {
	var sql = `insert into staff(username,password,fullname,userType,isDelete,phone,dob) values('${c.username}','${c.password}','${c.fullname}',${c.userType},${c.isDelete},'${c.phone}','${c.dob}')`;
	console.log(sql);
	return db.write(sql);
}



exports.delete = function(id) {
	var sql = `delete from staff where id = ${id}`;
	console.log(sql);
	return db.write(sql);
}


exports.addDriver=function(driver)
{
	var sql = `insert into driver(staffId,status) values('${driver.staffId}',${driver.status})`;
	console.log(sql);
	return db.write(sql);
}

exports.updateStatusDriver = function(id,status){
	var sql = `update driver set status = ${status} where staffId = ${id}`;
	console.log(sql);
	return db.write(sql); 
}

exports.getCustomer = function() {
	var sql = `select * from customer`;
	return db.write(sql); 
}
