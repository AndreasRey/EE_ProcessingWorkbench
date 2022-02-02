// Run this file using the "node" command.
var integrateExports = require("../scripts/integrateExports");

var processingName = '33_QAPixels_GMB_Kerewan_2014-01-01_2020-12-31'

var source_data = `secondBatch/GMB_Kerewan_Geometry_QAPixels_2014-01-01_2020-12-31_GeoJSON_20220202-154858.geojson`
var outputFolder = `${processingName}`

integrateExports(false, false, false, source_data, outputFolder);