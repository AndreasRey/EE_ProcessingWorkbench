import '../lib/jsonTree/jsonTree.css';
import jsonTree from '../lib/jsonTree/jsonTree';

function setTree (data) {
  // Get DOM-element for inserting json-tree
  var wrapper = document.getElementById("wrapper");

  // Create json-tree
  var tree = jsonTree.create(data, wrapper);

  // Expand all (or selected) child nodes of root (optional)
  tree.expand(function(node) {
  return node.childNodes.length < 2;
  });
}

export default setTree;