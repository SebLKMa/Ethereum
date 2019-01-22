pragma solidity ^0.4.11;

/// @title A TNO Project contract
contract TNOProject {

    /// This is a definition of deliverable
    struct Deliverable {
	    string id;          // ID or name of a deliverable
        string description; // Description of this deliverable
        uint percent;       // Percentage of completion of this deliverable
		bool isValid;       // Indicates of entity is valid
    }

    /// This is a definition of a task
    struct Task {
	    string id;          // ID or name of a task
        string description; // Description of this task
        uint percent;       // Overall percentage complettion of this task, can be updated by Deliverable events
		bool isValid;       // Indicates of entity is valid
		
        mapping(string => Deliverable) deliverablesMap; // map key: Deliverable Id, map value: Deliverable 
		string[] deliverableIds; // TODO https://github.com/ethereum/dapp-bin/blob/master/library/iterable_mapping.sol
	}

    string id;          // ID of a project
    string description; // Description of this project
    uint percent;       // Overall percentage complettion of this project, can be updated by Task event
	
	mapping(string => Task) tasksMap; // map key: Task Id, map value: Task
	string[] taskIds; // TODO https://github.com/ethereum/dapp-bin/blob/master/library/iterable_mapping.sol
	
    event PercentUpdated(address byAddress);
    
	/// Constructor of a new TNO Project contract
	function TNOProject(string _id, string _description) public {
        id = _id;
        description = _description;
        percent = 0;
    }
 
    /// Creates a new Task for this Project
    function createTask(string _id, string _description ) public returns (bool) {
        if (tasksMap[_id].isValid)
            return false; // already there
        
        tasksMap[_id].id = _id;
        tasksMap[_id].description = _description;
        tasksMap[_id].percent = 0;
        tasksMap[_id].isValid = true;
		
		//var t = Task({id: _id, description: _description, percent: 0, isValid: true});
		//tasksMap[_id] = t;
		taskIds.push(_id);
		
        return true;
    }
    
    /// Creates a new Deliverable for a Task
    function createDeliverable(string _taskId, string _deliverableId, string _deliverableDescription) public returns (bool) {
        if (!tasksMap[_taskId].isValid) {
            log0("Task no foind");
            return false; // already there
        }
        
        if (tasksMap[_taskId].deliverablesMap[_deliverableId].isValid) {
            log0("Deliverable exists");
            return false;
        }
        
        /*
        tasksMap[_taskId].deliverablesMap[_deliverableId].id = _deliverableId;
        tasksMap[_taskId].deliverablesMap[_deliverableId].description = _deliverableDescription;
        tasksMap[_taskId].deliverablesMap[_deliverableId].percent = 0;
        tasksMap[_taskId].deliverablesMap[_deliverableId].isValid = true;
        */
        Task storage t = tasksMap[_taskId]; // storage is a ref or pointer
        // Creates a new temporary memory struct, initialised with the given values
        // and copies it over to storage.
        //t.deliverablesMap[_deliverableId] = Deliverable({id: _deliverableId, description: _deliverableDescription, percent: 0, isValid: true});
		var d = Deliverable({id: _deliverableId, description: _deliverableDescription, percent: 0, isValid: true});
		t.deliverablesMap[_deliverableId] = d;
		t.deliverableIds.push(_deliverableId);
		
        log0("Deliverable created");
        return true;
    }
    
    /// Set percentage completion of a Deliverable
    function setDeliverablePercent(string _taskId, string _deliverableId, uint _percent) public returns (bool) {
        if (_percent < 0 || _percent > 100) {
            log0("Percentage not in valid range");
            return false;
        }
            
        if (!tasksMap[_taskId].isValid) {
            log0("Task no foind");
            return false;
        }
            
        if (!tasksMap[_taskId].deliverablesMap[_deliverableId].isValid) {
            log0("Deliverable not found");
            return false; 
        }

        tasksMap[_taskId].deliverablesMap[_deliverableId].percent = _percent;
        tasksMap[_taskId].deliverablesMap[_deliverableId].isValid = true;
        
        //Task storage t = tasksMap[_taskId]; storage is a ref only
        //uint deliverableSumPercent = 0;
        //uint deliverablesLen = tasksMap[_taskId].deliverables.length;
		//for (uint i = 0; i < deliverablesLen; i++) {
		//	deliverableSumPercent += tasksMap[_taskId].deliverables[i].percent;
		//}
		//tasksMap[_taskId].percent = deliverableSumPercent / deliverablesLen;
		//tasksMap[_taskId].percent = _percent;
        
        PercentUpdated(msg.sender); // send event
        
        log0("Deliverable percent is set");
        return true;
    }
    
    function getProjectId() public view returns (string) {
        return id;
    }
    
    function getProjectDescription() public view returns (string) {
        return description;
    }
    
    function getTaskId(string _taskId) public view returns (string) {
        if (!tasksMap[_taskId].isValid)
            return "not found";
            
        return tasksMap[_taskId].id;
    }
    
    function getTaskDescription(string _taskId) public view returns (string) {
        if (!tasksMap[_taskId].isValid)
            return "task not found";
            
        return tasksMap[_taskId].description;
    }

	function getNumberOfTasks() public view returns (uint) {
        return taskIds.length;
    }
    
    function getNumberOfDeliverables(string _taskId) public view returns (uint) {
        if (!tasksMap[_taskId].isValid) {
            return 0;
        }

        Task storage t = tasksMap[_taskId]; //storage is a ref only
        uint deliverablesLen = t.deliverableIds.length;
        return deliverablesLen;
    }
	
    function getProjectPercent() public view returns (uint) {
        if (taskIds.length == 0) {
            return 0;
        }

        uint taskSumPercent = 0;
        uint taskLen = taskIds.length;
		for (uint i = 0; i < taskLen; i++) {
		    var taskId = taskIds[i];
			taskSumPercent += getTaskPercent(taskId);
		}
        uint projectPercent = taskSumPercent / taskLen;
        
        return projectPercent;
    }

    function getTaskPercent(string _taskId) public view returns (uint) {
        if (!tasksMap[_taskId].isValid) {
            return 0;
        }

        Task storage t = tasksMap[_taskId]; //storage is a ref only
        uint deliverableSumPercent = 0;
        uint deliverablesLen = t.deliverableIds.length;
		for (uint i = 0; i < deliverablesLen; i++) {
		    var deliverableId = t.deliverableIds[i];
		    Deliverable storage d = t.deliverablesMap[deliverableId];
			deliverableSumPercent += d.percent;
		}
        uint taskPercent = deliverableSumPercent / deliverablesLen;
        
        //return tasksMap[_taskId].percent;
        return taskPercent;
    }
    
    // TODO http://solidity.readthedocs.io/en/latest/types.html#structs
    function getDeliverableId(string _taskId, string _deliverableId) public view returns (string) {
        if (!tasksMap[_taskId].isValid)
            return "task not found";
            
        if (!tasksMap[_taskId].deliverablesMap[_deliverableId].isValid)
            return "deliverable not found";
            
        return tasksMap[_taskId].deliverablesMap[_deliverableId].id;
    }
    
    function getDeliverableDescription(string _taskId, string _deliverableId) public view returns (string) {
        if (!tasksMap[_taskId].isValid)
            return "task not found";
            
        if (!tasksMap[_taskId].deliverablesMap[_deliverableId].isValid)
            return "deliverable not found";
            
        return tasksMap[_taskId].deliverablesMap[_deliverableId].description;
    }
    
    /// Get the percentage completion of a Deliverable
    function getDeliverablePercent(string _taskId, string _deliverableId) public view returns (uint) {
        if (!tasksMap[_taskId].isValid)
            return 0; // not found
            
        if (!tasksMap[_taskId].deliverablesMap[_deliverableId].isValid)
            return 0; // not found
            
        return tasksMap[_taskId].deliverablesMap[_deliverableId].percent;
    }
}