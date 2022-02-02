// Run this file using the "node" command.
var integrateExports = require("../scripts/integrateExports");

var processingName = '36_Accuracy_NER_Say_0101-1231'

var source_data = `secondBatch/NER_Say_adm3_Accuracy_2020-01-01_2020-12-31_GeoJSON_20220202-0450.geojson`
var source_dictionnaries = `secondBatch/NER_Say_adm3_Accuracy_2020-01-01_2020-12-31_dictionaries_geoJSON_20220202-0450.geojson`
var outputFolder = `${processingName}`

integrateExports(false, false, source_dictionnaries, source_data, outputFolder);