pragma solidity ^0.4.18;

/// Reentrancy bug fixed in withdraw() function
contract ReentrantSafe {
    mapping (address => uint) public balances;
    
    uint withdrawCount;
    event WithdrawInvoked(uint count);

    function ReentrantSafe() public payable {
        deposit();
        resetWithdrawCount();
    }

    /// Stores sender's value to balances
    function deposit() public payable {
        balances[msg.sender] = msg.value;
    }

    function resetWithdrawCount() public {
        withdrawCount = 0;
    }

    /// This function has a serious re-retrant bug
    function withdraw() public {
        withdrawCount++;
        WithdrawInvoked(withdrawCount);

        // send back to msg.sender his msg.sender's balance from balances
        // NOTE: callee's fallback payable function will be invoked
        //       when it receives Ether
        uint withdrawAmount = balances[msg.sender];
        balances[msg.sender] = 0;
        if (!msg.sender.call.value(withdrawAmount)()) {
            revert(); // this will result in invalid opcode, 
                      // unused gas is returned and everything gets rolled back 
                      // from previous calls, including withdrawCount++
        }
    }

    function getWithdrawCount() public view returns (uint) {
        return withdrawCount;
    }

    function() public {
        revert();
    }

}