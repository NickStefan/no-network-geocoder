#no-network-geocoder

Geocode city names without any network requests, by using a lightweight prepopulated SQLite database. Currently only works for US cities.

### use
```
var geoCode = require('../no-network-geocoder');

geoCode('San Francisco').then(function(dataObj){
  // dataObj
};
```

### returned dataObj
```
{
  "id" : "5391959",
  "fullAddress" : "San Francisco, California, United States",
  "cityName" : "San Francisco",
  "state" : "California",
  "country" : "United States",
  "population" : "805235",
  "latitude" : "37.77493",
  "longitude" : "-122.41942",
  "timezone" : "America/Los_Angeles"
};
```

### install
```
$ npm install no-network-geocoder
```

### test
```
$ npm test
```

Special thanks to https://github.com/mjradwin/geonames-sqlite for writing the original script to convert geonames text data to an actual SQLite database.
