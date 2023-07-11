import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTasks } from "../../store/tasks";
import DeleteTaskModal from "../DeleteTaskModal";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import CreateReviewModal from "../CreateReviewForm";



function TasksPage(){
    const dispatch = useDispatch();
    const history = useHistory()
    const tasks = useSelector((state) => state.tasks.tasks)
    const {setModalContent} = useModal();

    useEffect(() =>{
        dispatch(getTasks())
        console.log('TASKKSSS', tasks);
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
            // console.log(task, 'map======')
            currentDate.setHours(0,0,0,0); // set current time to 00:00:00
            const uniqueKey = `${task.id}_`;

            return (
                <div key={uniqueKey}>
                    <h2>{task.title}</h2>
                    <p>Date: {task.task_date}</p>
                    <p>Location: {task.location}</p>
                    {/* <p>Id: {task.tasker_id}</p> */}
                    {task.taskType && <p>TaskType:{task.taskType.type}</p>}
                    <button onClick={() => openDeleteModal(task.id)}>Delete Task</button>
                    <CreateReviewModal tasker_id={task.tasker_id}/>
                    {taskDate >= currentDate && <Link to={`/tasks/${task.id}/edit`}>Edit Task</Link>}
                </div>
            )
        })}
    </div>
)
}

export default TasksPage
