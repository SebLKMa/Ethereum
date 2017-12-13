pragma solidity ^0.4.0;

/**
 * A new contract instance is created for a new customer.
 * Every customer has an unique instance of this contract.
 * Payment is made using the address of the instance of this contract.
 */
contract BillPayment { 
    string public customerId;
	uint public contractAmount;
	uint public payment;
	uint public balance;
	bool public completed;
    
    /**
     * Constructor
     */
    function BillPayment(string _customerId, uint _contractAmount) public { 
        customerId = _customerId;
		contractAmount = _contractAmount;
		balance = _contractAmount;
    } 
    
	/**
	 * Running node receives payment for this customer contract instance.
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
 
    /**
     * Get the customer ID.
     */
    function getCustomerId() constant returns (string) {
        return customerId;
    }
	
	/**
	 * Get the contract amount.
	 */
	function getContractAmount() constant returns (uint) {
        return contractAmount;
    }
	
	/**
	 * Get the outstanding balance yet to be received.
	 */
	function getBalance() constant returns (uint) {
        return balance;
    }
	
	/**
	 * Get the last payment received.
	 */
	function getPayment() constant returns (uint) {
        return payment;
    }
	
	/**
	 * Indicates if contract is fully received.
	 */
	function isCompleted() constant returns (bool) {
		return completed;
	}
}