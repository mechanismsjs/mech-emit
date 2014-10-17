(function() {
"use strict";

var root = this; // Root becomes window (browser) or exports (server)
var m = root.m || { _ : {} }; // new module or merge with previous
m._ = m._ || {}; // new sub-module or merge with pervious
m._["version-emit"] = '{{VERSION}}'; // New library OR to use existing library (m for example), please fork and add to that project.

// Export module for Node and the browser.
if(typeof module !== 'undefined' && module.exports) {
  module.exports = m;
} else {
  root.m = m
}
