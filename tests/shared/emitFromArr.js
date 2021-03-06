describe("testing emitter", function() {
  it("should not wipeout Object prototype and be a mechanism", function() {
    var mech = m.emitFromArr(1);
    expect(mech).to.have.property('toString');
    expect(m.mech).to.not.eql(null);
    expect(m._.EmitFromArrF).to.not.be.undefined;
  });

  it("should have correct properties", function() {
    var mech = m.emitFromArr(1);
    expect(mech.isMech).to.be.true;

    expect(mech).to.have.property('s');
    expect(mech).to.have.property('len');
    expect(mech).to.have.property('_s'); // imagined privacy
  });

  it("should set _parDir of child mechanisms to parent", function() {
    var mech = m.num(1);
    var mech3 = m.emitFromArr(mech);
    expect(mech._parDir).to.equal(mech3);
  });

  it("should always emit undefined and have correct length", function() {
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


  it("should treat null as a single item and emit one time", function() {
    var mech = m.emitFromArr(null);
    expect(mech.go).to.eql(null);
    expect(mech.go).to.eql(undefined);
    expect(mech.go).to.eql(undefined);
    expect(mech.goNum).to.eql(undefined);
    expect(mech.goStr).to.eql(undefined);
    expect(mech.len).to.equal(1);
  });

  it("should emit null forever when repeat is true.", function() {
    var mech = m.emitFromArr(null, true);
    expect(mech.go).to.eql(null);
    expect(mech.go).to.eql(null);
    expect(mech.go).to.eql(null);
    expect(mech.len).to.equal(Infinity);
  });

  it("should treat a single item as an array of 1 item", function() {
    var mech = m.emitFromArr(6);
    expect(mech.len).to.equal(1);
    expect(mech.go).to.equal(6);
    expect(mech.go).to.eql(undefined);
    expect(mech.go).to.eql(undefined);

    var mech2 = m.emitFromArr("8");
    expect(mech2.len).to.equal(1);
    expect(mech2.goNum).to.equal(8);
    expect(mech2.goStr).to.eql(undefined);

    var mech3 = m.emitFromArr(12);
    expect(mech3.len).to.equal(1);
    expect(mech3.goStr).to.equal("12");
    expect(mech3.goNum).to.eql(undefined);
  });

  it("should treat an array as an array", function() {
    var mech = m.emitFromArr([2, 6]);
    expect(mech.len).to.equal(2);
    expect(mech.go).to.equal(2);
    expect(mech.go).to.equal(6);
    expect(mech.go).to.eql(undefined);
    expect(mech.go).to.eql(undefined);
  });

  it("should repeatedly emit the array", function() {
    var mech = m.emitFromArr([2, 6], true);
    expect(mech.len).to.equal(Infinity);
    expect(mech.go).to.equal(2);
    expect(mech.go).to.equal(6);
    expect(mech.go).to.equal(2);
    expect(mech.go).to.equal(6);
    expect(mech.go).to.equal(2);
    expect(mech.go).to.equal(6);
  });

  it("should emit null and undefined", function() {
    var mech = m.emitFromArr([2, 6, null, undefined, 12]);
    expect(mech.go).to.equal(2);
    expect(mech.go).to.equal(6);
    expect(mech.go).to.equal(null);
    expect(mech.go).to.equal(undefined);
    expect(mech.go).to.equal(12);
  });

  it("should emit the invocation of a mechanism", function() {
    var mech = m.emitFromArr([2, m.num(5), null, undefined, m.str("12"), true, false], true);
    expect(mech.go).to.equal(2);
    expect(mech.go).to.equal(5);
    expect(mech.go).to.equal(null);
    expect(mech.go).to.equal(undefined);
    expect(mech.go).to.equal("12");
    expect(mech.go).to.be.true;
    expect(mech.go).to.be.false;
  });

  it("should emit the right primitive types", function() {
    var mech = m.emitFromArr([-2, m.num(5), null, undefined, "11", m.str("12"), true, false, 0], true);
    expect(mech.go).to.equal(-2);
    expect(mech.go).to.equal(5);
    expect(mech.go).to.equal(null);
    expect(mech.go).to.equal(undefined);
    expect(mech.go).to.equal("11");
    expect(mech.go).to.equal("12");
    expect(mech.go).to.be.true;
    expect(mech.go).to.be.false;
    expect(mech.go).to.equal(0);

    expect(mech.goNum).to.equal(-2);
    expect(mech.goNum).to.equal(5);
    expect(mech.goNum).to.equal(0);
    expect(mech.goNum).to.equal(undefined);
    expect(mech.goNum).to.equal(11);
    expect(mech.goNum).to.equal(12);
    expect(mech.goNum).to.equal(1);
    expect(mech.goNum).to.equal(0);
    expect(mech.goNum).to.equal(0);

    expect(mech.goStr).to.equal("-2");
    expect(mech.goStr).to.equal("5");
    expect(mech.goStr).to.equal("");
    expect(mech.goStr).to.equal(undefined);
    expect(mech.goStr).to.equal("11");
    expect(mech.goStr).to.equal("12");
    expect(mech.goStr).to.equal("true");
    expect(mech.goStr).to.equal("false");
    expect(mech.goStr).to.equal("0");

    expect(mech.goBool).to.be.false;
    expect(mech.goBool).to.be.true;
    expect(mech.goBool).to.be.false;
    expect(mech.goBool).to.equal(undefined);
    expect(mech.goBool).to.be.true;
    expect(mech.goBool).to.be.true;
    expect(mech.goBool).to.be.true;
    expect(mech.goBool).to.be.false;
    expect(mech.goBool).to.be.false;

    expect(mech.goArr).to.contain(-2);
    expect(mech.goArr).to.contain(5);
    expect(mech.goArr[0]).to.equal(null);
    expect(mech.goArr).to.equal(undefined);
    expect(mech.goArr).to.contain("11");
    expect(mech.goArr).to.contain("12");
    expect(mech.goArr).to.contain(true);
    expect(mech.goArr).to.contain(false);
    expect(mech.goArr).to.contain(0);
  });

});
