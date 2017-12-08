var OutOfGas = artifacts.require("./OutOfGas.sol");

module.exports = function(deployer) {
  deployer.deploy(OutOfGas);
};
