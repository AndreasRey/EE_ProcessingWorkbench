import 'leaflet/dist/leaflet.css'
import 'leaflet.fullscreen/Control.FullScreen.css'
import L from 'leaflet'
import 'leaflet.fullscreen'
import _ from '../lib/lodash-bundle'
import Rainbow from 'rainbowvis.js'

var colors = {
  'Common': '#fcff18',
  'ESA Only': '#4daf4a',
  'Classified Only': '#e41a1c'
}

function map (data) {
  if (data.aoi) {
    var aoi = L.geoJSON(data.aoi, {
      style: {
        color: '#000000',
        opacity: 1,
        weight: 2,
        fill: false
      }
    });
  }
  if (data.reference) {
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
  }

//  var esaBounds = esa.getBounds()
  var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
  });
  var OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });
  var layers = [Esri_WorldImagery]
  if (data.aoi) { layers.push(aoi) }
  var leafletMap = L.map('map', {
    layers: layers,
//    maxBounds: esaBounds.pad(2),
    maxZoom: 17,
    fullscreenControl: {
      position: 'topright',
      forcePseudoFullscreen: false // if true, fullscreen to page width and height
    }
  })
  if (data.aoi) {
    leafletMap.fitBounds(aoi.getBounds())
  } else {
    leafletMap.fitBounds([[13.4, -16.4], [13.7, -15.4]])
  }

  var baseMaps = {
    "Esri_WorldImagery": Esri_WorldImagery,
    "OpenStreetMap_Mapnik": OpenStreetMap_Mapnik
  };

  var overlayMaps = {};
  if (data.aoi) { overlayMaps['Area of interest'] = aoi; }
  if (data.reference) { overlayMaps['ESA WorldCover 2020'] = esa; }

  var myRainbow = new Rainbow();
  myRainbow.setSpectrum('#f70e0e', '#f7e60e', '#0ed2f7', '#c20ef7');
  myRainbow.setNumberRange(0, data.layers.length);

  var wrapLayerName = function (name) {
    return `<span class="layerControlGroup">${name}</span>`
  }

  _.each(data.layers, function (v, i) {
    if (data.esa) {
      var layerName = v.features[0].properties.classifier + ' | Zones';
      var layerGeoJSON = L.geoJSON(v, {
        style: function (feature) {
          var color = colors[feature.properties.type]
          return {
            color: 'white',
            opacity: 1,
            weight: 0,
            fill: true,
            fillColor: color,
            fillOpacity: 0.6
          }
        },
        onEachFeature: function (feature, layer) {
          layer.bindPopup('<b>' + layerName + '</b><br>' + feature.properties.type)
        }
      });
      overlayMaps[wrapLayerName(layerName)] = layerGeoJSON
    }

    var fullLayerName = v.features[0].properties.classifier + ' | Full';
    var fullColor = '#' + myRainbow.colorAt(i)
    var geojsonObject = _.cloneDeep(v)
    geojsonObject.features = v.features.filter(function (o) { return o.properties.type !== 'ESA Only'})
    var fullLayerGeoJSON = L.geoJSON(geojsonObject, {
      style: {
          color: fullColor,
          opacity: 1,
          weight: 1,
          fill: true,
          fillColor: fullColor,
          fillOpacity: 0.6
        }
    });
    fullLayerGeoJSON.bindPopup(fullLayerName)
    overlayMaps[fullLayerName] = fullLayerGeoJSON
  })
  legend(leafletMap, data)
  L.control.layers(baseMaps, overlayMaps).addTo(leafletMap);
  return { leafletMap, overlayMaps }
}

var legend = function (map, data) {
  var legendItems = []
  if (data.aoi) { legendItems.push({ name: 'Area of interest', html: '<span><b>Area of interest</b></span><br><span class="legend-item"><i style="background-color:' + 'rgba(0,0,0,0)' + ';border-color:black;border-width:2px;border-style:solid;"></i></span><br>' }) }
  var legend = L.control({position: 'bottomleft'});
  legend.onAdd = function () {
    this._div = L.DomUtil.create('div', 'leaflet-legend');
    this.update();
    return this._div;
  };
  legend.update = function () {
    this._div.innerHTML = ''
    var div = this._div
    _.each(legendItems, function (item, index) {
      div.innerHTML += item.html
      if (index !== legendItems.length - 1) { div.innerHTML += '<div class="leaflet-control-layers-separator-custom"></div>' }
    })
   return div
  }
  map.on('overlayadd', function (e) {
    var name = e.name
    var html
    if (_.endsWith(name, '| Full') === true) {
      html = '<span><b>' + name + '</b></span><br>'
      html += '<span class="legend-item"><i style="background-color:' + e.layer.options.style.color + '"></i></span><br>'
      legendItems.push({ name, html })
    }
    else if (_.endsWith(name, '| Zones</span>') === true) {
      var displayName = _.replace(_.replace(name, '<span>', ''), '</span>', '')
      html = '<span><b>' + displayName + '</b></span><br>'
      html += '<span class="legend-item"><i style="background-color:' + colors['Common'] + '"></i> ' + 'Common' + '</span><br>'
      html += '<span class="legend-item"><i style="background-color:' + colors['ESA Only'] + '"></i> ' + 'ESA Only' + '</span><br>'
      html += '<span class="legend-item"><i style="background-color:' + colors['Classified Only'] + '"></i> ' + 'Classified Only' + '</span><br>'
      legendItems.push({ name, html })
    }
    else if (name === 'Area of interest') {
      html = '<span><b>' + name + '</b></span><br>'
      html += '<span class="legend-item"><i style="background-color:' + 'rgba(0,0,0,0)' + ';border-color:black;border-width:2px;border-style:solid;"></i></span><br>'
      legendItems.push({ name, html })
    }
    else if (name === 'ESA WorldCover 2020') {
      html = '<span><b>' + name + '</b></span><br>'
      html += '<span class="legend-item"><i style="background-color:' + '#11ff45' + ';border-color:#11ff45;border-width:2px;border-style:solid;"></i></span><br>'
      legendItems.push({ name, html })
    }
    legend.update()
  })
  map.on('overlayremove', function (e) {
    legendItems = legendItems.filter(function (o) { return o.name !== e.name })
    legend.update()
  })
  legend.addTo(map)
}

export default map