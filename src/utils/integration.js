// Run this file using the "node" command
var fs = require('fs');
var geojson = require('./geojson');
var keyBy = require('lodash.keyby');
var each = require('lodash.foreach');

// --> DICTIONARIES
var sourceDictionaries = JSON.parse(fs.readFileSync('../../data/sources/Processing_dictionaries_geoJSON_8.geojson'));
var dictionaries_props = sourceDictionaries.features.map(function (o) {
  return o.properties
});
var dictionaries_output = keyBy(dictionaries_props, function (o) {
  return o.classifierid
});
fs.writeFileSync('../../data/results/dictionaries.json', JSON.stringify(dictionaries_output));

// --> PROCESSINGS
var sourceProcessings = JSON.parse(fs.readFileSync('../../data/sources/Processing_geoJSON_8.geojson'));

var collections = []
var tableRows = []

each(sourceProcessings.features, function (feature) {
  var classifier = feature.properties.classifierid;
  var geom = feature.properties.croplands;
  var features = []
  features.push(geojson.feature(geom, { classifier: classifier }));
  collections.push(geojson.collection(features));
  var row = {};
  each(feature.properties, function (v, k) {
    if (k !== 'croplands') {
      row[k] = v
    }
  });
  tableRows.push(row);
})

fs.writeFileSync('../../data/results/processings.json', JSON.stringify(tableRows));
fs.writeFileSync('../../data/results/layers.json', JSON.stringify(collections));
