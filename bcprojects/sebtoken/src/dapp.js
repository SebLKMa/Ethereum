/**
 * With reference to
 * https://blog.zeppelin.solutions/a-gentle-introduction-to-ethereum-programming-part-2-7bbf15e1a953
 * 
 */
import $ from 'jquery';
import Web3 from 'web3';

// Instance Web3 using localhost testrpc
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8700"));

// This is an interface of the MyToken contract, called ABI, that we will interact with it
// TODO: fix SebToken.json file
//const myTokenContractABI = require('../bin/contracts/testcontract.json');
///const MyTokenContract = web3.eth.contract(myTokenContractABI);

//var fs = require('fs'); beware of file i/o, dapp is client side, not accessing server files !!!
const myTokenContractABI = require('../bin/contracts/SebToken_.json');
const MyTokenContract = web3.eth.contract(myTokenContractABI);

/*
We are not creating new contract dynamically
Remember real world eth client creation of new contract requires account password
and transactions have to be mined !!!.
const setMyContractAddress = () => {

  if (myContractAddress == null) {
    let abiFile = '[{"constant":true,"inputs":[],"name":"creator","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"receiver","type":"address"},{"name":"amount","type":"uint256"}],"name":"sendTokens","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balances","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]';
    let abiJson = JSON.parse(abiFile.toString());
    let binData = "6060604052341561000f57600080fd5b60008054600160a060020a03338116600160a060020a0319909216919091178083556127106001819055911682526002602052604090912055610214806100576000396000f30060606040526004361061006c5763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166302d05d3f811461007157806305ab421d146100a057806318160ddd146100d657806327e235e3146100fb57806370a082311461011a575b600080fd5b341561007c57600080fd5b610084610139565b604051600160a060020a03909116815260200160405180910390f35b34156100ab57600080fd5b6100c2600160a060020a0360043516602435610148565b604051901515815260200160405180910390f35b34156100e157600080fd5b6100e96101b5565b60405190815260200160405180910390f35b341561010657600080fd5b6100e9600160a060020a03600435166101bb565b341561012557600080fd5b6100e9600160a060020a03600435166101cd565b600054600160a060020a031681565b60003381831161015757600080fd5b600160a060020a0381166000908152600260205260409020548390101561017d57600080fd5b600160a060020a0380821660009081526002602052604080822080548790039055918616815220805484019055600191505092915050565b60015481565b60026020526000908152604090205481565b600160a060020a0316600090815260026020526040902054905600a165627a7a72305820be75439a6d55b732457fd08eb481490f93ac7571ab52ae8ece84cac0fb712c330029";
    let accountUsed = web3.eth.accounts[0];
    let myContract = web3.eth.contract(abiJson);
    let contractCreationData = { data: binData, from: accountUsed, gas:999999 };
    let deployedContract = myContract.new(contractCreationData); 
    // store the created contract address
    let myContractAddress = deployedContract.address; 
    // get the created contract instance
    contractInstance = myContract.at(contractAddress);
  }
  // Hard-coding a contract address ot you have to paste a valid contract address created previously
  //$('#contract-address').val(myContractAddress);
}
*/


// We will use this function to show the status of the deployed token sale contract
const synchSmartContract = () => {
  let contractAddress = $('#contract-address').val();
  let contractInstance = MyTokenContract.at(contractAddress);

  $('#my-token-balances').html("");
  web3.eth.accounts.forEach(address => {
    let tokens = contractInstance.balanceOf.call(address);
    $('#my-token-balances').append(`<p><span class="address">${address}</span> | <span class="balance">Tokens ${tokens}</span></p>`);
  });
};

// We will use this function to show the status of the accounts generated by testRPC
const synchAccounts = () => {
  $('#gas-price').html(`<b>Gas: ETH ${web3.eth.gasPrice}</b>`);
  $('#default-account').html(`<b>Default Account: ${web3.eth.defaultAccount}</b>`);
  $('#accounts').html("");
  web3.eth.accounts.forEach(account => {
    let balance = web3.eth.getBalance(account);
    $('#accounts').append(`<p><a href="#" class="from">from</a> <a href="#" class="to">to</a> <span class="address">${account}</span> | <span class="balance">ETH ${balance}</span></p>`);
  });
};

// This callback just avoids us to copy & past every time you want to use an address
const updateAddressFromLink = (event, inputSelector) => {
  event.preventDefault();
  $(inputSelector).val($(event.target).siblings(".address").text());
};

// Every time we click a transaction we will look for its details into the blockchain
const updateTransactionInfoFromLink = event => {
  event.preventDefault();
  let transactionHash = $(event.target).text();
  web3.eth.getTransaction(transactionHash, function(error, transactionInfo) {
    if(error) $("#errors").text(error);
    else {
      $("#transaction-info").find("#hash").text(transactionInfo.hash);
      $("#transaction-info").find("#nonce").text(transactionInfo.nonce);
      $("#transaction-info").find("#block-hash").text(transactionInfo.blockHash);
      $("#transaction-info").find("#block-number").text(transactionInfo.blockNumber);
      $("#transaction-info").find("#gas-usage").text(transactionInfo.gas);
      $("#transaction-info").find("#transaction-index").text(transactionInfo.transactionIndex);
      $("#transaction-info").find("#from").text(transactionInfo.from);
      $("#transaction-info").find("#to").text(transactionInfo.to);
      $("#transaction-info").find("#value").text(transactionInfo.value);
    }
  });
};

// Show initial accounts state and initialize callback triggers
synchAccounts();
$(document).on('change', '#contract-address', e => synchSmartContract());
$(document).on('click', '.from', e => updateAddressFromLink(e, '#seller-address'));
$(document).on('click', '.to', e => updateAddressFromLink(e, '#buyer-address'));
$(document).on('click', '.transaction', e => updateTransactionInfoFromLink(e));

// Every time we click the buy button, we will
$('#buy').click(() => {
  let buyingAmount = $('#buying-amount').val();
  let buyerAddress = $('#buyer-address').val();
  let sellerAddress = $('#seller-address').val();
  let contractAddress = $('#contract-address').val();

  let contractInstance = MyTokenContract.at(contractAddress);
  let transactionHash = contractInstance.sendTokens(buyerAddress, buyingAmount, { from: sellerAddress });
  $("#transaction-hash").text(`Tx Hash: ${transactionHash}`);
  $('#transactions-list').append(`<p><a href="#" class="transaction">${transactionHash}</a></p>`);
  synchSmartContract();
  synchAccounts();
});
