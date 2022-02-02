// Run this file using the "node" command.
var integrateExports = require("../scripts/integrateExports");

var processingName = '32_Accuracy_GMB_Kerewan_0101-1231'

var source_data = `secondBatch/GMB_Kerewan_Accuracy_2020-01-01_2020-12-31_GeoJSON_20220202-0420.geojson`
var source_dictionnaries = `secondBatch/GMB_Kerewan_Accuracy_2020-01-01_2020-12-31_dictionaries_geoJSON_20220202-0420.geojson`
var outputFolder = `${processingName}`

integrateExports(false, false, source_dictionnaries, source_data, outputFolder);