// Run this file using the "node" command.
var integrateExports = require("../scripts/integrateExports");

var processingName = '23_GMB_KerewanAdm2_GEOMETRY_L8SurfaceReflectance_2015to2020'
var suffix = '23'

var source_data = `23_GMB_KerewanAdm2_GEOMETRY_SR_2015to2020.geojson`
var outputFolder = `${processingName}`

integrateExports(false, false, false, source_data, outputFolder);

