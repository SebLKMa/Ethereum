var TNOProject = artifacts.require("./TNOProject.sol");

// Print the deployed version of our contract.
// Note that getting the deployed version requires a promise, hence the .then.
/*
TNOProject.deployed().then(function(instance) {
  console.log(instance);
});
*/

contract('TNOProject', function(accounts) {

  it("Project Description must equal to deployed", function() {
    var project;
    var projectDescription;

    return TNOProject.deployed().then(function(instance) {
      project = instance;
      return project.getProjectDescription.call(); // call() is used for reads, no transaction gas required, result is returned immediately
    }).then(function(outDescription) {
      projectDescription = outDescription.toString();
    }).then(function() {
      assert.equal(projectDescription, "Project 1", "Wrong Description value!");
    });
  });
 
  it("Tasks are created", function() {
    var project;
    var taskDescription;
	var numberOfTasks;
	
    return TNOProject.deployed().then(function(instance) {
      project = instance;
      return project.createTask("T1", "Task 1"); // gas required, result is not returned immediately, transaction id is returned instead
    }).then(function() {
	  //assert.isTrue(result);
	  return project.createTask("T2", "Task 2"); // gas required, result is not returned, transaction id is returned instead
    }).then(function() {
	  return project.getTaskDescription.call("T1"); // call() is used for reads, no transaction gas required, result is returned immediately
	}).then(function(outDescription) {
	  taskDescription = outDescription.toString();	  
	}).then(function() {
	  assert.equal(taskDescription, "Task 1", "Wrong Description value!");
 	  return project.getNumberOfTasks.call();
	}).then(function(outNum) {
	  numberOfTasks = outNum.toNumber();
	}).then(function() {
	  assert.equal(numberOfTasks, 2, "Wrong Number of tasks!");
   });
  });
  
  it("Deliverables are created by a specified account", function() {
	var project;
    var delDescription;
	var numberOfTasks;
	
    return TNOProject.deployed().then(function(instance) {
      project = instance;
      return project.createDeliverable("T1", "T1D1", "Deliverable 1", {from: accounts[0]}); // gas required, result is not returned immediately, transaction id is returned instead
/*
	}).then(function(result) {
	  alert("Transaction ok")
	}).catch(function(e) {
	  alert("Transaction error!")
	})
*/
    }).then(function() {
	  return project.getDeliverableDescription.call("T1", "T1D1"); // call() is used for reads, no transaction gas required, result is returned immediately
	}).then(function(outDescription) {
	  delDescription = outDescription.toString();	  
	}).then(function() {
	  assert.equal(delDescription, "Deliverable 1", "Wrong Description value!");
   });
  });

  it("Deliverables Description can be retrieved", function() {
    var project;
    var delDescription;

    return TNOProject.deployed().then(function(instance) {
      project = instance;
      return project.getDeliverableDescription.call("T1", "T1D1"); // call() is used for reads, no transaction gas required, result is returned immediately
    }).then(function(outDescription) {
      delDescription = outDescription.toString();	  
    }).then(function() {
      assert.equal(delDescription, "Deliverable 1", "Wrong Description value!");
   });
  });
  
  it("Deliverables Percent is updated", function() {
    var project;

    return TNOProject.deployed().then(function(instance) {
      project = instance;
      return project.setDeliverablePercent("T1", "T1D1", 2);
    }).then(function(result) {
      console.log(result.logs[0].event, "by address", result.logs[0].args.byAddress);
      assert.equal(result.logs[0].event, "PercentUpdated", "Expected PercentUpdated event");
   });
  });
  
});

/*
  it("Deliverables Description can be retrieved", function() {
    var project;
    var delDescription;

    return TNOProject.deployed().then(function(instance) {
      project = instance;
      return project.getDeliverableDescription.call("T1", "T1D1"); // call() is used for reads, no transaction gas required, result is returned immediately
    }).then(function(outDescription) {
      delDescription = outDescription.toString();	  
    }).then(function() {
      assert.equal(delDescription, "Deliverable 1", "Wrong Description value!");
   });
  });
*/
