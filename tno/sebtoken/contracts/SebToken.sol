pragma solidity ^0.4.11;

/// @title My company ICO token
contract SebToken {

    address public creator;
    uint256 public totalSupply;
    mapping (address => uint256) public balances;

    /// Constructor presets contract creator with 10000 tokens
	function SebToken() public {
        creator = msg.sender;
        totalSupply = 10000;
        balances[creator] = totalSupply;
    }
 
    function balanceOf(address owner) public constant returns (uint256) {
        return balances[owner];
    }
    
    function sendTokens(address receiver, uint256 amount) public returns (bool) {
        address owner = msg.sender;

        require(amount > 0);
        require(balances[owner] >= amount); // sender must have enough to send

        balances[owner] -= amount;
        balances[receiver] += amount;
        return true;
    }

}