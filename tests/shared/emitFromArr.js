describe ("testing emitter", function() {   
   it ("should not wipeout Object prototype and be a mechanism", function() {
      var mech = m.emitFromArr(1);
      expect(mech).to.have.property('toString');
      expect(m.mech).to.not.eql(null);
      expect (m._.EmitFromArrF).to.not.eql(undefined);
   });

   it ("should have correct properties", function() {
      var mech = m.emitFromArr(1);
      expect(mech.isMech).to.be.true;
      
      expect(mech).to.have.property('s');
      expect(mech).to.have.property('len');
      expect(mech).to.have.property('_s'); // imagined privacy
   });

   it ("should always emit undefined and have correct length", function() {
      var mech = m.emitFromArr();
      expect(mech.len).to.equal(1);
      expect(mech.go).to.eql(undefined);
      expect(mech.go).to.eql(undefined);
      expect(mech.goNum).to.eql(undefined);
      expect(mech.goNum).to.eql(undefined);
      expect(mech.goStr).to.eql(undefined);
      expect(mech.goStr).to.eql(undefined);

      var mech2 = m.emitFromArr(undefined, true);
      expect(mech2.len).to.equal(Infinity);
      expect(mech2.go).to.eql(undefined);
      expect(mech2.go).to.eql(undefined);
      expect(mech2.go).to.eql(undefined);
      expect(mech2.goNum).to.eql(undefined);
      expect(mech2.goNum).to.eql(undefined);
      expect(mech2.goNum).to.eql(undefined);
      expect(mech2.goStr).to.eql(undefined);
      expect(mech2.goStr).to.eql(undefined);
      expect(mech2.goStr).to.eql(undefined);
   });


   it ("should treat null as a single item and emit one time", function() {
      var mech = m.emitFromArr(null);
      expect(mech.go).to.eql(null);
      expect(mech.go).to.eql(undefined);
      expect(mech.go).to.eql(undefined);
      expect(mech.goNum).to.eql(undefined);
      expect(mech.goStr).to.eql(undefined);
      expect(mech.len).to.equal(1);
   });

   it ("should emit null forever when repeat is true.", function() {
      var mech = m.emitFromArr(null,true);
      expect(mech.go).to.eql(null);
      expect(mech.go).to.eql(null);
      expect(mech.go).to.eql(null);
      expect(mech.len).to.equal(Infinity);
   });

   it ("should treat a single item as an array of 1 item", function() {
      var mech = m.emitFromArr(6);
      expect(mech.len).to.equal(1);
      expect(mech.go).to.equal(6);
      expect(mech.go).to.eql(undefined);
      expect(mech.go).to.eql(undefined);
      
      var mech = m.emitFromArr("8");
      expect(mech.len).to.equal(1);
      expect(mech.goNum).to.equal("8");
      expect(mech.goStr).to.eql(undefined);

      var mech = m.emitFromArr(12);
      expect(mech.len).to.equal(1);
      expect(mech.goStr).to.equal(12);
      expect(mech.goNum).to.eql(undefined);
   });

   it ("should treat an array as an array", function() {
      var mech = m.emitFromArr([2,6]);
      expect(mech.len).to.equal(2);
      expect(mech.go).to.equal(2);
      expect(mech.go).to.equal(6);
      expect(mech.go).to.eql(undefined);
      expect(mech.go).to.eql(undefined);
   });

   it ("should repeatedly emit the array", function() {
      var mech = m.emitFromArr([2,6],true);
      expect(mech.len).to.equal(Infinity);
      expect(mech.go).to.equal(2);
      expect(mech.go).to.equal(6);
      expect(mech.go).to.equal(2);
      expect(mech.go).to.equal(6);
      expect(mech.go).to.equal(2);
      expect(mech.go).to.equal(6);
   });


});