var fs = require('fs')
var each = require('lodash.foreach')
var geojson = require('../utils/geojson')

var layerCollection = JSON.parse(fs.readFileSync('../data/16_Period_Test/results/layers.json'))
var output_ESA_only
var output_Classified_only
each(layerCollection, function (layer) {
  var features_ESA_only = layer.features.filter(function (feature) {
      return feature.properties.type === 'ESA Only' && feature.properties.classifier === 'L8xB_30_RF100_Growing'
  })
  if (features_ESA_only.length > 0) {
      output_ESA_only = geojson.collection(features_ESA_only)
  }
  var features_Classified_only = layer.features.filter(function (feature) {
      return feature.properties.type === 'Classified Only' && feature.properties.classifier === 'L8xB_30_RF100_Growing'
  })
  if (features_ESA_only.length > 0) {
      output_Classified_only = geojson.collection(features_Classified_only)
  }
})
fs.writeFileSync('../../misc/ESA_Only.geojson', JSON.stringify(output_ESA_only))
fs.writeFileSync('../../misc/Classified_Only.geojson', JSON.stringify(output_Classified_only))