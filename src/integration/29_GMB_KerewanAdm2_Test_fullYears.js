// Run this file using the "node" command.
var integrateExports = require("../scripts/integrateExports");

var processingName = '29_GMB_KerewanAdm2_Test_fullYears'

var source_data = `29_GMB_KerewanAdm2_Test_fullYears.geojson`
var outputFolder = `${processingName}`

integrateExports(false, false, false, source_data, outputFolder);