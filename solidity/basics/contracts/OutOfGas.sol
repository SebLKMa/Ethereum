pragma solidity ^0.4.18;

// Just a contract to simulate Ou Of Gas
contract OutOfGas {
    uint dummyValue;

    function OutOfGas() public {
        dummyValue = 1855;
    }

    /// Starts an infinite loop to gtnerate Ouf Of Gas exception
    function startInfiniteLoop(uint _dummy) public {
        while (true) {
            dummyValue = _dummy;
        }
    }

    function getDummyValue() public view returns (uint) {
        return dummyValue;
    }
}