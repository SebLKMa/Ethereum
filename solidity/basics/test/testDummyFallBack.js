var DummyFallBack = artifacts.require("./DummyFallBack.sol");
var Caller = artifacts.require("./Caller.sol");

// Print the deployed version of our contract.
// Note that getting the deployed version requires a promise, hence the .then.
/*
TNOProject.deployed().then(function(instance) {
  console.log(instance);
});
*/

contract('DummyFallBack', function(accounts) {

  it("Initial dummy value must be 0", function() {
    var contractInstance;
    var dummyValue;

    return DummyFallBack.deployed().then(function(instance) {
      contractInstance = instance;
      return contractInstance.getDummyValue.call(); // call() is used for reads, no transaction gas required, result is returned immediately
    }).then(function(outValue) {
      dummyValue = outValue.toNumber();
    }).then(function() {
      assert.equal(0, dummyValue, "Wrong value!");
    });
  });

  it("Next dummy value must be 1", function() {
    var contractInstance;
    var dummyValue;
    var callerInstance;

    return DummyFallBack.deployed().then(function(instance) {
      contractInstance = instance;
      assert.isNotNull(contractInstance);
      return Caller.deployed().then(function(instance) {
        callerInstance = instance;
        assert.isNotNull(contractInstance);
        assert.isNotNull(callerInstance);
        var accountUsed = accounts[0]
        assert.isNotNull(accountUsed);

        return callerInstance.callDummyFallBack(contractInstance.address)
          //.catch(function (err) {
          //    console.log("Exception caught:", err);
        .then(function() {
          return contractInstance.getDummyValue.call(); // call() is used for reads, no transaction gas required, result is returned immediately
        }).then(function(outValue) {
          dummyValue = outValue.toNumber();
        }).then(function() {
          assert.equal(1, dummyValue , "Wrong value!");
        });

      });
    });

  });

});