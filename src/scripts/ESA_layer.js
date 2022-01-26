var fs = require('fs');
var geojson = require('../utils/geojson');

var sourceFileName = 'NER_Tillabery_Say_Say_ESA_Export.geojson'
var context = 'NER_Tillabery_Say_Say'

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
var files = content.filter(function (o) { return o.indexOf('.') !== -1 && ['.gitkeep', 'list.json', 'refData.json'].indexOf(o) === -1 });
fs.writeFileSync(`../data/refData.json`, JSON.stringify(files));