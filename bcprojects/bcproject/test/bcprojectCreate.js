var Project = artifacts.require("./BCProject.sol");

// Print the deployed version of our contract.
// Note that getting the deployed version requires a promise, hence the .then.
/*
Project.deployed().then(function(instance) {
  console.log(instance);
});
*/

contract('BCProject', function(accounts) {

  it("Project Description must equal to deployed", function() {
	var project;
    var id = "A1";
    var description = "Project A1";

    return Project.new(id, description).then(function(instance) {
      project = instance;
      return project.getProjectDescription.call(); // call() is used for reads, no transaction gas required, result is returned immediately
    }).then(function(outDescription) {
      projectDescription = outDescription.toString();
    }).then(function() {
      assert.equal(projectDescription, description, "Wrong Description value!");
    });
  });
  
/*
  beforeEach(function() {
    if (contractInstance == null || contractInstance == undefined) {
      Project.new(id, description)
      .then(function(instance) {
         contractInstance = instance;
         console.log("Contract Instance created");
      });
    }
  });
  
  it("Deliverables are created by a specified account", function() {
	var project;
    var delDescription;
	var numberOfTasks;
    var id = "A1";
    var description = "Project A1";
    
    return Project.new(id, description).then(function(instance) {
      project = instance;
      //return project.createDeliverable("T1", "T1D1", "Deliverable 1", {from: accounts[0]}); // gas required, result is not returned immediately, transaction id is returned instead

    });
  });

*/
});

