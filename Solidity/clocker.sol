pragma solidity ^0.4.0;
contract clocker { 
    string public timeRecord; 
    
    function clocker(string _timeRecord) public { 
        timeRecord = _timeRecord; 
    } 
    
    function setTimeRecord(string _timeRecord) public { 
        timeRecord = _timeRecord;
    }
 
    function getTimeRecord() constant returns (string) {
        return timeRecord;
    }
}