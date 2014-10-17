describe("the modules were built correctly", function() {
   it ("should have the libary", function() {
      expect(m).to.not.eql(undefined);
   });

   it ("should have the correct version", function() {
      expect(m["version-emit"]).to.equal('0.1.3');
   });
});
