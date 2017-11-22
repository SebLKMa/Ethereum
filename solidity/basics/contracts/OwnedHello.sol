pragma solidity ^0.4.18;
import "./Ownable.sol";

/**
    Concrete ownable contract
 */
contract OwnedHello is Ownable {
    /* define variable greeting of the type string */
    string greeting;
    
    /* this runs when the contract is executed */
    function greeter(string _greeting) public {
        greeting = _greeting;
    }

    /* main function */
    function greet() public constant returns (string) {
        return greeting;
    }
}