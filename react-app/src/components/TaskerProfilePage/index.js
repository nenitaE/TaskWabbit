import React, { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom/cjs/react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTaskerTaskTypes } from "../../store/taskerProfile";
import { getTaskTypes } from "../../store/taskTypes";
import { getTaskers } from "../../store/taskers";
import { getTasks } from "../../store/tasks";


function TaskerProfilePage() {

    const history = useHistory();
    const [isLoaded, setIsLoaded] = useState(false)
    const user = useSelector(state => state.session.user);
    //get tasktypes descriptions by tasktypeID from the state
    const taskTypes = useSelector(state => state.taskTypes);
    const taskTypesById = {}
    taskTypes.forEach(taskType => { taskTypesById[taskType.id] = taskType })
    console.log(taskTypes, "taskTypesfromState*************")

    const dispatch = useDispatch();
    //get taskerProfile from the state
    let taskerProfile = useSelector(state => state.taskerProfile.taskerTaskTypes)
    console.log(taskerProfile, "********TASKERprofile********")
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
    console.log(currTaskTypesById, "********CURRTASKTYPESBYID********")

    let taskType;
    return (
        <div>
            <h1>This will be the Tasker Profile Page</h1>
            <h2>Your current tasktypes are</h2>
            {isLoaded && currTaskTypesById.map((taskerTaskType) => (
                <li>
                    {taskTypesById[taskerTaskType.taskType_id].type}
                </li>
            ))}


            {!user || (
                <span className='create-new-tasktype'>
                    <li>
                        <NavLink to="/taskerTaskTypes/new">Create a New Tasktype</NavLink>
                    </li>
                </span>)}


        </div>)
}



export default TaskerProfilePage
