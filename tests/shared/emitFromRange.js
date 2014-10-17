describe ("emitFormRange mechanism", function() {   
   
   it ("should not wipeout Object prototype and be a mechanism", function() {
      var mech = m.emitFromRange(1,2,3);
      expect(mech).to.have.property('toString');
      expect(m.mech).to.not.eql(null);
      expect (m._.EmitFromRangeF).to.not.eql(undefined);        
   });
   
   it ("should have correct properties", function() {
     var mech = m.emitFromRange(1,2,3);
     expect(mech.isMech).to.be.true;
     
     expect(mech.min).to.equal(1);
     expect(mech.max).to.equal(2);
     expect(mech.by).to.equal(3);
     expect(mech).to.have.property('len'); // imagined privacy
     expect(mech).to.have.property('_min'); // imagined privacy
     expect(mech).to.have.property('_max'); // imagined privacy
     expect(mech).to.have.property('_by'); // imagined privacy
   });
   
   it ("should generate correct range errors", function() {
     // cause i am lazy to figure this out
     var ex = false;
     try { var x = m.emitFromRange(); } catch (e) {
        expect(e.toString()).to.equal("RangeError: min, max and by must all be defined.");
        ex = true;
     }
     expect(ex).to.be.true;
   
     ex = false;   
     try { var x = m.emitFromRange(null); } catch (e) {
        expect(e.toString()).to.equal("RangeError: min, max and by must all be defined.");
        ex = true;   
     }
     expect(ex).to.be.true;
     
     ex = false;   
     try { var x = m.emitFromRange(undefined); } catch (e) {
        console.log(e);
        expect(e.toString()).to.equal("RangeError: min, max and by must all be defined.");
        ex = true;   
     }
     expect(ex).to.be.true;
     
     ex = false;   
     try { var x = m.emitFromRange(1,2,0); } catch (e) {
        expect(e.toString()).to.equal("RangeError: by can not be 0 (infinite loop).");
        ex = true;   
     }
     expect(ex).to.be.true;
   
     ex = false;
     try { var x = m.emitFromRange(6,2,2); } catch (e) {
        expect(e.toString()).to.equal("RangeError: min must be less than max when by is a positive number.");
        ex = true;   
     }
     expect(ex).to.be.true;
   
     ex = false;
     try { var x = m.emitFromRange(1,8,-2); } catch (e) {
        expect(e.toString()).to.equal("RangeError: max must be less than min when by is a negative number.");
        ex = true;   
     }
     expect(ex).to.be.true;
     
   });
   
   it ("should always emit 0 if repeat is true", function() {
      var mech = m.emitFromRange(1,3,0,true);
      expect(mech.len).to.equal(Infinity);
      expect(mech._cur).to.eql(1);
      expect(mech._cur).to.eql(1);
      expect(mech._cur).to.eql(1);
      expect(mech._cur).to.eql(1);
   });
   
   
   it ("should emit the correct values and calculate the correct length based on the range", function() {
     var mech = m.emitFromRange(1,3,1);
     expect(mech.len).to.equal(3);
     expect(mech._cur).to.eql(1);
     expect(mech.go).to.eql(1);
     expect(mech.goStr).to.eql(2);
     expect(mech.goNum).to.eql(3);
     expect(mech.go).to.eql(undefined);
   
   
     var mech = m.emitFromRange(1,3,2);
     expect(mech.len).to.equal(2);
     expect(mech.go).to.eql(1);
     expect(mech.go).to.eql(3);
     expect(mech.go).to.eql(undefined);
   
   
     var mech = m.emitFromRange(0,4,2);
     expect(mech.len).to.equal(3);
     expect(mech.go).to.eql(0);
     expect(mech.go).to.eql(2);
     expect(mech.go).to.eql(4);
     expect(mech.go).to.eql(undefined);
   
     var mech = m.emitFromRange(0,3,.5);
     expect(mech.len).to.equal(7);
     expect(mech.go).to.eql(0);
     expect(mech.go).to.eql(.5);
     expect(mech.go).to.eql(1);
     expect(mech.go).to.eql(1.5);
     expect(mech.go).to.eql(2);
     expect(mech.go).to.eql(2.5);
     expect(mech.go).to.eql(3);
     expect(mech.go).to.eql(undefined);
     expect(mech.go).to.eql(undefined);
    
     var mech = m.emitFromRange(4,1,-1);
     expect(mech.len).to.equal(4);
     expect(mech._cur).to.eql(4);
     expect(mech.go).to.eql(4);
     expect(mech.go).to.eql(3);
     expect(mech.go).to.eql(2);
     expect(mech.go).to.eql(1);
     expect(mech.go).to.eql(undefined);
     expect(mech.go).to.eql(undefined);
     
     var mech = m.emitFromRange(2,1,-.5);
     expect(mech.len).to.equal(3);
     expect(mech._cur).to.eql(2);
     expect(mech.go).to.eql(2);
     expect(mech.go).to.eql(1.5);
     expect(mech.go).to.eql(1);
     expect(mech.go).to.eql(undefined);
     expect(mech.go).to.eql(undefined);
   
     var mech = m.emitFromRange(-3,-1,1);
     expect(mech.len).to.equal(3);
     expect(mech._cur).to.eql(-3);
     expect(mech.goStr).to.eql(-3);
     expect(mech.go).to.eql(-2);
     expect(mech.go).to.eql(-1);
     expect(mech.go).to.eql(undefined);
     expect(mech.go).to.eql(undefined);
     
   });
     
   it ("should repeat emitting the range", function() {
   
      var mech = m.emitFromRange(1,3,2,true);
      expect(mech.len).to.equal(Infinity);
      expect(mech.go).to.eql(1);
      expect(mech.goNum).to.eql(3);
      expect(mech.goStr).to.eql(1);
      expect(mech.go).to.eql(3);
      expect(mech.goNum).to.eql(1);
      expect(mech.go).to.eql(3);
   
      var mech = m.emitFromRange(5,3,-2,true);
      expect(mech.len).to.equal(Infinity);
      expect(mech.go).to.eql(5);
      expect(mech.go).to.eql(3);
      expect(mech.go).to.eql(5);
      expect(mech.go).to.eql(3);
      expect(mech.go).to.eql(5);
      expect(mech.go).to.eql(3);
   });
   
   it ("should accept a mechanism as a by", function() {
      var mech = m.emitFromRange(2,6,m.emitFromArr([1,2],true),true);
      expect(mech.len).to.equal(Infinity);
      expect(mech.go).to.eql(2);
      expect(mech.goNum).to.eql(3);
      expect(mech.goStr).to.eql(5);
      expect(mech.go).to.eql(6);
      expect(mech.go).to.eql(2);
      expect(mech.goNum).to.eql(3);
      expect(mech.goStr).to.eql(5);
      expect(mech.go).to.eql(6);
      
      var mech2 = m.emitFromRange(1,20000,m.emitFromArr([3, -1, 4],true));
      expect(mech2.len).to.eql(undefined);
      expect(mech2.go).to.equal(1);
      expect(mech2.go).to.equal(4);
      expect(mech2.go).to.equal(3);
      expect(mech2.go).to.equal(7);
      expect(mech2.go).to.equal(10);
      expect(mech2.go).to.equal(9);
   });
   
   it ("should throw an exception with an invalid by", function() {
      var mech = m.emitFromRange(2,6,m.emitFromArr([undefined],true),true);
      expect(mech.len).to.equal(Infinity);
   
      // cause i am lazy to figure this out
      var ex = false;
      try { var x = mech.go; } catch (e) {
         expect(e.toString()).to.equal("RangeError: the mechanism located in 'by' returnd a non-defiend value.");
         ex = true;
      }
      expect(ex).to.be.true;
   });

});
