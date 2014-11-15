function emitFromRange(min, max, by, repeat) {
	var f = Object.create(EmitFromRangeF.prototype);

	f._inc = min < max;
	f._cur = min;
	f._min = min;
	f._max = max;
	f._by = by;
	f._r = ((null == repeat) || (undefined == repeat)) ? false : true;
	var lenT = (max - min) / by + 1;
	f._len = isNaN(lenT) ? undefined : lenT; // by is a mechansim can't know length.
	return f;
};

function EmitFromRangeF() {};
EmitFromRangeF.prototype = Object.create(Object.prototype, {
	isMech: {
		get: function() {
			return true
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
				return Infinity
			};
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
			if (undefined !== res) {
				return res.toString();
			}
			return res;
		}
	},
	goBool: {
		enumerable: false,
		get: function() {
			var res = this.go;
			if (undefined !== res) {
				return res > 0
			}
			return res;
		}
	},
	goArr: {
		enumerable: false,
		get: function() {
			var res = this.go;
			if (undefined !== res) {
				return [res];
			}
			return res;
		}
	}

});
m.emitFromRange = emitFromRange;
m._.EmitFromRangeF = EmitFromRangeF;