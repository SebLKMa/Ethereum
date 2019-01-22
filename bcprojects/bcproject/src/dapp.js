var Web3 = require("web3");
var contract = require("truffle-contract");
var Project = contract(require("../build/contracts/BCProject.json"));
require("bootstrap");

var account; // the account used for executing contract methods
var accountX; // the account used for updating project percent
var percentEventWatcher; // the event watcher for percent updated

window.Dapp = {
  start: function() {
    // commented out to ensure nothing is cached
    //this.setTaskCount();
    //this.setDeliverableCount();
    //this.setProjectPercent();
    //this.setPercentEventWatcher();
  },

  setAlert: function(message, type) {
    type = type || "info";
    var element = document.getElementById("alerts");
    element.innerHTML = "<div class='alert alert-" + type + "'>" + message + "</div>";
  },

  throwError: function(message, err) {
    err = err || message;
    this.setAlert("<strong>Error!</strong> " + message, "danger");
    throw err;
  },

  setTaskCount: function() {
    Project.deployed().then(function(instance) {
      return instance.getNumberOfTasks.call();
    }).then(function(value) {
      var element = document.getElementById("task-count");
      element.innerHTML = value.valueOf();
    }).catch(function(err) {
      console.log(err);
    });
  },
  
  setDeliverableCount: function() {
    Project.deployed().then(function(instance) {
      var taskId = document.getElementById("task-id").value;
      return instance.getNumberOfDeliverables.call(taskId);
    }).then(function(value) {
      var element = document.getElementById("deliver-count");
      element.innerHTML = value.valueOf();
    }).catch(function(err) {
      console.log(err);
    });
  },
  
  setProjectPercent: function() {
    Project.deployed().then(function(instance) {
      return instance.getProjectPercent.call();
    }).then(function(value) {
      var element = document.getElementById("project-percent");
      element.innerHTML = value.valueOf();
    }).catch(function(err) {
      console.log(err);
    });
  },
  
  setPercentEventWatcher: function() {
    Project.deployed().then(function(instance) {
      percentEventWatcher = instance.PercentUpdated();
      percentEventWatcher.watch(function(error, result){
        // result contains various information including the argumets given to the PercentUpdated
        if (!error) {
            //console.log(JSON.stringify(result));
            if (result.args!=null && result.args!=undefined) {
              console.log(result.event, "last performed by account", result.args.byAddress);
            }
        }
      });
   
    }).catch(function(err) {
      console.log(err);
    });
  },

  createTask: function() {
    var self = this;
    var id = document.getElementById("task-id").value;
    var desc = document.getElementById("task-description").value;
    Project.deployed().then(function(instance) {
      self.setAlert("Submitting new Task...");
      return instance.createTask(id, desc, {from: account, gas: 900001});
    }).then(function() {
      self.setTaskCount();
      self.setAlert("Task was added!", "success");
    }).catch(function(err) {
      console.log(err);
    });
  },
  
  createDeliverable: function() {
    var self = this;
    var taskId = document.getElementById("task-id").value;
    var id = document.getElementById("deliver-id").value;
    var desc = document.getElementById("deliver-description").value;
    Project.deployed().then(function(instance) {
      self.setAlert("Submitting new Deliverable...");
      return instance.createDeliverable(taskId, id, desc, {from: account, gas: 900001});
    }).then(function() {
      self.setDeliverableCount();
      self.setAlert("Deliverable was added!", "success");
    }).catch(function(err) {
      console.log(err);
    });
  },
  
  updateDeliverPercent: function() {
    var self = this;
    var taskId = document.getElementById("task-id").value;
    var deliverId = document.getElementById("deliver-id").value;
    var deliverPercent = parseInt(document.getElementById("deliver-percent").value);
    var byAccount = document.getElementById("by-account").value;
    console.log(taskId, deliverId, deliverPercent);
    Project.deployed().then(function(instance) {
      self.setAlert("Submitting new Deliverable Percent...");
      var accountUsed = accountX;
      if (byAccount!=null && byAccount!=undefined) {
        accountUsed = byAccount;
      }
      return instance.setDeliverablePercent(taskId, deliverId, deliverPercent, {from: accountUsed, gas: 900001});
    }).then(function() {
      self.setProjectPercent();
      self.setAlert("Deliverable Percent was updated!", "success");
    }).catch(function(err) {
      console.log(err);
    });
  }
};

window.addEventListener("load", function() {
  if (typeof web3 !== "undefined") {
    window.web3 = new Web3(web3.currentProvider);
  } else {
    //window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8700"));
  }
  //IronDoers.setProvider(web3.currentProvider);
  //IronPromise.setProvider(web3.currentProvider);
  Project.setProvider(web3.currentProvider);

  web3.eth.getAccounts(function(err, accounts) {
    if (err) {
      Dapp.throwError("Your browser can't see the decentralized web!", err);
    }
    if (accounts.length < 2) {
      Dapp.throwError("At least 2 accounts must exist");
    }
    
    account = accounts[0];  // This Dapp just use first detected account
    accountX = accounts[1]; // The simulated account used for updating project percent
    console.log("Account used:", account);
    Dapp.start();
  });
});
