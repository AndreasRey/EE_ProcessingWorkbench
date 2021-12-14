import 'bootstrap/dist/css/bootstrap.min.css'
import './css/index.css';
import _ from './lib/lodash-bundle';
import setTree from './js/tree';
import setTable from './js/table';
import setMap from './js/map';

const dictionaries = require('../data/geometries_results/dictionaries.json');
const tableRows = require('../data/geometries_results/processings.json');
const layers = require('../data/geometries_results/layers.json');
const aoi = require('../data/reference/aoi.json');
const reference = require('../data/reference/reference.json');

setTree(dictionaries);

var headers = [];
_.each(tableRows[0], function (v, k) {
  if (['classifier', 'region', 'subregion', 'enddate', 'startdate'].indexOf(k) === -1) {
    headers.push({ data: k, title: k});
  }
})
setTable(tableRows, headers);
setMap({
  layers,
  aoi,
  reference
});