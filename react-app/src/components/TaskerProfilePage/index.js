import React, { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom/cjs/react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTaskerTaskTypes} from "../../store/taskerProfile";
import { getTaskTypes } from "../../store/taskTypes";
import { getTaskers } from "../../store/taskers";
import { getTask, getTasks } from "../../store/tasks";
import DeleteTaskerTaskTypeModal from "../DeleteTaskerTaskTypeModal";
import { useModal } from "../../context/Modal";


function TaskerProfilePage() {

    const history = useHistory();
    const [isLoaded, setIsLoaded] = useState(false)
    const user = useSelector(state => state.session.user);
    //get tasktypes descriptions by tasktypeID from the state
    const taskTypes = useSelector(state => state.taskTypes);
    const taskTypesById = {};
    taskTypes.forEach(taskType => {taskTypesById[taskType.id] = taskType})
    console.log(taskTypesById, "taskTypesById*************")
    
    const {setModalContent} = useModal();
    const dispatch = useDispatch();
    //get taskerProfile from the state
    let taskerProfile = useSelector(state => state.taskerProfile.taskerTaskTypes)
    console.log (taskerProfile, "********TASKERprofile********")
    // console.log (taskerProfile[0], "********CurrTASKERprofile********")
    
    useEffect(() => {
        dispatch(getTaskers())
        dispatch(getTaskerTaskTypes())
        dispatch(getTaskTypes())
        dispatch(getTasks())
            .then(() => setIsLoaded(true))
    }, [dispatch]);

    if (!taskerProfile) return null;
    //get taskerProfile for current logged in tasker
    let currTaskerProfile = taskerProfile[0]
    // get list of current logged in tasker's tasktypes & hourlyrates by tasktypeID
    const currTaskTypesById = Object.values(currTaskerProfile.taskerTaskTypes);
    console.log (currTaskTypesById, "********CURRTASKTYPESBYID********")
    console.log (currTaskTypesById[5], "********CURRTASKTYPESBYIDNUM5********")

    const openDeleteTaskerTaskTypeModal = (taskerTaskTypeId) => {
        setModalContent(<DeleteTaskerTaskTypeModal taskerTaskTypeId={taskerTaskTypeId}/>)
    }

    return (
        <div>
            <h1>This will be the Tasker Profile Page</h1>
            <h2>Your current tasktypes are</h2>
            {isLoaded && currTaskTypesById.map((currTaskType) => (
                <div>
                    <li>{taskTypesById[currTaskType.taskType_id].type} at an hourly rate of ${currTaskType.hourlyRate}
                    <div className='deleteTTBtn'>
                    <button onClick={() => openDeleteTaskerTaskTypeModal(currTaskType.taskType_id)}>Delete Tasktype</button>
                    </div> 
                    </li>
                </div>
            ))}
            
            {!user || (
                <span  className='create-new-tasktype'>
                    <p>
                        <NavLink to="/taskerTaskTypes/new">Create a New Tasktype</NavLink>
                    </p>
                </span>)}
              
            
        </div>)
}



export default TaskerProfilePage