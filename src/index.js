import 'bootstrap/dist/css/bootstrap.min.css'
import './css/index.css';
import _ from './lib/lodash-bundle';
import $ from 'jquery';
import moment from 'moment';
import setTree from './js/tree';
import setTable from './js/table';
import setMap from './js/map';
import getData from './js/getData';

$('body').show()

var hash = window.location.hash
$.getJSON('./data/list.json', function (list) {
  if (hash === '') {
    var displayList = '<select id="processing-selection" class="form-select" aria-label="Processing selection">'
    _.each(list, function (v, i) {
      displayList += `
        <option 
        ${i === 0 ? 'selected ' : ''}
        value="${v}">
        ${v}
        </option>
      `
    })
    displayList += '</div>'
    $('#list-anchor').html(displayList);
    $('#start-button').on('click', function () {
      var processingTitle = $('#processing-selection').val()
      window.open(window.location.origin + window.location.pathname + '#' + processingTitle, '_blank');
    })
    $('#home').show();
    $('#loading').hide();
  } else {
    var hashValue = _.replace(hash, '#', '')
    if (list.indexOf(hashValue) !== -1) {
      access(hashValue)
    } else {
      window.location.href = window.location.origin + window.location.pathname
    }
  }
})
  


function access (processingTitle) {
  window.location.hash = processingTitle
  $('#loading-modal-title').html('Retrieving processing results')
  $('#loading').show();
  $('#home').hide();
  getData(processingTitle, function (data) {

    var dictionaries = data.dictionaries
    var tableRows = data.processings
    var layers = data.layers
    var aoi = data.aoi
    var reference = data.reference
    var refData = data.refData

    if (dictionaries) { setTree(dictionaries); } else {
      // $('#tableAnchor').css('margin-top', '0');
      // $('#row-top').hide().html('');
      // $('#row-bottom').append(`
      //   <div id="col-map" class="col">
      //     <div id="map"></div>
      //   </div>
      // `);
      $('#col-wrapper').hide();
      $('#col-map').removeClass('col-5').addClass('col')
    }
    var refRow = tableRows[0]
    var headers = [];
    _.each(['image','bandsid','classifierid','train_accuracy','validate_accuracy','scale','period','subregion','area_esa','common_area','percent_of_esa','area_classification','area_sqkm','area_sqm','common_2020','common_2020_percent','min_esa','min_classification','min','mean_esa','mean_classification','mean','max_esa','max_classification','max','stddev_esa','stddev_classification','stddev','date_first_img','NDVI_min','NDVI_mean','NDVI_max','NDVI_stddev','CHIRPS_min','CHIRPS_mean','CHIRPS_max','CHIRPS_stddev','BAI_min','BAI_mean','BAI_max','BAI_stddev','PDSI_min','PDSI_mean','PDSI_max','PDSI_stddev'], function (v) {
      if (refRow[v]) {
        var colDef = { data: v, title: v}
        if (v === 'date_first_img') {
          colDef.render = function(data) {
            return moment(data, 'YYYY-MM-DD').format('YYYY-MM-DD');
          }
        }
        headers.push(colDef);
      }
    })
    $('#loading').hide();
    $('#presentation').show();
    var tablePageLength = dictionaries ? false : 50;
    var map = setMap({
      layers,
      aoi,
      reference,
      refData
    });
    var table = setTable(tableRows, headers, tablePageLength, function (action, rowData, layerPrefix) {
      _.each(map.overlayMaps, function (v, k) {
        if (_.startsWith(k, layerPrefix) === true) {
          if (action === 'select') { 
            v.addTo(map.leafletMap);
          } else {
            v.removeFrom(map.leafletMap);
          }
        }
      })
    });
    _.each(map.overlayMaps, function (v, k) {
      v.on('add', function () {
        var tableData = table.rows().data();
        _.each(tableData, function (row, index) {
          var layerPrefix = row.classifierid ? row.classifierid : `${row.subregion}_${row.period}`
          if (_.startsWith(k, layerPrefix) === true) {
            table.row(`:eq(${index})`).select();
          }
        })
      })
      v.on('remove', function () {
        var tableData = table.rows().data();
        _.each(tableData, function (row, index) {
          var layerPrefix = `${row.subregion}_${row.period}`
          if (_.startsWith(k, layerPrefix) === true) {
            table.row(`:eq(${index})`).deselect();
          }
        })
      })
    })
  })
}
