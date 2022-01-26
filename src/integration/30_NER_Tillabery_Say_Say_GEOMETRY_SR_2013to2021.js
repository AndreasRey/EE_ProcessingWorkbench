// Run this file using the "node" command.
var integrateExports = require("../scripts/integrateExports");

var processingName = '30_NER_Tillabery_Say_Say_GEOMETRY_SR_2013to2021'

var source_data = `30_NER_Tillabery_Say_Say_GEOMETRY_SR_2013to2021.geojson`
var outputFolder = `${processingName}`

integrateExports(false, false, false, source_data, outputFolder);