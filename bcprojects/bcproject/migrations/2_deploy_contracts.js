var Project = artifacts.require("./BCProject.sol");

module.exports = function(deployer) {
  deployer.deploy(Project, "P1", "Project 1"); // deploy with constructor args for contract
};
