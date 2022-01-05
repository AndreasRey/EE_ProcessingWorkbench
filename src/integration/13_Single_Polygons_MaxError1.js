// Run this file using the "node" command.
var integrateExports = require("../scripts/integrateExports");

var processingName = '13_Single_Polygons_MaxError1'
var suffix = '13'

var source_AoI = `${processingName}_AoI_export_GeoJSON_${suffix}.geojson`
var source_ESA = `${processingName}_ESA_export_GeoJSON_${suffix}.geojson`
var source_dictionnaries = `${processingName}_dictionaries_geoJSON_${suffix}.geojson`
var source_data = `${processingName}_GeoJSON_${suffix}.geojson`
var outputFolder = `${processingName}`

integrateExports(source_AoI, source_ESA, source_dictionnaries, source_data, outputFolder);