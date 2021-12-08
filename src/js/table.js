import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css'
import 'datatables.net-searchbuilder-bs5/css/searchBuilder.bootstrap5.min.css'
import '../css/table.css'
var $  = require( 'jquery' );
var dt = require( 'datatables.net-bs5' );
var s_dt = require( 'datatables.net-searchbuilder-bs5');

/**
 * Creates a DataTable table
 * @param {Array} data Collection of records objects, eg: [{"name": "IK", "count": "1"}, {"name": "SG", "count": "1"}]
 * @param {Array} columns Collection of headers objects, refers to the data obj. eg: [{"data": "name", "title": "Name"}, {"data": "count", "title": "Count"}]
 */
var table = function (data, columns) {
  // Define DataTable options, see : https://datatables.net/reference/option/
  $('#table').DataTable({
    dom: 'Qtfrlip',
    data: data,
    columns: columns,
    scrollX: true,
    // Table order, see : https://datatables.net/reference/option/colReorder.order
    order: [[0, "desc"]]
  })
}

export default table