// Run this file using the "node" command.
var integrateExports = require("../scripts/integrateExports");

var processingName = '32_Accuracy_GMB_Kerewan_2020-01-01_2020-12-31'

var source_data = `GMB_Kerewan_Accuracy_2020-01-01_2020-12-31_GeoJSON_20220202-0420.geojson`
var outputFolder = `${processingName}`

integrateExports(false, false, false, source_data, outputFolder);