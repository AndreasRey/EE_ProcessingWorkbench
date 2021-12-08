// Run this file using the "node" command

var fs = require('fs');
var geojson = require('./geojson');

var data = JSON.parse(fs.readFileSync('../../data/sources/sample_aoi_7.geojson'));

var features = [
  geojson.feature(data.features[0].properties.croplands_esa)
]

var collection = geojson.collection(features);

fs.writeFileSync('../../data/reference/reference.json', JSON.stringify(collection));
