var Web3 = require("web3");
console.log("hallo Web3");

if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8700"));
}

var coinbase = web3.eth.coinbase;
var balance = web3.eth.getBalance(coinbase);
console.log(balance);

//web3 = new Web3(provider);
web3.eth.accounts.forEach(function(account)  {
    balance = web3.eth.getBalance(account);
    console.log(balance);
  });

