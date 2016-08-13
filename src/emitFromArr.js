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
