describe("emitFormRange mechanism", function() {

	it("should not wipeout Object prototype and be a mechanism", function() {
		var mech = m.emitFromRange(1, 2, 3);
		expect(mech).to.have.property('toString');
		expect(m.mech).to.not.eql(null);
		expect(m._.EmitFromRangeF).to.not.be.undefined;
	});

	it("should have correct properties", function() {
		var mech = m.emitFromRange(1, 2, 3);
		expect(mech.isMech).to.be.true;

		expect(mech.min).to.equal(1);
		expect(mech.max).to.equal(2);
		expect(mech.by).to.equal(3);
		expect(mech).to.have.property('len'); // imagined privacy
		expect(mech).to.have.property('_min'); // imagined privacy
		expect(mech).to.have.property('_max'); // imagined privacy
		expect(mech).to.have.property('_by'); // imagined privacy
	});

	it("should emit undefined forever when configured badly", function() {
		var mech = m.emitFromRange();
		expect(mech.go).to.be.undefined;
		expect(mech.goNum).to.be.undefined;
		expect(mech.goStr).to.be.undefined;
		expect(mech.goBool).to.be.undefined;
		expect(mech.goArr).to.be.undefined;

		var mech2 = m.emitFromRange(null);
		expect(mech2.go).to.be.undefined;
		expect(mech2.goNum).to.be.undefined;
		expect(mech2.goStr).to.be.undefined;
		expect(mech2.goBool).to.be.undefined;
		expect(mech2.goArr).to.be.undefined;

		var mech3 = m.emitFromRange(null, null);
		expect(mech3.go).to.be.undefined;
		expect(mech3.goNum).to.be.undefined;
		expect(mech3.goStr).to.be.undefined;
		expect(mech3.goBool).to.be.undefined;
		expect(mech3.goArr).to.be.undefined;

		var mech4 = m.emitFromRange(null, null, null);
		expect(mech4.go).to.be.undefined;
		expect(mech4.goNum).to.be.undefined;
		expect(mech4.goStr).to.be.undefined;
		expect(mech4.goBool).to.be.undefined;
		expect(mech4.goArr).to.be.undefined;

		var mech5 = m.emitFromRange(1, null, null);
		expect(mech5.go).to.be.undefined;
		expect(mech5.goNum).to.be.undefined;
		expect(mech5.goStr).to.be.undefined;
		expect(mech5.goBool).to.be.undefined;
		expect(mech5.goArr).to.be.undefined;

		var mech6 = m.emitFromRange(1, 6, null);
		expect(mech6.go).to.be.undefined;
		expect(mech6.goNum).to.be.undefined;
		expect(mech6.goStr).to.be.undefined;
		expect(mech6.goBool).to.be.undefined;
		expect(mech6.goArr).to.be.undefined;

		var mech7 = m.emitFromRange(1, 6, 1);
		expect(mech7.go).to.equal(1);
		expect(mech7.goNum).to.equal(2);
		expect(mech7.goStr).to.equal("3");
		expect(mech7.goBool).to.be.true;
		expect(mech7.goArr).to.contain(5);

	});

	it("should always emit 0 if repeat is true", function() {
		var mech = m.emitFromRange(1, 3, 0, true);
		expect(mech.len).to.equal(Infinity);
		expect(mech._cur).to.eql(1);
		expect(mech._cur).to.eql(1);
		expect(mech._cur).to.eql(1);
		expect(mech._cur).to.eql(1);
	});


	it("should emit the correct values and calculate the correct length based on the range", function() {
		var mech = m.emitFromRange(1, 3, 1);
		expect(mech.len).to.equal(3);
		expect(mech._cur).to.equal(1);
		expect(mech.go).to.equal(1);
		expect(mech.goStr).to.equal("2");
		expect(mech.goNum).to.equal(3);
		expect(mech.go).to.eql(undefined);


		var mech = m.emitFromRange(1, 3, 2);
		expect(mech.len).to.equal(2);
		expect(mech.go).to.eql(1);
		expect(mech.go).to.eql(3);
		expect(mech.go).to.eql(undefined);


		var mech = m.emitFromRange(0, 4, 2);
		expect(mech.len).to.equal(3);
		expect(mech.go).to.eql(0);
		expect(mech.go).to.eql(2);
		expect(mech.go).to.eql(4);
		expect(mech.go).to.eql(undefined);

		var mech = m.emitFromRange(0, 3, .5);
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

		var mech = m.emitFromRange(4, 1, -1);
		expect(mech.len).to.equal(4);
		expect(mech._cur).to.eql(4);
		expect(mech.go).to.eql(4);
		expect(mech.go).to.eql(3);
		expect(mech.go).to.eql(2);
		expect(mech.go).to.eql(1);
		expect(mech.go).to.eql(undefined);
		expect(mech.go).to.eql(undefined);

		var mech = m.emitFromRange(2, 1, -.5);
		expect(mech.len).to.equal(3);
		expect(mech._cur).to.eql(2);
		expect(mech.go).to.eql(2);
		expect(mech.go).to.eql(1.5);
		expect(mech.go).to.eql(1);
		expect(mech.go).to.eql(undefined);
		expect(mech.go).to.eql(undefined);

		var mech = m.emitFromRange(-3, -1, 1);
		expect(mech.len).to.equal(3);
		expect(mech._cur).to.equal(-3);
		expect(mech.goStr).to.equal("-3");
		expect(mech.go).to.equal(-2);
		expect(mech.go).to.equal(-1);
		expect(mech.go).to.eql(undefined);
		expect(mech.go).to.eql(undefined);

	});

	it("should repeat emitting the range", function() {

		var mech = m.emitFromRange(1, 3, 2, true);
		expect(mech.len).to.equal(Infinity);
		expect(mech.go).to.equal(1);
		expect(mech.goNum).to.equal(3);
		expect(mech.goStr).to.equal("1");
		expect(mech.go).to.equal(3);
		expect(mech.goNum).to.equal(1);
		expect(mech.go).to.equal(3);

		var mech = m.emitFromRange(5, 3, -2, true);
		expect(mech.len).to.equal(Infinity);
		expect(mech.go).to.eql(5);
		expect(mech.go).to.eql(3);
		expect(mech.go).to.eql(5);
		expect(mech.go).to.eql(3);
		expect(mech.go).to.eql(5);
		expect(mech.go).to.eql(3);
	});

	it("should accept a mechanism as a by", function() {
		var mech = m.emitFromRange(2, 6, m.emitFromArr([1, 2], true), true);
		expect(mech.len).to.equal(Infinity);
		expect(mech.go).to.equal(2);
		expect(mech.goNum).to.equal(3);
		expect(mech.goStr).to.equal("5");
		expect(mech.go).to.equal(6);
		expect(mech.go).to.equal(2);
		expect(mech.goNum).to.equal(3);
		expect(mech.goStr).to.equal("5");
		expect(mech.go).to.equal(6);

		var mech2 = m.emitFromRange(1, 20000, m.emitFromArr([3, -1, 4], true));
		expect(mech2.len).to.eql(undefined);
		expect(mech2.go).to.equal(1);
		expect(mech2.go).to.equal(4);
		expect(mech2.go).to.equal(3);
		expect(mech2.go).to.equal(7);
		expect(mech2.go).to.equal(10);
		expect(mech2.go).to.equal(9);

		var mech3 = m.emitFromRange(1, 300, m.emitFromArr([3, -1, 4], true));


		expect(mech3.go).to.equal(1);
		expect(mech3.go).to.equal(4);
		expect(mech3.go).to.equal(3);
		expect(mech3.go).to.equal(7);
		expect(mech3.go).to.equal(10);

	});

});