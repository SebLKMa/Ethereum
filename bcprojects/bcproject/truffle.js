module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    development: {
      host: "localhost",
      port: 8700, // default 8545
      gas: 3000000, // use web3.eth.getBlock("pending").gasLimit >>4712388
      network_id: "*" // Match any network id
    }
  }
};
