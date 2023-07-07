import React, { useEffect, useState } from "react";
import { NavLink, useHistory, useParams } from "react-router-dom/cjs/react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTaskerTaskTypes } from "../../store/taskerProfile";
import { getTaskTypes } from "../../store/taskTypes";
import DeleteTaskerTaskTypeModal from "../DeleteTaskerTaskTypeModal";
import { useModal } from "../../context/Modal";


function TaskerProfilePage() {

    const history = useHistory();
    const [isLoaded, setIsLoaded] = useState(false)
    const user = useSelector(state => state.session.user);
    console.log(user, "******USER**********")
    //get list of all possible tasktypes with descriptions by tasktypeID from the state
    const taskTypes = useSelector(state => state.taskTypes);
    console.log(taskTypes, "*********taskTypes*********")
    // flatten taskTypes into an obj with key of taskType.id
    const taskTypesById = {};
    taskTypes.forEach(taskType => {taskTypesById[taskType.id] = taskType})
    console.log(taskTypesById, "taskTypesById*************")

    const {setModalContent} = useModal();
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getTaskerTaskTypes())
        dispatch(getTaskTypes())
            .then(() => setIsLoaded(true))
    }, [dispatch]);

     //get taskerTaskTypes for current logged in tasker from the state
    let currTaskerTaskTypes = useSelector(state => state.taskerProfile.taskerTaskTypes)
     console.log (currTaskerTaskTypes, "********curr TASKER TASKTYPES********")
    if (!currTaskerTaskTypes) return null;

    // flatten currTaskerTaskTypes array and assign to obj with key of taskType_id
    const currTaskerTaskTypesById = {};
    currTaskerTaskTypes.forEach(currTaskerTaskType => {currTaskerTaskTypesById[currTaskerTaskType.taskType_id] = currTaskerTaskType})
    console.log(currTaskerTaskTypesById, "currTaskerTaskTypesById*************")

    const currTaskTypesById = Object.values(currTaskerTaskTypesById);
    console.log (currTaskTypesById, "********CURRTASKTYPESBYID********")

    const openDeleteTaskerTaskTypeModal = (taskerTaskTypeId) => {
        setModalContent(<DeleteTaskerTaskTypeModal taskerTaskTypeId={taskerTaskTypeId}/>)
    }

    let taskType;
    return (
        <div>
            <h1>Welcome {user.username}.</h1>
            <h2>Your current tasktypes are:</h2>
            {isLoaded && currTaskerTaskTypes.map((currTaskerTaskType) => (
                <div key={currTaskerTaskType.id}>
                    <span >{taskTypesById[currTaskerTaskType.taskType_id].type} at an hourly rate of ${currTaskerTaskType.hourlyRate}
                        <span> </span>
                        <span className='deleteTTBtn'>
                            <button onClick={() => openDeleteTaskerTaskTypeModal(currTaskerTaskType.id)}>Delete Tasktype</button>
                        </span>
                        <span> </span>
                        <span  className='editTTBtn'>
                            <NavLink to={`/taskerTaskTypes/${currTaskerTaskType.id}/edit`}>Edit Tasktype</NavLink>

                            {/* <a href={`/taskerTaskTypes/${currTaskType.taskType_id}/edit`}>
                            <button>Edit Tasktype</button>

                            <Link to={`/spots/${spot.id}`} key={spot.id}>
                            </a> */}
                        </span>
                    </span>
                </div>
            ))}

            {!user || (
                <span  className='create-new-tasktype'>
                    <a href="/taskerTaskTypes/new">
                    <button>Add a New Tasktype</button>
                    </a>
                </span>)}


        </div>)
}



export default TaskerProfilePage
