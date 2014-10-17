// mech-emit.js
// version: 0.1.3
// author: Eric Hosick <erichosick@gmail.com> (http://www.erichosick.com/)
// license: MIT
(function() {
"use strict";

var root = this; // Establish root object 'window' (browser) or 'exports' (server)
if (typeof root.m === 'undefined') { root.m = {}; } // Save the previous library
var m = root.m;
var previous = m;
m = previous || {}; // New library OR to use existing library (m for example), please fork and add to that project.
m["version-emit"] = '0.1.3'; // Version auto updated by gulpfile.js build process

// Export module for Node and the browser.
if(typeof module !== 'undefined' && module.exports) {
  module.exports = m;
} else {
  root.m = m;
}

function emitFromArr(source,repeat) {
   var f = Object.create(EmitArrF.prototype);
   f.s = source;
   f._r = ((null == repeat) || (undefined == repeat)) ? false : true;
   return f;
};
function EmitArrF() {};
EmitArrF.prototype = Object.create ( Object.prototype, {
   isMech: { get: function() { return true }},
   s: { enumerable: false,
      get: function() { return this._s; },
      set: function(d) {
         this._pos = 0;
         this._s = d instanceof Array ? d : [d];
      }
   },
   len: { get: function() {
      if ( this._r ) { return Infinity; }
      return this._s.length;
   }},
   go: { enumerable: false, get: function() {
      if (this._r && this._pos >= this._s.length) {
         this._pos = 0;
      }
      return this._s[this._pos++];  // logic relies on the fact that out of bounds is undefined
   }},
   goNum: { enumerable: false, get: function() {
      return this.go;
   }},
   goStr: { enumerable: false, get: function() {
      return this.go;
   }}
});
m.emitFromArr = emitFromArr;
m.EmitArrF = EmitArrF;
function emitFromRange(min,max,by,repeat) {
   var f = Object.create(EmitRangeF.prototype);

   if (	null === min || undefined === min ||
			null === max || undefined === max ||
			null === by || undefined === by ) {
   	throw new RangeError("min, max and by must all be defined.");
   };

   if (0 === by && !repeat) {
   	throw new RangeError("by can not be 0 (infinite loop).");
   }

   if ( min > max && by > 0 ) {
   	throw new RangeError("min must be less than max when by is a positive number.");
   }

   if ( max > min && by < 0 ) {
      throw new RangeError("max must be less than min when by is a negative number.");
   }
   f._inc = min < max;
   f._cur = min;
   f._min = min;   
   f._max = max;
   f._by = by;
   f._r = ((null == repeat) || (undefined == repeat)) ? false : true;
   var lenT = (max - min)/by + 1;
   f._len = isNaN(lenT) ? undefined : lenT; // by is a mechansim can't know length.
   return f;
};
function EmitRangeF() {};
EmitRangeF.prototype = Object.create ( Object.prototype, {
   isMech: { get: function() { return true }},
   min: { get: function() { return this._min; }, },
   max: { get: function() { return this._max; }, },
   by: { get: function() { return this._by; }, },
   len: { get: function() {
      if (this._r) { return Infinity };
      return this._len;
   }},
   go: { enumerable: false, get: function() {
      var by = this._by;
      if (by.isMech) {
         by = by.go;
         // TODO: An emitter like ([1,3,0,6]) should be ok.
         // but what about loops without repeat? Hmm.
         // if (0 === by) {
         //    throw new RangeError("the mechanism in by return 0 (infinite loop).");
         // }
         if ((null === by) || (undefined === by)) {
         	throw new RangeError("the mechanism located in 'by' returnd a non-defiend value.");
         }
      }
      
      if (this._inc) {
         if (this._cur > this._max) {
            if (!this._r) {
      		   return undefined;
            }
            this._cur = this._min;
         }
      } else if (this._cur < this._max) {
         if (!this._r) {
            return undefined;
         }
         this._cur = this._min;
      }
		var t = this._cur;
		this._cur = this._cur + by;
		return t;			
   }},
   goNum: { enumerable: false, get: function() { return this.go; }},
   goStr: { enumerable: false, get: function() { return this.go; }}
});
m.emitFromRange = emitFromRange;
m.EmitRangeF = EmitRangeF;

}.call(this));