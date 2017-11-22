pragma solidity ^0.4.17;
import "./DummyFallBack.sol";

contract Caller {
    bool dummyState;

    function setDummyState(bool _state) public {
        dummyState = _state;
    }
    
    function callDummyFallBack(DummyFallBack _dummy) public /*returns (bool)*/ {
        dummyState = _dummy.call(0xabcded01); // hash does not exist, just test the fallback
        // should results in dummy.dummyValue == 1

        // The following will not compile, as dummy's fallback is not payable.
        // When someone sends ether to dummy, the txn will fail and ether is rejected.
        //dummy.send(2);

        //return result;
    }
}