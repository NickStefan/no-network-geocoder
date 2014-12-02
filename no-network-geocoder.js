var dblite = require('dblite');
var db = dblite('./geonames-sqlite/geonames.sqlite3');
var Promise = require('bluebird');

function dbAsync(sql, strLocation) {
  return new Promise(function(resolve,reject){
    db.query(sql,[strLocation],function(err,data){
      if (err) {console.log(err)};
      resolve(data);
    });
  });
}

var geocoder = function(strLocation,cb){
  // regex out any non alpha characters, but leave in , (it needs to stay in for this step)
  var strLocation1 = strLocation.replace(/[^a-zA-z\s,]|_|\[|\]|\\|\//gi,"");
  // regex out any leading, double and end spaces, and ', CA'
  var strLocation2 = strLocation1.replace(/^\s+|\s+$|\s+(?=\s)|,.+/gi,"");
  // regex out any non alpha or space character
  var finalStrLocation = strLocation2.replace(/[^\w\s]/,"");

  if (!finalStrLocation) {
    // nothing to search the database with
    return cb(null,null);
  } else {
    sql = "SELECT * FROM geoname_fulltext WHERE longname MATCH ? AND country = 'United States' ORDER BY population DESC LIMIT 1";
    return dbAsync(sql, finalStrLocation).then(function(data){
      if (data.length !== undefined){
        data = {
          id: data[0][0],
          fullAddress: data[0][1],
          cityName: data[0][2],
          state: data[0][3],
          country: data[0][4],
          population: data[0][5],
          latitude: data[0][6],
          longitude: data[0][7],
          timezone: data[0][8]
        }
      }
      return cb(null,data);
    });
  }
}

function geoAsync(strLocation){
  return new Promise(function(resolve,reject){
    geocoder(strLocation,function(err,data){
      resolve(data);
    });
  });
}

module.exports = geoAsync;