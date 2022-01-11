import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css'
import 'datatables.net-searchbuilder-bs5/css/searchBuilder.bootstrap5.min.css'
import 'datatables.net-select-bs5/css/select.bootstrap5.min.css'
import '../css/table.css'
var $  = require( 'jquery' );
var dt = require( 'datatables.net-bs5' );
var s_dt = require( 'datatables.net-searchbuilder-bs5');
var datetime_dt = require( 'datatables.net-datetime' );
var select_di = require( 'datatables.net-select-bs5' );
//$.fn.dataTable.moment( 'YYYY-MM-DD' );
/**
 * Creates a DataTable table
 * @param {Array} data Collection of records objects, eg: [{"name": "IK", "count": "1"}, {"name": "SG", "count": "1"}]
 * @param {Array} columns Collection of headers objects, refers to the data obj. eg: [{"data": "name", "title": "Name"}, {"data": "count", "title": "Count"}]
 */
var table = function (data, columns, length, rowClickCallback) {
  var pageLength = length ? length : 10;
  // Define DataTable options, see : https://datatables.net/reference/option/
  var datatable = $('#table').DataTable({
    dom: 'Qtfrlip',
    data: data,
    columns: columns,
    scrollX: true,
    pageLength: pageLength,
    select: {
      style: 'multi'
    },
    // Table order, see : https://datatables.net/reference/option/colReorder.order
    order: [[0, "desc"]]
  });
  datatable.on('select', function (e, dt, type, indexes) {
      var rowData = datatable.rows(indexes).data().toArray();
      var obj = rowData[0];
      var layerPrefix = obj.classifierid ? obj.classifierid : `${obj.subregion}_${obj.period}`
      rowClickCallback('select', rowData, layerPrefix)
  }).on('deselect', function (e, dt, type, indexes) {
      var rowData = datatable.rows(indexes).data().toArray();
      var obj = rowData[0];
      var layerPrefix = obj.classifierid ? obj.classifierid : `${obj.subregion}_${obj.period}`
      rowClickCallback('deselect', rowData, layerPrefix)
  });
  return datatable;
}

export default table