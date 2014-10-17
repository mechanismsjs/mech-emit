function emitFromArr(source,repeat) {
   var f = Object.create(EmitFromArrF.prototype);
   f.s = source;
   f._r = ((null == repeat) || (undefined == repeat)) ? false : true;
   return f;
};
function EmitFromArrF() {};
EmitFromArrF.prototype = Object.create ( Object.prototype, {
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
m._.EmitFromArrF = EmitFromArrF;