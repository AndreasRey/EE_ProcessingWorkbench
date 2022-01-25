import $ from 'jquery'
import _ from '../lib/lodash-bundle'

var processed = ['dictionaries', 'processings', 'layers']
var reference = ['aoi', 'reference']

var extraRefData = false;
var getExtraRefData = function (callback) {
  if (extraRefData) {
    callback(extraRefData);
  } else {
    $.getJSON('./data/refData.json', function (jsonData) {
      var remaining = jsonData.length;
      var extraRefData = {}
      function getJSON (key, url) {
        $.getJSON(url, function (jsonData) {
          extraRefData[key] = jsonData
          remaining--
          if (remaining === 0) {
            callback(extraRefData)
          }
        }).fail(function () {
          extraRefData[key] = false
          remaining--
          if (remaining === 0) {
            callback(extraRefData)
          }
        })
      }
      _.each(jsonData, function (v) {
        getJSON(v, `./data/${v}`);
      });
    })
  }
}

function getData (folder, callback) {

  getExtraRefData(function (refData) {
    var data = { refData: refData}
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
      getJSON(v, `./data/${folder}/results/${v}.json`)
    })
    _.each(reference, function (v) {
      getJSON(v, `./data/${folder}/reference/${v}.json`)
    })

  })
}

export default getData