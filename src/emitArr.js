function emitArr(source,repeat) {
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
         this._cur = 0;
         this._s = d instanceof Array ? d : [d];
      }
   },
   len: { get: function() { return this._s.length; }},
   go: { enumerable: false, get: function() {
      if (this._r && this._cur >= this._s.length) {
         this._cur = 0;
      }
      return this._s[this._cur++];  // logic relies on the fact that out of bounds is undefined
   }},
   goNum: { enumerable: false, get: function() {
      return this.go;
   }},
   goStr: { enumerable: false, get: function() {
      return this.go;
   }}
});
m.emitArr = emitArr;
m.EmitArrF = EmitArrF;