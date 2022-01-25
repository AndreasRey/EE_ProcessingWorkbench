// Run this file using the "node" command.
var integrateExports = require("../scripts/integrateExports");

var processingName = '27_GMB_KerewanAdm2_TestTrainingData_fewPoints'
var suffix = '27'

var source_data = `27_GMB_KerewanAdm2_TestTrainingData_fewPoints.geojson`
var outputFolder = `${processingName}`

integrateExports(false, false, false, source_data, outputFolder);