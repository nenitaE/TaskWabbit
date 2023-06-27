import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTasks } from "../../store/tasks";
import DeleteTaskModal from "../DeleteTaskModal";
import { useModal } from "../../context/Modal";

function TasksPage(){
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.tasks.tasks)
    console.log('HEY HERE ARE THE TASKS',tasks)
    const {setModalContent} = useModal();

    useEffect(() =>{
        dispatch(getTasks())
    }, [dispatch])

    const openDeleteModal = (taskId) => {
        setModalContent(<DeleteTaskModal taskId={taskId}/>)
    }

    return (
        <div>
            <h1>Current Tasks</h1>
            {tasks && tasks.map(task =>(
                <div key={task.id}>
                    <h2>{task.title}</h2>
                    <p>Date: {task.task_date}</p>
                    <p>Location: {task.location}</p>
                    {task.taskType && <p>TaskType:{task.taskType.type}</p>}
                    <button onClick={() => openDeleteModal(task.id)}>Delete Task</button>
                </div>
            ))}
        </div>
    )
}

export default TasksPage
