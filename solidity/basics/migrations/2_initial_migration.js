var DUmmyFallBack = artifacts.require("./DummyFallBack.sol");
var Caller = artifacts.require("./Caller.sol");

module.exports = function(deployer) {
  deployer.deploy(DUmmyFallBack);
  deployer.deploy(Caller);
};
