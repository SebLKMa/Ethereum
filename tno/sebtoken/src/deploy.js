/**
 * To run from Node, /node_modules must have Web3.
 * With package.json in root, run "npm install"
 */
var Web3 = require("web3");
console.log("hallo Web3");

if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8700"));
}

// load abi
abiFile = fs.readFileSync("bin/contracts/SebToken.abi");
abiJson = JSON.parse(abiFile.toString());

// load bin
binFile = fs.readFileSync("bin/contracts/SebToken.bin");
binData = binFile.toString();

// deploy
accountUsed = web3.eth.accounts[0];
myContract = web3.eth.contract(abiJson);
contractCreationData = { data: binData, from: accountUsed, gas:999999 };
deployedContract = myContract.new(contractCreationData); 

// store the created contract address, e.g. '0x65e4b5d61a45ed9f18efba3af40ebe31803cf53'
contractAddress = deployedContract.address;

// get the created contract instance
contractInstance = myContract.at(contractAddress);

// list all addesses tokens
web3.eth.accounts.forEach(theAddress => {
    tokens = contractInstance.balanceOf.call(theAddress)
    console.log(theAddress + ": " + tokens)
});

// send tokens
amount = 10;
fromAddress = web3.eth.accounts[0];
toAddress = web3.eth.accounts[1];
txnHash = contractInstance.sendTokens(toAddress, amount, { from: fromAddress});
//'0xd44a485e850497102cd39f455178b4ed9fb0fd2617a5c8186660f675c9b9b57a'
// check balances

