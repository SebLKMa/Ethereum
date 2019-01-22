var TNOProject = artifacts.require("./TNOProject.sol");

module.exports = function(deployer) {
  deployer.deploy(TNOProject, "P1", "Project 1"); // deploy with constructor args for contract
};
