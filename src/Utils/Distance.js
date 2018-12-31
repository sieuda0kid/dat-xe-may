
import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:8888');

export const haversineDistance = (latlngA, latlngB, isMiles) => {
     const toRad = x => (x * Math.PI) / 180;
    var R = 6378137; //Haversine Earth’s mean radius in meter
    var dLat = toRad(latlngB[0] - latlngA[0])
    var dLong = toRad(latlngB[1] - latlngA[1]);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(latlngA[0])) * Math.cos(toRad(latlngB[0])) *
      Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d <= 100; 
  }


export { socket };