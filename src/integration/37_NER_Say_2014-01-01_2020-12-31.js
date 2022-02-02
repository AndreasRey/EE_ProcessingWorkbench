// Run this file using the "node" command.
var integrateExports = require("../scripts/integrateExports");

var processingName = '37_NER_Say_2014-01-01_2020-12-31'

var source_data = `secondBatch/NER_Say_adm3_Geometry_2014-01-01_2020-12-31_GeoJSON_20220203-1155.geojson`
var outputFolder = `${processingName}`

integrateExports(false, false, false, source_data, outputFolder);