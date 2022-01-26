// Run this file using the "node" command.
var integrateExports = require("../scripts/integrateExports");

var processingName = '31_GMB_KerewanAdm2_FullYears_RandomPoints_2013to2020'

var source_data = `31_GMB_KerewanAdm2_FullYears_RandomPoints_2013to2020.geojson`
var outputFolder = `${processingName}`

integrateExports(false, false, false, source_data, outputFolder);