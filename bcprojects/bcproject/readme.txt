testrpc -p 8700
truffle migrate
truffle test

npm install eth-ens-namehash -g
npm install web3 -g or npm install web3 -S
npm install webpack -g
https://github.com/dickolsson/irondoers
https://dickolsson.com/building-dapps-on-ethereum-part-3-user-interface/

How to access externally on npm start? "start": "http-server ./app -a 0.0.0.0 -p 8080 -c-1"
https://github.com/angular/angular-cli/issues/3765

npm install
npm run dev

DApp        http://localhost:8080/
DApp Events http://localhost:8081/

Troubleshoot:
Problem
<contract> has not been deployed to detected network
Solution
Run truffle migrate again

Problem
truffle migrate Exceeds block gas limit
Solution
https://stackoverflow.com/questions/42924634/unable-to-run-truffle2-1-2-migrate-network-live-exceeds-block-gas-limit
Add to truffle.js
      gas: 3000000, // use web3.eth.getBlock("pending").gasLimit >>4712388

for bcprojectEvents, copy the build from bcproject

Available Accounts
==================
...

