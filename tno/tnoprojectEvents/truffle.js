module.exports = {
  contracts_build_directory: "..\tnoproject\build",
  networks: {
    development: {
      host: "localhost",
      port: 8700, //  run testrpc -p 8700, default was 8545
      network_id: "*" // Match any network id
    }
  }
};
