var db = require('../fn/mysql-db');

exports.updateTripLocation = function(trip) {
	var sql = `update trip set tripLocation = '${trip.tripLocation}', tripLatitude = '${trip.tripLat}', tripLongitude = '${trip.tripLong}' where id = '${trip.id}'`;
	return db.write(sql);
}

exports.updateTripStatus = function(trip) {
	var sql = `update trip set status = '${trip.status}' where id = '${trip.id}'`;
	return db.write(sql);
}