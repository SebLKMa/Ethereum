npm install eth-ens-namehash -g
npm install web3 -g or npm install web3 -S
npm install webpack -g
https://github.com/dickolsson/irondoers
https://dickolsson.com/building-dapps-on-ethereum-part-3-user-interface/

To deploy on specific port, in package.json
  "scripts": {

    "build": "webpack",

    "dev": "webpack-dev-server --host localhost --port 8081"

  },

https://stackoverflow.com/questions/33272967/how-to-make-the-webpack-dev-server-run-on-port-80-and-on-0-0-0-0-to-make-it-publ

npm install
npm run dev

Troubleshoot:
Problem
<contract> has not been deployed to detected network
Solution
Run truffle migrate again
