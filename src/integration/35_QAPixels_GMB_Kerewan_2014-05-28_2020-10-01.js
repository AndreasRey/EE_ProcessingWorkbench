// Run this file using the "node" command.
var integrateExports = require("../scripts/integrateExports");

var processingName = '35_QAPixels_GMB_Kerewan_2014-05-28_2020-10-01'

var source_data = `secondBatch/GMB_Kerewan_Geometry_QAPixels_2014-05-28_2020-10-01_GeoJSON_20220202-154742.geojson`
var outputFolder = `${processingName}`

integrateExports(false, false, false, source_data, outputFolder);