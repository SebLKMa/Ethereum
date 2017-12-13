pragma solidity ^0.4.11;

contract SimpleData {
    uint storedData;
    
    function set(uint _newData) public {
        storedData = _newData;
    }
    
    function get() public constant returns (uint) {
        return storedData;
    }
}
