/* Calculates the distance in miles between two coordinates using the
Haversine formula. This implementation is copied from Stack Overflow:
stackoverflow.com/questions/14560999/using-the-haversine
-formula-in-javascript
*/
function toRad(x) {
  return x * Math.PI / 180;
}

function haversine(coords1, coords2) {
  var lon1 = coords1[0],
      lat1 = coords1[1],
      lon2 = coords2[0],
      lat2 = coords2[1];

  var R = 6371; // km

  var x1 = lat2 - lat1;
  var dLat = toRad(x1);
  var x2 = lon2 - lon1;
  var dLon = toRad(x2);
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // Convert to miles
  var d = (R * c) / 1.60934;
  return d;
}

module.exports = haversine;