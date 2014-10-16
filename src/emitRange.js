function emitRange(min,max,by,repeat) {
   var f = Object.create(EmitRangeF.prototype);

   if (	null === min || undefined === min ||
			null === max || undefined === max ||
			null === by || undefined === by ) {
   	throw new RangeError("min, max and by must all be defined.");
   };

   if (0 === by) {
   	throw new RangeError("by can not be 0 (infinite loop).");
   }

   if ( min > max && by > 0 ) {
   	throw new RangeError("min must be less than max when by is a positive number.");
   }

   if ( max > min && by < 0 ) {
      throw new RangeError("max must be less than min when by is a negative number.");
   }

   f._cur = min;
   f._min = min;   
   f._max = max;
   f._by = by;
   f._r = ((null == repeat) || (undefined == repeat)) ? false : true;
   var lenT = (max - min)/by + 1;
   f._len = isNaN(lenT) ? 0 : lenT;
   return f;
};
function EmitRangeF() {};
EmitRangeF.prototype = Object.create ( Object.prototype, {
   isMech: { get: function() { return true }},
   min: { get: function() { return this._min; }, },
   max: { get: function() { return this._max; }, },
   by: { get: function() { return this._by; }, },
   len: { get: function() { return this._len; }},
   go: { enumerable: false, get: function() {
      if (this._by > 0) {
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
		this._cur = this._cur + this._by;
		return t;			
   }},
   goNum: { enumerable: false, get: function() { return this.go; }},
   goStr: { enumerable: false, get: function() { return this.go; }}
});
m.emitRange = emitRange;
m.EmitRangeF = EmitRangeF;