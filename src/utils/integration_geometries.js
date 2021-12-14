// Run this file using the "node" command
var fs = require('fs');
var geojson = require('./geojson');
var keyBy = require('lodash.keyby');
var each = require('lodash.foreach');

// --> DICTIONARIES
var sourceDictionaries = JSON.parse(fs.readFileSync('../../data/sources/Processing_polygons_test_common_area_dictionaries_geoJSON_4.geojson'));
var dictionaries_props = sourceDictionaries.features.map(function (o) {
  return o.properties
});
var dictionaries_output = keyBy(dictionaries_props, function (o) {
  return o.classifierid
});
fs.writeFileSync('../../data/geometries_results/dictionaries.json', JSON.stringify(dictionaries_output));

// --> PROCESSINGS
var sourceProcessings = JSON.parse(fs.readFileSync('../../data/sources/Processing_polygons_test_common_area_GeoJSON_4.geojson'));

var collections = []
var tableRows = []

each(sourceProcessings.features, function (feature) {
  var classifier = feature.properties.classifierid;
  var features = []
  features.push(geojson.feature(feature.properties.intersection, { classifier: classifier, type: 'Common' }));
  features.push(geojson.feature(feature.properties.diff_esa, { classifier: classifier, type: 'ESA Only' }));
  features.push(geojson.feature(feature.properties.diff, { classifier: classifier, type: 'Classified Only' }));
  collections.push(geojson.collection(features));
  var row = {};
  each(feature.properties, function (v, k) {
    if (['intersection', 'diff', 'diff_esa'].indexOf(k) === -1) {
      row[k] = v
    }
  });
  tableRows.push(row);
})

fs.writeFileSync('../../data/geometries_results/processings.json', JSON.stringify(tableRows));
fs.writeFileSync('../../data/geometries_results/layers.json', JSON.stringify(collections));
