var fs = require('fs');
var geojson = require('../utils/geojson');
var keyBy = require('lodash.keyby');
var each = require('lodash.foreach');
var round = require('lodash.round');
var intersection = require('@turf/intersect');
var area = require('@turf/area');

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
  if (source_AoI) {
    var sourceAoI = JSON.parse(fs.readFileSync(`../../eeExports/${source_AoI}`));
    var featuresAoI = sourceAoI.features.map(function (feature) {
      return geojson.feature(feature.properties.geom, {
        name: feature.properties.name
      })
    })
    var collection_AoI = geojson.collection(featuresAoI);
    fs.writeFileSync(`../data/${outputFolder}/reference/aoi.json`, JSON.stringify(collection_AoI));  
  }

  // --> ESA
  if (source_ESA) {
    var sourceESA = JSON.parse(fs.readFileSync(`../../eeExports/${source_ESA}`));
    var featuresESA = sourceESA.features.map(function (feature) {
      return geojson.feature(feature.properties.geom, {
        name: feature.properties.name
      })
    })
    var collection_ESA = geojson.collection(featuresESA);
    fs.writeFileSync(`../data/${outputFolder}/reference/reference.json`, JSON.stringify(collection_ESA));  
  }

  // --> DICTIONARIES
  if (source_dictionnaries) {
    var sourceDictionaries = JSON.parse(fs.readFileSync(`../../eeExports/${source_dictionnaries}`));
    var dictionaries_props = sourceDictionaries.features.map(function (o) {
      return o.properties
    });
    var dictionaries_output = keyBy(dictionaries_props, function (o) {
      return o.classifierid
    });
    fs.writeFileSync(`../data/${outputFolder}/results/dictionaries.json`, JSON.stringify(dictionaries_output));  
  }

  // --> PROCESSINGS
  var sourceProcessings = JSON.parse(fs.readFileSync(`../../eeExports/${source_data}`));
  var collections = []
  var tableRows = []
  var layers = {}

  var refYear = '2020'
  if (!source_dictionnaries) {
    var subregionsRefAreas = {}
    var refYearAreas = sourceProcessings.features.filter(function (o) {
      return o.properties.period === refYear
    })
    each(refYearAreas, function (v) {
      subregionsRefAreas[v.properties.subregion] = {}
      subregionsRefAreas[v.properties.subregion].geom = v.properties.croplands
      subregionsRefAreas[v.properties.subregion].area = v.properties.area_sqkm
    })
  }
  each(sourceProcessings.features, function (feature) {
    var classifier = feature.properties.classifierid ? feature.properties.classifierid : feature.properties.subregion + '_' + feature.properties.period ;
    if (!layers[classifier]) {layers[classifier] = []}
    if (feature.properties.intersection) { layers[classifier].push(geojson.feature(feature.properties.intersection, { classifier: classifier, type: 'Common' })); }
    if (feature.properties.diff_esa) { layers[classifier].push(geojson.feature(feature.properties.diff_esa, { classifier: classifier, type: 'ESA Only' })); }
    if (feature.properties.diff) { layers[classifier].push(geojson.feature(feature.properties.diff, { classifier: classifier, type: 'Classified Only' })); }
    var geojsonFeature
    var commonArea
    var areaNum
    var areaPercent
    if (feature.properties.croplands) {
      geojsonFeature = geojson.feature(feature.properties.croplands, { classifier: classifier, type: 'Croplands' })
      if (feature.properties.period !== refYear) {
        commonArea = intersection.default(subregionsRefAreas[feature.properties.subregion].geom, feature.properties.croplands)
        areaNum = round(area.default(commonArea) / 1000000, 2)
        areaPercent = round(areaNum / subregionsRefAreas[feature.properties.subregion].area * 100, 2)
      }
      layers[classifier].push(geojsonFeature);
    }
    
    var row = {};
    each(feature.properties, function (v, k) {
      if (['intersection', 'diff', 'diff_esa', 'croplands'].indexOf(k) === -1) {
        row[k] = v
      }
    });
    if (feature.properties.croplands) {
      row['common_2020'] = feature.properties.period !== refYear ? areaNum : 'N/A'
      row['common_2020_percent'] = feature.properties.period !== refYear ? areaPercent : 'N/A'
    }
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
  var files = content.filter(function (o) { return o.indexOf('.') !== -1 });
  fs.writeFileSync(`../data/refData.json`, JSON.stringify(files));
}
module.exports = integrateExports;