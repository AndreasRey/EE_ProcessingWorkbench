// Run this file using the "node" command.
var integrateExports = require("../scripts/integrateExports");

var processingName = '40_Accuracy_NER_Say_IrrigatedAreas_0101-1231'

var source_data = `secondBatch/NER_Say_adm3_IrrigatedAreas_Accuracy_2020-01-01_2020-12-31_GeoJSON_20220202-162849.geojson`
var source_dictionnaries = `secondBatch/NER_Say_adm3_IrrigatedAreas_Accuracy_2020-01-01_2020-12-31_dictionaries_geoJSON_20220202-162849.geojson`
var outputFolder = `${processingName}`

integrateExports(false, false, source_dictionnaries, source_data, outputFolder);