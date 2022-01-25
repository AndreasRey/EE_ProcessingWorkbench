// Run this file using the "node" command.
var integrateExports = require("../scripts/integrateExports");

var processingName = '28_GMB_KerewanAdm2_TestTrainingData_allPoints'
var suffix = '28'

var source_data = `28_GMB_KerewanAdm2_TestTrainingData_allPoints.geojson`
var outputFolder = `${processingName}`

integrateExports(false, false, false, source_data, outputFolder);