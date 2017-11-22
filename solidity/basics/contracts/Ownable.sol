pragma solidity ^0.4.18;

/**
    Represents a base contract that has the creator as the owner.
 */
contract Ownable {
    /* Define variable owner of the type address*/
    address owner;

    /* this function is executed at initialization and sets the owner of the contract */
    function Ownable() public { 
        owner = msg.sender;
    }

    /* Function to recover the funds on the contract */
    function kill() public {
        if (msg.sender == owner) { 
            selfdestruct(owner);
        }
    }
}