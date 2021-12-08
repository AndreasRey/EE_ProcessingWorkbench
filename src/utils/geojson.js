function collection (features) {
  return {
    "type": "FeatureCollection",
    "features": features,
  }
}

function feature (geom, props) {
  return {
    "type": "Feature",
    "geometry": geom,
    "properties": props
  }
}

module.exports = {
  collection,
  feature
}