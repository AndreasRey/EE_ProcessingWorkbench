var fs = require('fs');
var geojson = require('../utils/geojson');
var keyBy = require('lodash.keyby');
var each = require('lodash.foreach');

function integrateExports (source_AoI, source_ESA, source_dictionnaries, source_data, outputFolder) {

  if (!fs.existsSync(`../data/${outputFolder}`)) {
    fs.mkdirSync(`../data/${outputFolder}`)
  }
  if (!fs.existsSync(`../data/${outputFolder}/reference`)) {
    fs.mkdirSync(`../data/${outputFolder}/reference`)
  }
  if (!fs.existsSync(`../data/${outputFolder}/results`)) {
    fs.mkdirSync(`../data/${outputFolder}/results`)
  }

  // --> AOI
  var sourceAoI = JSON.parse(fs.readFileSync(`../../eeExports/${source_AoI}`));
  var featuresAoI = sourceAoI.features.map(function (feature) {
    return geojson.feature(feature.properties.geom, {
      name: feature.properties.name
    })
  })
  var collection_AoI = geojson.collection(featuresAoI);
  fs.writeFileSync(`../data/${outputFolder}/reference/aoi.json`, JSON.stringify(collection_AoI));

  // --> ESA
  var sourceESA = JSON.parse(fs.readFileSync(`../../eeExports/${source_ESA}`));
  var featuresESA = sourceESA.features.map(function (feature) {
    return geojson.feature(feature.properties.geom, {
      name: feature.properties.name
    })
  })
  var collection_ESA = geojson.collection(featuresESA);
  fs.writeFileSync(`../data/${outputFolder}/reference/reference.json`, JSON.stringify(collection_ESA));


  // --> DICTIONARIES
  var sourceDictionaries = JSON.parse(fs.readFileSync(`../../eeExports/${source_dictionnaries}`));
  var dictionaries_props = sourceDictionaries.features.map(function (o) {
    return o.properties
  });
  var dictionaries_output = keyBy(dictionaries_props, function (o) {
    return o.classifierid
  });
  fs.writeFileSync(`../data/${outputFolder}/results/dictionaries.json`, JSON.stringify(dictionaries_output));

  // --> PROCESSINGS
  var sourceProcessings = JSON.parse(fs.readFileSync(`../../eeExports/${source_data}`));
  var collections = []
  var tableRows = []
  var layers = {}
  each(sourceProcessings.features, function (feature) {
    var classifier = feature.properties.classifierid;
    if (!layers[classifier]) {layers[classifier] = []}
    layers[classifier].push(geojson.feature(feature.properties.intersection, { classifier: classifier, type: 'Common' }));
    layers[classifier].push(geojson.feature(feature.properties.diff_esa, { classifier: classifier, type: 'ESA Only' }));
    layers[classifier].push(geojson.feature(feature.properties.diff, { classifier: classifier, type: 'Classified Only' }));
    
    var row = {};
    each(feature.properties, function (v, k) {
      if (['intersection', 'diff', 'diff_esa'].indexOf(k) === -1) {
        row[k] = v
      }
    });
    tableRows.push(row);
  })
  each(layers, function (features) {
    collections.push(geojson.collection(features));
  })
  fs.writeFileSync(`../data/${outputFolder}/results/processings.json`, JSON.stringify(tableRows));
  fs.writeFileSync(`../data/${outputFolder}/results/layers.json`, JSON.stringify(collections));

  // --> Update data folders index (any items having a name that doesn't include the "." char will be considered as a folder to be indexed)
  var content = fs.readdirSync('../data')
  var folders = content.filter(function (o) { return o.indexOf('.') === -1 })
  fs.writeFileSync(`../data/list.json`, JSON.stringify(folders));
}
module.exports = integrateExports;