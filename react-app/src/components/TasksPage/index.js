import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTasks } from "../../store/tasks";
import DeleteTaskModal from "../DeleteTaskModal";
import { useModal } from "../../context/Modal";

function TasksPage(){
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.tasks.tasks)
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
        {tasks && tasks.map(task => {
            const taskDate = new Date(task.task_date);
            const currentDate = new Date();
            currentDate.setHours(0,0,0,0); // set current time to 00:00:00

            return (
                <div key={task.id}>
                    <h2>{task.title}</h2>
                    <p>Date: {task.task_date}</p>
                    <p>Location: {task.location}</p>
                    {task.taskType && <p>TaskType:{task.taskType.type}</p>}
                    <button onClick={() => openDeleteModal(task.id)}>Delete Task</button>
                    {taskDate >= currentDate && <Link to={`/tasks/${task.id}/edit`}>Edit Task</Link>}
                </div>
            )
        })}
    </div>
)
}

export default TasksPage
