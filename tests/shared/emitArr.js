describe ("testing emitter", function() {   
   it ("should not wipeout Object prototype and be a mechanism", function() {
      var mech = m.emitArr(1);
      expect(mech).to.have.property('toString');
      expect(m.mech).to.not.eql(null);
   });

   it ("should have correct properties", function() {
      var mech = m.emitArr(1);
      expect(mech.isMech).to.be.true;
      
      expect(mech).to.have.property('s');
      expect(mech).to.have.property('len');
      expect(mech).to.have.property('_s'); // imagined privacy
   });

   it ("should always emit undefined and have a length of 0", function() {
      var mech = m.emitArr();
      expect(mech.go).to.eql(undefined);
      expect(mech.go).to.eql(undefined);
      expect(mech.go).to.eql(undefined);
      expect(mech.len).to.equal(1);

      var mech2 = m.emitArr(undefined);
      expect(mech2.go).to.eql(undefined);
      expect(mech2.go).to.eql(undefined);
      expect(mech2.go).to.eql(undefined);
      expect(mech2.len).to.equal(1);
   });


   it ("should treat null as a single item and emit one time", function() {
      var mech = m.emitArr(null);
      expect(mech.go).to.eql(null);
      expect(mech.go).to.eql(undefined);
      expect(mech.go).to.eql(undefined);
      expect(mech.len).to.equal(1);
   });

   it ("should treat a single item as an array of 1 item", function() {
      var mech = m.emitArr(6);
      expect(mech.len).to.equal(1);
      expect(mech.go).to.equal(6);
      expect(mech.go).to.eql(undefined);
      expect(mech.go).to.eql(undefined);
   });

   it ("should treat an array as an array", function() {
      var mech = m.emitArr([2,6]);
      expect(mech.len).to.equal(2);
      expect(mech.go).to.equal(2);
      expect(mech.go).to.equal(6);
      expect(mech.go).to.eql(undefined);
      expect(mech.go).to.eql(undefined);
   });

   it ("should repeatedly emit the array", function() {
      var mech = m.emitArr([2,6],true);
      expect(mech.len).to.equal(2);
      expect(mech.go).to.equal(2);
      expect(mech.go).to.equal(6);
      expect(mech.go).to.equal(2);
      expect(mech.go).to.equal(6);
      expect(mech.go).to.equal(2);
      expect(mech.go).to.equal(6);
   });

});