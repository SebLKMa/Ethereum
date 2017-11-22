pragma solidity ^0.4.17;

contract DummyFallBack {
    uint dummyValue;

    /**
        This function is called for all messages sent to this contract
        (when there is no other function).
        Sending Ether to this contract will cause an exception because
        this fallback function does not have a "payable" modifier.
     */
    function() {
        dummyValue = 1;
    }

    function getDummyValue() public view returns (uint) {
        return dummyValue;
    }
}