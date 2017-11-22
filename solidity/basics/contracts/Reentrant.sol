pragma solidity ^0.4.18;

/// This contract is owned by a naive person whose intention is
/// register amounts deposited by addresses.
/// Note that Ethers deposited are stored in this contract's balance. 
contract Reentrant {
    mapping (address => uint) public balances;
    
    uint withdrawCount;

    function Reentrant() public payable {
        deposit();
        resetWithdrawCount();
    }

    /// Stores sender's value to balances
    function deposit() public payable  {
        balances[msg.sender] = msg.value;
    }

    function resetWithdrawCount() public {
        withdrawCount = 0;
    }

    /// This function has a serious re-retrant bug
    function withdraw() public {
        withdrawCount++;

        // send back to msg.sender his msg.sender's balance from balances
        // NOTE: callee's fallback payable function will be invoked
        //       when it receives Ether 
        if (!msg.sender.call.value(balances[msg.sender])()) {
            revert();
        }
        balances[msg.sender] = 0;
    }

    function getWithdrawCount() public view returns (uint) {
        return withdrawCount;
    }

    function() public {
        revert();
    }
}