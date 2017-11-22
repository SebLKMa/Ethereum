var Reentrant = artifacts.require("./Reentrant.sol");
var ReentrantAttacker = artifacts.require("./ReentrantAttacker.sol");

module.exports = function(deployer) {
  deployer.deploy(ReentrantAttacker, Reentrant.address)
};
