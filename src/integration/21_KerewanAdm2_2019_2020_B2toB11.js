// Run this file using the "node" command.
var integrateExports = require("../scripts/integrateExports");

var processingName = '21_GMB_KerewanAdm2_2019to2020_B2toB11'
var suffix = '21'

var source_data = `21_GMB_KerewanAdm2_GEOMETRY_2019to2020_RF100_B2toB11GeoJSON.geojson`
var outputFolder = `${processingName}`

integrateExports(false, false, false, source_data, outputFolder);