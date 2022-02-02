// Run this file using the "node" command.
var integrateExports = require("../scripts/integrateExports");

var processingName = '38_Accuracy_NER_Say_0528-0915'

var source_data = `secondBatch/NER_Say_adm3_Accuracy_2020-05-28_2020-09-15_GeoJSON_20220202-0450.geojson`
var source_dictionnaries = `secondBatch/NER_Say_adm3_Accuracy_2020-05-28_2020-09-15_dictionaries_geoJSON_20220202-0450.geojson`
var outputFolder = `${processingName}`

integrateExports(false, false, source_dictionnaries, source_data, outputFolder);