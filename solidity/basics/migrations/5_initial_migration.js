var ReentrantSafe = artifacts.require("./ReentrantSafe.sol");

module.exports = function(deployer) {
  deployer.deploy(ReentrantSafe);
};
