// Run this file using the "node" command.
var integrateExports = require("../scripts/integrateExports");

var processingName = '43_NER_Say_IrrigatedAreas_2014-05-28_2020-09-15'

var source_data = `secondBatch/NER_Say_adm3_IrrigatedAreas_Geometry_2014-05-28_2020-09-15_GeoJSON_20220202-162940.geojson`
var outputFolder = `${processingName}`

integrateExports(false, false, false, source_data, outputFolder);