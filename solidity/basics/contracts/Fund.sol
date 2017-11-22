pragma solidity ^0.4.17;

// This contract has a bug
contract Fund {
    mapping(address => uint) shares; // mapping of ether shares of the contract

    /// Withdraw your share
    function withdraw() public {
        if (msg.sender.send(shares[msg.sender])) {
            shares[msg.sender] = 0;
        }
    }
}