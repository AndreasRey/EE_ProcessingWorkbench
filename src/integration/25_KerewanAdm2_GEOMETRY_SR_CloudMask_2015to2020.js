// Run this file using the "node" command.
var integrateExports = require("../scripts/integrateExports");

var processingName = '25_GMB_KerewanAdm2_GEOMETRY_SR_CloudMask_2015to2020'
var suffix = '25'

var source_data = `25_GMB_KerewanAdm2_GEOMETRY_SR_CloudMask_2015to2020.geojson`
var outputFolder = `${processingName}`

integrateExports(false, false, false, source_data, outputFolder);
