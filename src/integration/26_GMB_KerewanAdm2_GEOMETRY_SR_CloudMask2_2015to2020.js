// Run this file using the "node" command.
var integrateExports = require("../scripts/integrateExports");

var processingName = '26_GMB_KerewanAdm2_GEOMETRY_SR_CloudMask2_2015to2020'
var suffix = '26'

var source_data = `26_GMB_KerewanAdm2_GEOMETRY_SR_CloudMask2_2015to2020.geojson`
var outputFolder = `${processingName}`

integrateExports(false, false, false, source_data, outputFolder);