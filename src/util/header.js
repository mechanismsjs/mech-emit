(function() {
"use strict";

var root = this; // Root becomes window (browser) or exports (server)
var previous = root.m;
var m = previous || { _ : {} }; // new module or merge with previous
var m_ = m._ || {}; // new sub-module or merge with pervious
m["version-emit"] = '{{VERSION}}'; // New library OR to use existing library (m for example), please fork and add to that project.

// Export module for Node and the browser.
if(typeof module !== 'undefined' && module.exports) {
  module.exports = m;
} else {
  this.m = m
}
