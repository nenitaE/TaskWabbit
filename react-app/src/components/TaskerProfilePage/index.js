import React, { useEffect, useState } from "react";
import {  useHistory } from "react-router-dom/cjs/react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTaskerTaskTypes } from "../../store/taskerProfile";
import { getTaskTypes } from "../../store/taskTypes";
import DeleteTaskerTaskTypeModal from "../DeleteTaskerTaskTypeModal";
import { useModal } from "../../context/Modal";
// import taskTypesImages from "../../imageData/taskTypes";
import './TaskerProfile.css';


function TaskerProfilePage() {

    const history = useHistory();
    const [isLoaded, setIsLoaded] = useState(false)
    const user = useSelector(state => state.session.user);

    //get list of all possible tasktypes with descriptions by tasktypeID from the state
    const taskTypes = useSelector(state => state.taskTypes);
    console.log("🚀 ~ file: index.js:20 ~ TaskerProfilePage ~ taskTypes:", taskTypes)
    console.log(typeof(taskTypes), "********TYPEOF")
    // flatten taskTypes into an obj with key of taskType.id
    const taskTypesById = {};
    console.log("🚀 ~ file: index.js:24 ~ TaskerProfilePage ~ taskTypesById:", taskTypesById)
    taskTypes.forEach(taskType => {taskTypesById[taskType.id] = taskType})


    const {setModalContent} = useModal();
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getTaskerTaskTypes())
        dispatch(getTaskTypes())
            .then(() => setIsLoaded(true))
    }, [dispatch]);

     //get taskerTaskTypes for current logged in tasker from the state
    let currTaskerTaskTypes = useSelector(state => state.taskerProfile.taskerTaskTypes)
    console.log("🚀 ~ file: index.js:40 ~ TaskerProfilePage ~ currTaskerTaskTypes:", currTaskerTaskTypes)

    if (!currTaskerTaskTypes) return null;

    const openDeleteTaskerTaskTypeModal = (taskerTaskTypeId) => {
        setModalContent(<DeleteTaskerTaskTypeModal taskerTaskTypeId={taskerTaskTypeId}/>)
    }

    
    // const taskTypeImageById = {};
    // //grab each tasktype id and pass it in as the key with imageData as the value
    // taskTypesImages.forEach(tasktypeImage => {
    //     taskTypeImageById[tasktypeImage.id] = tasktypeImage
    // })

    






    return (
        <div>
            <div id="taskerProfContainer">
                <h1 className="welcome">Welcome {user.firstName}.</h1>
                {isLoaded && currTaskerTaskTypes.length >0 && (<h2 className="currTTcontainer">You are currently available to perform the following task types:</h2>)}
                    <div className="TTcontainer">
                        {isLoaded && currTaskerTaskTypes.map((currTaskerTaskType) => (
                            <div className="individualTTcontainer" key={currTaskerTaskType.id}>
                                <img src={taskTypesById[currTaskerTaskType.taskType_id].image} alt="taskTypeImage" width="100" height="100" className="tasktype-image"/>
                                <p className="taskTypeName">{taskTypesById[currTaskerTaskType.taskType_id].type} <span className="basicSentence">at an hourly rate of</span><span> ${currTaskerTaskType.hourlyRate}</span></p>
                                    <span> </span>
                                <div>
                                    <span className='deleteTTBtn'>
                                        <button className="tasktype-button" onClick={() => openDeleteTaskerTaskTypeModal(currTaskerTaskType.id)}>Delete Tasktype</button>
                                    </span>
                                    <span> </span>
                                    <span  className='editTTBtn'>
                                        {/* {<NavLink to={`/taskerTaskTypes/${currTaskerTaskType.id}/edit`}>Edit Tasktype</NavLink>} */}

                                        { <a href={`/taskerTaskTypes/${currTaskerTaskType.id}/edit`}>
                                        <button className="tasktype-button">Edit Tasktype</button>
                                        </a> }
                                    </span>
                                </div>
                            </div>
                        ))}
                        {!currTaskerTaskTypes.length &&(
                        <div>
                            <h3> You are not currently available to perform any task types.</h3>
                            <h4>Use this form to add task types that you would like to perform.</h4>
                        </div>)}
                        <div className="create-new-tasktype-container">
                            {!user || (
                                <div  className='create-new-tasktype'>
                                    <a href="/taskerTaskTypes/new">
                                        <button className="create-new-tasktypeBttn">
                                            <h3> Add a New Tasktype To Your Profile </h3>
                                        </button>
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>        
            </div>
        </div>)
}



export default TaskerProfilePage
