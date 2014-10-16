describe ("testing emitter", function() {   
   it ("should not wipeout Object prototype and be a mechanism", function() {
        var mech = m.emitRange(1,2,3);
        expect(mech).to.have.property('toString');
        expect(m.mech).to.not.eql(null);
   });

   it ("should have correct properties", function() {
     var mech = m.emitRange(1,2,3);
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
     try { var x = m.emitRange(); } catch (e) {
        expect(e.toString()).to.equal("RangeError: min, max and by must all be defined.");
        ex = true;
     }
     expect(ex).to.be.true;

     ex = false;   
     try { var x = m.emitRange(null); } catch (e) {
        expect(e.toString()).to.equal("RangeError: min, max and by must all be defined.");
        ex = true;   
     }
     expect(ex).to.be.true;
  
     ex = false;   
     try { var x = m.emitRange(undefined); } catch (e) {
        console.log(e);
        expect(e.toString()).to.equal("RangeError: min, max and by must all be defined.");
        ex = true;   
     }
     expect(ex).to.be.true;
  
     ex = false;   
     try { var x = m.emitRange(1,2,0); } catch (e) {
        expect(e.toString()).to.equal("RangeError: by can not be 0 (infinite loop).");
        ex = true;   
     }
     expect(ex).to.be.true;


     ex = false;
     try { var x = m.emitRange(6,2,2); } catch (e) {
        expect(e.toString()).to.equal("RangeError: min must be less than max when by is a positive number.");
        ex = true;   
     }
     expect(ex).to.be.true;

     ex = false;
     try { var x = m.emitRange(1,8,-2); } catch (e) {
        expect(e.toString()).to.equal("RangeError: max must be less than min when by is a negative number.");
        ex = true;   
     }
     expect(ex).to.be.true;
  
   });

   it ("should emit the correct values and calculate the correct length based on the range", function() {
     var mech = m.emitRange(1,3,1);
     expect(mech.len).to.equal(3);
     expect(mech._cur).to.eql(1);
     expect(mech.go).to.eql(1);
     expect(mech.goStr).to.eql(2);
     expect(mech.goNum).to.eql(3);
     expect(mech.go).to.eql(undefined);


     var mech = m.emitRange(1,3,2);
     expect(mech.len).to.equal(2);
     expect(mech.go).to.eql(1);
     expect(mech.go).to.eql(3);
     expect(mech.go).to.eql(undefined);


     var mech = m.emitRange(0,4,2);
     expect(mech.len).to.equal(3);
     expect(mech.go).to.eql(0);
     expect(mech.go).to.eql(2);
     expect(mech.go).to.eql(4);
     expect(mech.go).to.eql(undefined);

     var mech = m.emitRange(0,3,.5);
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
 
     var mech = m.emitRange(4,1,-1);
     expect(mech.len).to.equal(4);
     expect(mech._cur).to.eql(4);
     expect(mech.go).to.eql(4);
     expect(mech.go).to.eql(3);
     expect(mech.go).to.eql(2);
     expect(mech.go).to.eql(1);
     expect(mech.go).to.eql(undefined);
     expect(mech.go).to.eql(undefined);
  
     var mech = m.emitRange(2,1,-.5);
     expect(mech.len).to.equal(3);
     expect(mech._cur).to.eql(2);
     expect(mech.go).to.eql(2);
     expect(mech.go).to.eql(1.5);
     expect(mech.go).to.eql(1);
     expect(mech.go).to.eql(undefined);
     expect(mech.go).to.eql(undefined);

     var mech = m.emitRange(-3,-1,1);
     expect(mech.len).to.equal(3);
     expect(mech._cur).to.eql(-3);
     expect(mech.goStr).to.eql(-3);
     expect(mech.go).to.eql(-2);
     expect(mech.go).to.eql(-1);
     expect(mech.go).to.eql(undefined);
     expect(mech.go).to.eql(undefined);


  
   });
  
   it ("should repeat emitting the range", function() {

      var mech = m.emitRange(1,3,2,true);
      expect(mech.len).to.equal(2);
      expect(mech.go).to.eql(1);
      expect(mech.goNum).to.eql(3);
      expect(mech.goStr).to.eql(1);
      expect(mech.go).to.eql(3);
      expect(mech.goNum).to.eql(1);
      expect(mech.go).to.eql(3);

      var mech = m.emitRange(5,3,-2,true);
      expect(mech.len).to.equal(2);
      expect(mech.go).to.eql(5);
      expect(mech.go).to.eql(3);
      expect(mech.go).to.eql(5);
      expect(mech.go).to.eql(3);
      expect(mech.go).to.eql(5);
      expect(mech.go).to.eql(3);
   });

});
