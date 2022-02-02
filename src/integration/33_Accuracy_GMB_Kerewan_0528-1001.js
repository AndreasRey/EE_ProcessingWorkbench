// Run this file using the "node" command.
var integrateExports = require("../scripts/integrateExports");

var processingName = '33_Accuracy_GMB_Kerewan_0528-1001'

var source_data = `secondBatch/GMB_Kerewan_Accuracy_2020-05-28_2020-10-01_GeoJSON_20220202-0420.geojson`
var source_dictionnaries = `secondBatch/GMB_Kerewan_Accuracy_2020-05-28_2020-10-01_dictionaries_geoJSON_20220202-0420.geojson`
var outputFolder = `${processingName}`

integrateExports(false, false, source_dictionnaries, source_data, outputFolder);