(()=>{"use strict";var c,t={647:(e,n,t)=>{t(39);var r=t(379),o=t.n(r),s=t(340),a={insert:"head",singleton:!1},i=(o()(s.Z,a),s.Z.locals,t(959)),l=t.n(i),r=t(751),a=t.n(r),s=t(947),i=t.n(s),r=t(246),s=t.n(r),r=t(894),r=t.n(r);const c={cloneDeep:i(),each:a(),endsWith:s(),keyBy:l(),replace:r()};var p,l=t(549),d=t.n(l),r=t(864),l={insert:"head",singleton:!1};o()(r.Z,l),r.Z.locals;function u(e){return(u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function h(){}function f(e,n,t){var r=p.getType(n);if(r in f.CONSTRUCTORS)return new f.CONSTRUCTORS[r](e,n,t);throw new Error("Bad type: "+p.getClass(n))}function b(e,n,t){if(this.constructor===b)throw new Error("This is abstract class");var r=this,o=document.createElement("li");r.label=e,r.isComplex=!1,o.classList.add("jsontree_node"),o.innerHTML='                    <span class="jsontree_label-wrapper">                        <span class="jsontree_label">"'+e+'"</span> :                     </span>                    <span class="jsontree_value-wrapper">                        <span class="jsontree_value jsontree_value_'+r.type+'">'+n+"</span>"+(t?"":",")+"</span>",(r.el=o).querySelector(".jsontree_label").addEventListener("click",function(e){e.altKey?r.toggleMarked():e.shiftKey&&(document.getSelection().removeAllRanges(),alert(r.getJSONPath()))},!1)}function m(e,n,t){this.type="boolean",b.call(this,e,n,t)}function g(e,n,t){this.type="number",b.call(this,e,n,t)}function y(e,n,t){this.type="string",b.call(this,e,'"'+n+'"',t)}function _(e,n,t){this.type="null",b.call(this,e,n,t)}function v(e,n,t){if(this.constructor===v)throw new Error("This is abstract class");var r,o,s=this,a=document.createElement("li"),i=[];s.label=e,s.isComplex=!0,a.classList.add("jsontree_node"),a.classList.add("jsontree_node_complex"),a.innerHTML=function(e,n){n='                        <div class="jsontree_value-wrapper">                            <div class="jsontree_value jsontree_value_'+s.type+'">                                <b>'+n[0]+'</b>                                <span class="jsontree_show-more">&hellip;</span>                                <ul class="jsontree_child-nodes"></ul>                                <b>'+n[1]+"</b></div>"+(t?"":",")+"</div>";return n=null!==e?'                        <span class="jsontree_label-wrapper">                            <span class="jsontree_label"><span class="jsontree_expand-button"></span>"'+e+'"</span> :                         </span>'+n:n}(e,s.sym),r=a.querySelector(".jsontree_child-nodes"),null!==e?(o=a.querySelector(".jsontree_label"),e=a.querySelector(".jsontree_show-more"),o.addEventListener("click",function(e){return e.altKey?void s.toggleMarked():e.shiftKey?(document.getSelection().removeAllRanges(),void alert(s.getJSONPath())):void s.toggle(e.ctrlKey||e.metaKey)},!1),e.addEventListener("click",function(e){s.toggle(e.ctrlKey||e.metaKey)},!1),s.isRoot=!1):(s.isRoot=!0,s.parent=null,a.classList.add("jsontree_node_expanded")),s.el=a,s.childNodes=i,s.childNodesUl=r,p.forEachNode(n,function(e,n,t){s.addChild(new f(e,n,t))}),s.isEmpty=!Boolean(i.length),s.isEmpty&&a.classList.add("jsontree_node_empty")}function w(e,n,t){this.sym=["{","}"],this.type="object",v.call(this,e,n,t)}function j(e,n,t){this.sym=["[","]"],this.type="array",v.call(this,e,n,t)}function x(e,n){this.wrapper=document.createElement("ul"),this.wrapper.className="jsontree_tree clearfix",this.rootNode=null,this.sourceJSONObj=e,this.loadData(e),this.appendTo(n)}const S=(p={getClass:function(e){return Object.prototype.toString.call(e)},getType:function(e){if(null===e)return"null";switch(u(e)){case"number":return"number";case"string":return"string";case"boolean":return"boolean"}switch(p.getClass(e)){case"[object Array]":return"array";case"[object Object]":return"object"}throw new Error("Bad type: "+p.getClass(e))},forEachNode:function(t,r){switch(p.getType(t)){case"array":o=t.length-1,t.forEach(function(e,n){r(n,e,n===o)});break;case"object":var e=Object.keys(t).sort(),o=e.length-1;e.forEach(function(e,n){r(e,t[e],n===o)})}},inherits:function(e,n){h.prototype=n.prototype,e.prototype=new h,e.prototype.constructor=e},isValidRoot:function(e){switch(p.getType(e)){case"object":case"array":return!0;default:return!1}},extend:function(e,n){for(var t in n)n.hasOwnProperty(t)&&(e[t]=n[t])}},f.CONSTRUCTORS={boolean:m,number:g,string:y,null:_,object:w,array:j},b.prototype={constructor:b,mark:function(){this.el.classList.add("jsontree_node_marked")},unmark:function(){this.el.classList.remove("jsontree_node_marked")},toggleMarked:function(){this.el.classList.toggle("jsontree_node_marked")},expandParent:function(e){this.parent&&(this.parent.expand(),this.parent.expandParent(e))},getJSONPath:function(e){if(this.isRoot)return"$";var n="array"===this.parent.type?"["+this.label+"]":e?"."+this.label:"['"+this.label+"']";return this.parent.getJSONPath(e)+n}},p.inherits(m,b),p.inherits(g,b),p.inherits(y,b),p.inherits(_,b),p.inherits(v,b),p.extend(v.prototype,{constructor:v,addChild:function(e){this.childNodes.push(e),this.childNodesUl.appendChild(e.el),e.parent=this},expand:function(t){this.isEmpty||(this.isRoot||this.el.classList.add("jsontree_node_expanded"),t&&this.childNodes.forEach(function(e,n){e.isComplex&&e.expand(t)}))},collapse:function(t){this.isEmpty||(this.isRoot||this.el.classList.remove("jsontree_node_expanded"),t&&this.childNodes.forEach(function(e,n){e.isComplex&&e.collapse(t)}))},toggle:function(t){var r;this.isEmpty||(this.el.classList.toggle("jsontree_node_expanded"),t&&(r=this.el.classList.contains("jsontree_node_expanded"),this.childNodes.forEach(function(e,n){e.isComplex&&e[r?"expand":"collapse"](t)})))},findChildren:function(t,r,o){this.isEmpty||this.childNodes.forEach(function(e,n){t(e)&&r(e),e.isComplex&&o&&e.findChildren(t,r,o)})}}),p.inherits(w,v),p.inherits(j,v),x.prototype={constructor:x,loadData:function(e){p.isValidRoot(e)?(this.sourceJSONObj=e,this.rootNode=new f(null,e,"last"),this.wrapper.innerHTML="",this.wrapper.appendChild(this.rootNode.el)):alert("The root should be an object or an array")},appendTo:function(e){e.appendChild(this.wrapper)},expand:function(t){this.rootNode.isComplex&&("function"==typeof t?this.rootNode.childNodes.forEach(function(e,n){e.isComplex&&t(e)&&e.expand()}):this.rootNode.expand("recursive"))},collapse:function(){"function"==typeof this.rootNode.collapse&&this.rootNode.collapse("recursive")},toSourceJSON:function(e){if(!e)return JSON.stringify(this.sourceJSONObj);var n="[%^$#$%^%]",e=JSON.stringify(this.sourceJSONObj,null,n);return e=(e=e.split("\n").join("<br />")).split(n).join("&nbsp;&nbsp;&nbsp;&nbsp;")},findAndHandle:function(e,n){this.rootNode.findChildren(e,n,"isRecursive")},unmarkAll:function(){this.rootNode.findChildren(function(e){return!0},function(e){e.unmark()},"isRecursive")}},{create:function(e,n){return new x(e,n)}});const O=function(e){var n=document.getElementById("wrapper");S.create(e,n).expand(function(e){return e.childNodes.length<2})};t(539),t(628);var l=t(285),r={insert:"head",singleton:!1},N=(o()(l.Z,r),l.Z.locals,t(549));t(717),t(572);const C=function(e,n){N("#table").DataTable({dom:"Qtfrlip",data:e,columns:n,scrollX:!0,order:[[0,"desc"]]})};t(623),t(716);var l=t(139),k=t.n(l),l=(t(130),t(12)),E=t.n(l),T={Common:"#fcff18","ESA Only":"#4daf4a","Classified Only":"#e41a1c"};function L(e){var r,o=[{name:"Area of interest",html:'<span><b>Area of interest</b></span><br><span class="legend-item"><i style="background-color:rgba(0,0,0,0);border-color:black;border-width:2px;border-style:solid;"></i></span><br>'}];(r=k().control({position:"bottomleft"})).onAdd=function(){return this._div=k().DomUtil.create("div","leaflet-legend"),this.update(),this._div},r.update=function(){this._div.innerHTML="";var t=this._div;return c.each(o,function(e,n){t.innerHTML+=e.html,n!==o.length-1&&(t.innerHTML+='<div class="leaflet-control-layers-separator-custom"></div>')}),t},e.on("overlayadd",function(e){var n,t=e.name;!0===c.endsWith(t,"| Full")?(n="<span><b>"+t+"</b></span><br>",n+='<span class="legend-item"><i style="background-color:'+e.layer.options.style.color+'"></i></span><br>',o.push({name:t,html:n})):!0===c.endsWith(t,"| Zones</span>")?(n="<span><b>"+c.replace(c.replace(t,"<span>",""),"</span>","")+"</b></span><br>",n+='<span class="legend-item"><i style="background-color:'+T.Common+'"></i> Common</span><br>',n+='<span class="legend-item"><i style="background-color:'+T["ESA Only"]+'"></i> ESA Only</span><br>',n+='<span class="legend-item"><i style="background-color:'+T["Classified Only"]+'"></i> Classified Only</span><br>',o.push({name:t,html:n})):"Area of interest"===t?(n="<span><b>"+t+"</b></span><br>",o.push({name:t,html:n+='<span class="legend-item"><i style="background-color:rgba(0,0,0,0);border-color:black;border-width:2px;border-style:solid;"></i></span><br>'})):"ESA WorldCover 2020"===t&&(n="<span><b>"+t+"</b></span><br>",o.push({name:t,html:n+='<span class="legend-item"><i style="background-color:#11ff45;border-color:#11ff45;border-width:2px;border-style:solid;"></i></span><br>'})),r.update()}),e.on("overlayremove",function(n){o=o.filter(function(e){return e.name!==n.name}),r.update()}),r.addTo(e)}const A=function(e){var n=k().geoJSON(e.aoi,{style:{color:"#000000",opacity:1,weight:2,fill:!1}}),t=k().geoJSON(e.reference,{style:{color:"#11ff45",opacity:1,weight:2,fill:!0,fillColor:"#11ff45",fillOpacity:.2}}),r=t.getBounds(),o=k().tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",{attribution:"Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"}),s=k().tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'});(r=k().map("map",{layers:[o,n],maxBounds:r.pad(2),maxZoom:17,fullscreenControl:{position:"topright",forcePseudoFullscreen:!1}})).fitBounds(n.getBounds());var s={Esri_WorldImagery:o,OpenStreetMap_Mapnik:s},a={"Area of interest":n,"ESA WorldCover 2020":t},i=new(E());i.setSpectrum("#f70e0e","#f7e60e","#0ed2f7","#c20ef7"),i.setNumberRange(0,e.layers.length),c.each(e.layers,function(e,n){var t=e.features[0].properties.classifier+" | Zones",r=k().geoJSON(e,{style:function(e){return{color:"white",opacity:1,weight:0,fill:!0,fillColor:T[e.properties.type],fillOpacity:.6}},onEachFeature:function(e,n){n.bindPopup("<b>"+t+"</b><br>"+e.properties.type)}});a['<span class="layerControlGroup">'.concat(t,"</span>")]=r;var o=e.features[0].properties.classifier+" | Full",r="#"+i.colorAt(n),n=c.cloneDeep(e);n.features=e.features.filter(function(e){return"ESA Only"!==e.properties.type});r=k().geoJSON(n,{style:{color:r,opacity:1,weight:0,fill:!0,fillColor:r,fillOpacity:.6}});r.bindPopup(o),a[o]=r}),L(r),k().control.layers(s,a).addTo(r)};var R=["dictionaries","processings","layers"],J=["aoi","reference"];const P=function(n,t){var r={},o=5;function s(n,e){d().getJSON(e,function(e){r[n]=e,0===--o&&t(r)})}c.each(R,function(e){s(e,"./data/".concat(n,"/results/").concat(e,".json"))}),c.each(J,function(e){s(e,"./data/".concat(n,"/reference/").concat(e,".json"))})};d()("body").show();var M=window.location.hash;d().getJSON("./data/list.json",function(e){var t,n;""===M?(t='<select id="processing-selection" class="form-select" aria-label="Processing selection">',c.each(e,function(e,n){t+="\n        <option \n        ".concat(0===n?"selected ":"",'\n        value="').concat(e,'">\n        ').concat(e,"\n        </option>\n      ")}),t+="</div>",d()("#list-anchor").html(t),d()("#start-button").on("click",function(){var e=d()("#processing-selection").val();window.open(window.location.origin+"/#"+e,"_blank")}),d()("#home").show(),d()("#loading").hide()):(n=c.replace(M,"#",""),-1!==e.indexOf(n)?(n=n,window.location.hash=n,d()("#loading-modal-title").html("Retrieving processing results"),d()("#loading").show(),d()("#home").hide(),P(n,function(e){var n=e.dictionaries,t=e.processings,r=e.layers,o=e.aoi,e=e.reference;O(n);var s=[];c.each(["image","bandsid","classifierid","train_accuracy","validate_accuracy","scale","period","subregion","area_esa","common_area","area_classification","min_esa","min_classification","mean_esa","mean_classification","max_esa","max_classification","stddev_esa","stddev_classification"],function(e){s.push({data:e,title:e})}),d()("#loading").hide(),d()("#presentation").show(),C(t,s),A({layers:r,aoi:o,reference:e})})):window.location.href=window.location.origin)})},340:(e,n,t)=>{t.d(n,{Z:()=>r});n=t(721),n=t.n(n)()(function(e){return e[1]});n.push([e.id,"body {\r\n  padding: 15px;\r\n  font-size: 14px;\r\n}\r\nul, ol { \r\n  list-style: none;\r\n}\r\n#wrapper, #tableAnchor, #map {\r\n  border: 1px solid grey;\r\n}\r\n#wrapper {\r\n  max-height: 60vh;\r\n  min-height: 50vh;\r\n  overflow-y: scroll;\r\n}\r\n#map {\r\n  height: 100%;\r\n  min-height: 50vh;\r\n  max-width: 100%;\r\n}\r\n#tableAnchor {\r\n  padding: 15px;\r\n  margin-top: 15px;\r\n}\r\n.layerControlGroup {\r\n  border-top: 1px solid grey;\r\n}\r\n.leaflet-legend .layerControlGroup {\r\n  border-top: none;\r\n}\r\n\r\n.leaflet-legend {\r\n\tbox-shadow: 0 1px 5px rgba(0,0,0,0.4);\r\n\tbackground: #fff;\r\n  border-radius: 0 !important;\r\n  padding: 6px;\r\n  border: 2px solid rgba(0,0,0,0.2);\r\n  background-clip: padding-box;\r\n  box-shadow: none;\r\n  margin-bottom: 40px !important;\r\n}\r\n.leaflet-legend i {\r\n    width: 18px;\r\n    height: 18px;\r\n    float: left;\r\n    margin-right: 8px;\r\n    opacity: 0.7;\r\n}\r\n.leaflet-legend span {\r\n    margin-bottom: 10px;\r\n}\r\n\r\n.leaflet-control-layers-separator-custom {\r\n    height: 0;\r\n    margin: 2px -10px 2px -6px;\r\n}\r\n.legend-item i {\r\n  opacity: 0.5;\r\n}\r\n.home-content {\r\n  max-width: fit-content;\r\n  margin-right: auto;\r\n  margin-left: auto;\r\n  margin-top: 15%;\r\n}\r\n#loading {\r\n  display: unset;\r\n}\r\n#home {\r\n  display: none;\r\n}\r\n#presentation {\r\n  display: none;\r\n}",""]);const r=n},285:(e,n,t)=>{t.d(n,{Z:()=>r});n=t(721),n=t.n(n)()(function(e){return e[1]});n.push([e.id,"div.dataTables_scrollBody {\r\n  margin-bottom: 15px !important;\r\n}\r\n.dataTables_wrapper td {\r\n  white-space: nowrap;\r\n  width: max-content;\r\n}\r\n.cell-centered {\r\n  text-align: center;\r\n}\r\n.dtsb-titleRow {\r\n  display: none;\r\n}\r\n",""]);const r=n},864:(e,n,t)=>{t.d(n,{Z:()=>o});var r=t(721),n=t.n(r),r=t(438),r=t.n(r),t=t(992),n=n()(function(e){return e[1]}),t=r()(t.Z);n.push([e.id,"/*\n * JSON Tree Viewer\n * http://github.com/summerstyle/jsonTreeViewer\n *\n * Copyright 2017 Vera Lobacheva (http://iamvera.com)\n * Released under the MIT license (LICENSE.txt)\n */\n\n/* Background for the tree. May use for <body> element */\n.jsontree_bg {\n    background: #FFF;\n}\n\n/* Styles for the container of the tree (e.g. fonts, margins etc.) */\n.jsontree_tree {\n    margin-left: 30px;\n    font-family: 'PT Mono', monospace;\n    font-size: 14px;\n}\n\n/* Styles for a list of child nodes */\n.jsontree_child-nodes {\n    display: none;\n    margin-left: 35px; \n    margin-bottom: 5px;\n    line-height: 2;\n}\n.jsontree_node_expanded > .jsontree_value-wrapper > .jsontree_value > .jsontree_child-nodes {\n    display: block;\n}\n\n/* Styles for labels */\n.jsontree_label-wrapper {\n    float: left;\n    margin-right: 8px;\n}\n.jsontree_label {\n    font-weight: normal;\n    vertical-align: top;\n    color: #000;\n    position: relative;\n    padding: 1px;\n    border-radius: 4px;\n    cursor: default;\n}\n.jsontree_node_marked > .jsontree_label-wrapper > .jsontree_label {\n    background: #fff2aa;\n}\n\n/* Styles for values */\n.jsontree_value-wrapper {\n    display: block;\n    overflow: hidden;\n}\n.jsontree_node_complex > .jsontree_value-wrapper {\n    overflow: inherit;\n}\n.jsontree_value { \n    vertical-align: top;\n    display: inline;\n}\n.jsontree_value_null {\n    color: #777;\n    font-weight: bold;\n}\n.jsontree_value_string {\n    color: #025900;\n    font-weight: bold;\n}\n.jsontree_value_number {\n    color: #000E59;\n    font-weight: bold;\n}\n.jsontree_value_boolean {\n    color: #600100;\n    font-weight: bold;\n}\n\n/* Styles for active elements */\n.jsontree_expand-button {\n    position: absolute;\n    top: 3px;\n    left: -15px;\n    display: block;\n    width: 11px;\n    height: 11px;\n    background-image: url("+t+");\n}\n.jsontree_node_expanded > .jsontree_label-wrapper > .jsontree_label > .jsontree_expand-button {\n    background-position: 0 -11px;\n}\n.jsontree_show-more {\n    cursor: pointer;\n}\n.jsontree_node_expanded > .jsontree_value-wrapper > .jsontree_value > .jsontree_show-more {\n    display: none;\n}\n.jsontree_node_empty > .jsontree_label-wrapper > .jsontree_label > .jsontree_expand-button,\n.jsontree_node_empty > .jsontree_value-wrapper > .jsontree_value > .jsontree_show-more {\n    display: none !important;\n}\n.jsontree_node_complex > .jsontree_label-wrapper > .jsontree_label {\n    cursor: pointer;\n}\n.jsontree_node_empty > .jsontree_label-wrapper > .jsontree_label {\n    cursor: default !important;\n}\n",""]);const o=n},992:(e,n,t)=>{t.d(n,{Z:()=>r});const r=t.p+"d2f8e70267c02e535b42ef230cfbc710.svg"}},r={};function p(e){var n=r[e];if(void 0!==n)return n.exports;n=r[e]={id:e,loaded:!1,exports:{}};return t[e].call(n.exports,n,n.exports,p),n.loaded=!0,n.exports}p.m=t,c=[],p.O=(e,n,t,r)=>{if(!n){for(var o=1/0,s=0;s<c.length;s++){for(var a,[n,t,r]=c[s],i=!0,l=0;l<n.length;l++)(!1&r||r<=o)&&Object.keys(p.O).every(e=>p.O[e](n[l]))?n.splice(l--,1):(i=!1,r<o&&(o=r));i&&(c.splice(s--,1),void 0!==(a=t())&&(e=a))}return e}r=r||0;for(var s=c.length;0<s&&c[s-1][2]>r;s--)c[s]=c[s-1];c[s]=[n,t,r]},p.n=e=>{var n=e&&e.__esModule?()=>e.default:()=>e;return p.d(n,{a:n}),n},p.d=(e,n)=>{for(var t in n)p.o(n,t)&&!p.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:n[t]})},p.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),p.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),p.nmd=e=>(e.paths=[],e.children||(e.children=[]),e),(()=>{var e;p.g.importScripts&&(e=p.g.location+"");var n=p.g.document;if(!e&&n&&((e=n.currentScript?n.currentScript.src:e)||(n=n.getElementsByTagName("script")).length&&(e=n[n.length-1].src)),!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),p.p=e})(),(()=>{var c={179:0};p.O.j=e=>0===c[e];var e=(e,n)=>{var t,r,o,[s,a,i]=n,l=0;if(s.some(e=>0!==c[e])){for(t in a)p.o(a,t)&&(p.m[t]=a[t]);i&&(o=i(p))}for(e&&e(n);l<s.length;l++)r=s[l],p.o(c,r)&&c[r]&&c[r][0](),c[s[l]]=0;return p.O(o)},n=self.webpackChunkee_processingworkbench=self.webpackChunkee_processingworkbench||[];n.forEach(e.bind(null,0)),n.push=e.bind(null,n.push.bind(n))})();var e=p.O(void 0,[567,202,421,672,729,736],()=>p(647));p.O(e)})();