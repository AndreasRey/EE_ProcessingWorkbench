import $ from 'jquery'
import _ from '../lib/lodash-bundle'

var processed = ['dictionaries', 'processings', 'layers']
var reference = ['aoi', 'reference']

function getData (folder, callback) {

  var data = {}
  var remainingSources = 5

  function getJSON (key, url) {
    $.getJSON(url, function (jsonData) {
      data[key] = jsonData
      remainingSources--
      if (remainingSources === 0) {
        callback(data)
      }
    }).fail(function () {
      data[key] = false
      remainingSources--
      if (remainingSources === 0) {
        callback(data)
      }
    })
  }

  _.each(processed, function (v) {
    getJSON(v, `./data/${folder}/results/${v}.json`, callback)
  })
  _.each(reference, function (v) {
    getJSON(v, `./data/${folder}/reference/${v}.json`, callback)
  })
}

export default getData