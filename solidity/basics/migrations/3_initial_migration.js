var Reentrant = artifacts.require("./Reentrant.sol");

module.exports = function(deployer) {
  deployer.deploy(Reentrant);
};
