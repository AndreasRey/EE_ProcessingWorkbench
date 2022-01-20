// Run this file using the "node" command.
var integrateExports = require("../scripts/integrateExports");

var processingName = '24_GMB_KerewanAdm2_GEOMETRY_COMBINED_SR_Raw_2015to2020'
var suffix = '24'

var source_data = `24_GMB_KerewanAdm2_COMBINED_GEOMETRY_SR_2015to2020.geojson`
var outputFolder = `${processingName}`

integrateExports(false, false, false, source_data, outputFolder);

