import 'bootstrap/dist/css/bootstrap.min.css'
import './css/index.css';
import _ from './lib/lodash-bundle';
import $ from 'jquery';
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

    setTree(dictionaries);

    var headers = [];
    _.each(['image','bandsid','classifierid','train_accuracy','validate_accuracy','scale','period','subregion','area_esa','common_area','area_classification','min_esa','min_classification','mean_esa','mean_classification','max_esa','max_classification','stddev_esa','stddev_classification'], function (v) {
      headers.push({ data: v, title: v});
    })
    $('#loading').hide();
    $('#presentation').show();
    setTable(tableRows, headers);
    setMap({
      layers,
      aoi,
      reference
    });
  })
}
