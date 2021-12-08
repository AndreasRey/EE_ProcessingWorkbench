import 'leaflet/dist/leaflet.css'
import 'leaflet.fullscreen/Control.FullScreen.css'
import L from 'leaflet'
import 'leaflet.fullscreen'
import _ from '../lib/lodash-bundle'
import Rainbow from 'rainbowvis.js'

function map (data) {
  console.log('map data', data)
  var aoi = L.geoJSON(data.aoi, {
    style: {
      color: '#000000',
      opacity: 1,
      weight: 2,
      fill: false
    }
  });
  var esa = L.geoJSON(data.reference, {
    style: {
      color: '#11ff45',
      opacity: 1,
      weight: 2,
      fill: true,
      fillColor: '#11ff45',
      fillOpacity: 0.2
    }
  });
  var esaBounds = esa.getBounds()
  var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
  });
  var OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });
  var leafletMap = L.map('map', {
    layers: [Esri_WorldImagery, aoi, esa],
    maxBounds: esaBounds.pad(2),
    fullscreenControl: {
      position: 'topright',
      forcePseudoFullscreen: false // if true, fullscreen to page width and height
    }
  })
  leafletMap.fitBounds(aoi.getBounds())

  var baseMaps = {
    "Esri_WorldImagery": Esri_WorldImagery,
    "OpenStreetMap_Mapnik": OpenStreetMap_Mapnik
  };



  var overlayMaps = {
    "Area of interest": aoi,
    "ESA WorldCover 2020 (reference)": esa
  };

  var myRainbow = new Rainbow();
  myRainbow.setSpectrum('#f70e0e', '#f7e60e', '#0ed2f7', '#c20ef7');
  myRainbow.setNumberRange(0, data.layers.length);
  _.each(data.layers, function (v, i) {
    var layerName = v.features[0].properties.classifier;
    var color = '#' + myRainbow.colorAt(i)
    var layer = L.geoJSON(v, {
      style: {
        color: color,
        opacity: 1,
        weight: 2,
        fill: true,
        fillColor: color,
        fillOpacity: 0.3
      }
    });
    layer.bindPopup(layerName)
    overlayMaps[layerName] = layer
  })

  L.control.layers(baseMaps, overlayMaps).addTo(leafletMap);
}

export default map