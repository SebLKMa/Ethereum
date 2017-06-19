pragma solidity ^0.4.0;

/**
  A new contract instance is created for a new customer.
  Every customer has an unique instance of this contract.
  Payment is made using the address of the instance of this contract.
*/
contract BillPayment { 
    string public customerId;
	uint public contractAmount;
	uint public payment;
	uint public balance;
	bool public completed;
    
    function BillPayment(string _customerId, uint _contractAmount) public { 
        customerId = _customerId;
		contractAmount = _contractAmount;
		balance = _contractAmount;
    } 
    
	/**
	  Running node receives payment for this customer contract instance.
	*/
    function receivePayment(uint _payment) public { 
        if (isCompleted()) return;
		
		payment = _payment;
		balance -= payment;
		
		if (balance <= 0) {
			balance = 0;
			completed = true;
		}
    }
 
    function getCustomerId() constant returns (string) {
        return customerId;
    }
	
	function getContractAmount() constant returns (uint) {
        return contractAmount;
    }
	
	function getBalance() constant returns (uint) {
        return balance;
    }
	
	function getPayment() constant returns (uint) {
        return payment;
    }
	
	function isCompleted() constant returns (bool) {
		return completed;
	}
}