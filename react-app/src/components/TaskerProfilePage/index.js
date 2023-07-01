import React, { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom/cjs/react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTaskerTaskTypes} from "../../store/taskerProfile";
import { getTaskTypes } from "../../store/taskTypes";


function TaskerProfilePage() {

    const history = useHistory();
    const [isLoaded, setIsLoaded] = useState(false)
    const user = useSelector(state => state.session.user);
    const taskTypes = useSelector(state => state.taskTypes);
    console.log(taskTypes, "taskTypesfromState*************")
    // const taskTypesById = {}
    // taskTypes.forEach(taskType => { taskTypesById[taskType.id] = taskType })
    
    // console.log(taskTypesById,"*******TASKTYPESBYID*********")
    const dispatch = useDispatch();

    let taskerProfile = useSelector(state => state.taskerProfile.taskerTaskTypes)
    console.log (taskerProfile, "********TASKERprofile********")
    // console.log (taskerProfile[0], "********CurrTASKERprofile********")
    let currTaskerProfile = taskerProfile[0]
    const currTaskTypesById = Object.values(currTaskerProfile.taskerTaskTypes);
    console.log (currTaskTypesById, "********CURRTASKTYPESBYID********")
    

    useEffect(() => {
        dispatch(getTaskerTaskTypes())
        dispatch(getTaskTypes())
        .then(() => setIsLoaded(true))
    }, [dispatch]);

    if (!taskerProfile) return null;
    


    return (
        <div>
            <h1>This will be the Tasker Profile Page</h1>
            <h2>Your current tasktypes are</h2>
            {isLoaded && currTaskTypesById.map((taskType) => (
               <li>{taskTypes[taskType.id].type} at an hourly rate of ${taskType.hourlyRate}</li> 
            ))}
            
        
            {!user || (
                <span  className='create-new-tasktype'>
                    <li>
                        <NavLink to="/taskerTaskTypes/new">Create a New Tasktype</NavLink>
                    </li>
                </span>)}
              
            
        </div>)
}



export default TaskerProfilePage