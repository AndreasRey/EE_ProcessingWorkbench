// Run this file using the "node" command.
var integrateExports = require("../scripts/integrateExports");

var processingName = '22_KerewanAdm2_CHIRPS_PDSI_BAI_GEOMETRY_2015to2020'
var suffix = '22'

var source_data = `22_Export_Croplands_GMB_KerewanAdm2_CHIRPS_PDSI_BAI_GEOMETRY_2015to2020_RF100_GeoJSON_20220109-1934.geojson`
var outputFolder = `${processingName}`

integrateExports(false, false, false, source_data, outputFolder);