var Web3 = require("web3");
var contract = require("truffle-contract");
var BCProject = contract(require("../../bcproject/build/contracts/BCProject.json"));
require("bootstrap");

var account; // the account used for executing contract methods
var accountX; // the account used for updating project percent
var percentEventWatcher; // the event watcher for percent updated

window.Dapp = {
  start: function() {
    this.setPercentEventWatcher();
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

  setPercentEventWatcher: function() {
    BCProject.deployed().then(function(instance) {
      percentEventWatcher = instance.PercentUpdated();
      percentEventWatcher.watch(function(error, result){
        // result contains various information including the argumets given to the PercentUpdated
        if (!error) {
            //console.log(JSON.stringify(result));
            if (result.args!=null && result.args!=undefined) {
              console.log(JSON.stringify(result));
              //console.log(result.event, "last performed by account", result.args.byAddress);
              var eventType = document.getElementById("event-type");
              eventType.innerHTML = result.event;
              var performedBy = document.getElementById("performed-by");
              performedBy.innerHTML = result.args.byAddress;
              var atBlock = document.getElementById("at-block");
              atBlock.innerHTML = result.blockNumber;
            }
        }
      });

      // Or pass anonymous callback function to start watching immediately
      //var percentEventWatcher = BCProject.PercentUpdated(function(error, result) {
      //    if (!error)
      //        console.log(result);
      //});
    
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
  BCProject.setProvider(web3.currentProvider);

  web3.eth.getAccounts(function(err, accounts) {
    if (err) {
      Dapp.throwError("Your browser can't see the decentralized web!", err);
    }
    if (accounts.length == 0) {
      Dapp.throwError("Accounts must exist");
    }
    
    account = accounts[0];  // This Dapp just use first detected account
    console.log("Account used:", account);
    Dapp.start();
  });
});
