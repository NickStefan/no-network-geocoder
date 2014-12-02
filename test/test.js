var should = require('chai').should();
var assert = require('assert');
assert.deepEqualWithDifflet = require('deep-equal-with-difflet');
var geoCode = require('../no-network-geocoder');
var _ = require('lodash');

var sanFran = {
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

var answers = {
  'San Francisco': sanFran,
  'San Francisco, CA':sanFran,
  ' san francisco, CA Ejhgfj':sanFran,
  '!!\_/$San Francisco!!':sanFran
}

describe("It should get San Francisco's geocode", function(){

  _(answers).each(function(expected,locationStr){
    it("Should take " + locationStr, function(done){
      geoCode(locationStr).then(function(data){
        assert.deepEqualWithDifflet(data, expected);
        done();
      });
    });
  });

});
