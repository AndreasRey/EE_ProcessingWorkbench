// Run this file using the "node" command.
var integrateExports = require("../scripts/integrateExports");

var processingName = '20_GMB_KerewanAdm2_2019to2020'
var suffix = '20'

var source_data = `20_GMB_KerewanAdm2_GEOMETRY_2019to2020_RF100_GeoJSON.geojson`
var outputFolder = `${processingName}`

integrateExports(false, false, false, source_data, outputFolder);