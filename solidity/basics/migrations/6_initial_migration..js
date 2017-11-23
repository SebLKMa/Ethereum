var ReentrantSafe = artifacts.require("./ReentrantSafe.sol");
var ReentrantAttackerFailed = artifacts.require("./ReentrantAttackerFailed.sol");

module.exports = function(deployer) {
  deployer.deploy(ReentrantAttackerFailed, ReentrantSafe.address)
};
