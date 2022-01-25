var fs = require('fs');
var geojson = require('../utils/geojson');

var sourceFileName = 'GMB_Kerewan_ESA_Export.geojson'
var context = 'GMB_Kerewan'

var sourceESA = JSON.parse(fs.readFileSync(`../../eeExports/${sourceFileName}`));
var featuresESA = sourceESA.features.map(function (feature) {
  return geojson.feature(feature.properties.geom, {
    name: feature.properties.name,
    subregion: feature.properties.subregion
  })
})
var collection_ESA = geojson.collection(featuresESA);
fs.writeFileSync(`../data/${context}_ESA_Croplands.geojson`, JSON.stringify(collection_ESA));  
var content = fs.readdirSync('../data');
var files = content.filter(function (o) { return o.indexOf('.') !== -1 && o.indexOf('.gitkeep') === -1 && o.indexOf('.json') === -1});
fs.writeFileSync(`../data/refData.json`, JSON.stringify(files));