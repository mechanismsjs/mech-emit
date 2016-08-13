// mech-emit.js
// version: 0.2.0
// author: Eric Hosick <erichosick@gmail.com> (http://www.erichosick.com/)
// license: MIT
(function() {
"use strict";

var root = this; // Root becomes window (browser) or exports (server)
var m = root.m || {
	_: {}
}; // new module or merge with previous
m._ = m._ || {}; // new sub-module or merge with pervious
m._["version-emit"] = '0.2.0'; // New library OR to use existing library (m for example), please fork and add to that project.

// Export module for Node and the browser.
if (typeof module !== 'undefined' && module.exports) {
	module.exports = m;
} else {
	root.m = m
}
function emitFromArr(source, repeat) {
	var f = Object.create(EmitFromArrF.prototype);
	f.s = source;
	if (source && source.isMech) {
		source._parDir = f;
	}

	f._r = ((null === repeat) || (undefined === repeat)) ? false : true;
	return f;
}

function EmitFromArrF() {}
EmitFromArrF.prototype = Object.create(Object.prototype, {
	isMech: {
		get: function() {
			return true;
		}
	},
	s: {
		enumerable: false,
		get: function() {
			return this._s;
		},
		set: function(d) {
			this._pos = 0;
			this._s = d instanceof Array ? d : [d];
		}
	},
	len: {
		get: function() {
			if (this._r) {
				return Infinity;
			}
			return this._s.length;
		}
	},
	go: {
		enumerable: false,
		get: function() {
			if (this._r && this._pos >= this._s.length) {
				this._pos = 0;
			}
			var cur = this._s[this._pos++]; // logic relies on the fact that out of bounds is undefined
			return cur && cur.isMech ? cur.go : cur;
		}
	},
	goNum: {
		enumerable: false,
		get: function() {
			if (this._r && this._pos >= this._s.length) {
				this._pos = 0;
			}
			var cur = this._s[this._pos++]; // logic relies on the fact that out of bounds is undefined
			return (null === cur) ? 0 : (undefined === cur) ? undefined : cur.isMech ? cur.goNum : ("string" === typeof cur) ? Number(cur) : ("boolean" === typeof cur) ? cur ? 1 : 0 : cur; // convert 1)undefined, 2)run mech.goNum, 3) str to num, 4) bool to 1 or 0 finally 5) cur
		}
	},
	goStr: {
		enumerable: false,
		get: function() {
			if (this._r && this._pos >= this._s.length) {
				this._pos = 0;
			}
			var cur = this._s[this._pos++]; // logic relies on the fact that out of bounds is undefined
			return (null === cur) ? "" : (undefined === cur) ? undefined : cur.isMech ? cur.goStr : ("number" === typeof cur) ? String(cur) : ("boolean" === typeof cur) ? cur ? "true" : "false" : cur; // convert 1) undefined, 2)run mech.goNum, 3) str to num, 4) bool to true or false finally 5) cur
		}
	},
	goBool: {
		enumerable: false,
		get: function() {
			if (this._r && this._pos >= this._s.length) {
				this._pos = 0;
			}
			var cur = this._s[this._pos++]; // logic relies on the fact that out of bounds is undefined
			return (null === cur) ? false : (undefined === cur) ? undefined : cur.isMech ? cur.goBool : ("number" === typeof cur) ? cur > 0 : ("string" === typeof cur) ? Number(cur) > 0 : cur; // convert 1) undefined, 2)run mech.goNum, 3) str to num, 4) bool to true or false finally 5) cur
		}
	},
	goArr: {
		enumerable: false,
		get: function() {
			var res = this.go;
			if (undefined === res) {
				return undefined;
			}
			return [res];
		}
	}
});
m.emitFromArr = emitFromArr;
m._.EmitFromArrF = EmitFromArrF;

function emitFromRange(min, max, by, repeat) {
	var f = Object.create(EmitFromRangeF.prototype);

	if (min && min.isMech) {
		min._parDir = f;
	}

	if (max && max.isMech) {
		max._parDir = f;
	}

	if (by && by.isMech) {
		by._parDir = f;
	}

	f._inc = min < max;
	f._cur = min;
	f._min = min;
	f._max = max;
	f._by = by;
	f._r = ((null === repeat) || (undefined === repeat)) ? false : true;
	var lenT = (max - min) / by + 1;
	f._len = isNaN(lenT) ? undefined : lenT; // by is a mechansim can't know length.
	return f;
}

function EmitFromRangeF() {}
EmitFromRangeF.prototype = Object.create(Object.prototype, {
	isMech: {
		get: function() {
			return true;
		}
	},
	min: {
		get: function() {
			return this._min;
		},
	},
	max: {
		get: function() {
			return this._max;
		},
	},
	by: {
		get: function() {
			return this._by;
		},
	},
	len: {
		get: function() {
			if (this._r) {
				return Infinity;
			}
			return this._len;
		}
	},
	go: {
		enumerable: false,
		get: function() {
			var by = this._by;
			if (undefined === by || null === by) {
				return undefined;
			}
			if (by.isMech) {
				by = by.go;
				// TODO: An emitter like ([1,3,0,6]) should be ok.
				// but what about loops without repeat? Hmm.
				// if (0 === by) {
				//    throw new RangeError("the mechanism in by return 0 (infinite loop).");
				// }
				if ((null === by) || (undefined === by)) {
					throw new RangeError("the mechanism located in 'by' returned a non-defiend value.");
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
		}
	},
	goNum: {
		enumerable: false,
		get: function() {
			return this.go;
		}
	},
	goStr: {
		enumerable: false,
		get: function() {
			var res = this.go;
			return (undefined !== res) ? res.toString() : res;
		}
	},
	goBool: {
		enumerable: false,
		get: function() {
			var res = this.go;
			return (undefined !== res) ? res > 0: res;
		}
	},
	goArr: {
		enumerable: false,
		get: function() {
			var res = this.go;
			return (undefined !== res) ? [res] : res;
		}
	}

});
m.emitFromRange = emitFromRange;
m._.EmitFromRangeF = EmitFromRangeF;


}.call(this));