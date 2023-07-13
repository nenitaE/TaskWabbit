import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTasks } from "../../store/tasks";
import DeleteTaskModal from "../DeleteTaskModal";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import CreateReviewModal from "../CreateReviewForm";
import "./PastTasksPage.css";
import { getTaskers } from "../../store/taskers";



function PastTasksPage(){
    const dispatch = useDispatch();
    const history = useHistory()
    const tasks = useSelector((state) => state.tasks.tasks)
    const taskers = useSelector((state) => Object.values(state.taskers))
    const {setModalContent} = useModal();

    useEffect(() =>{
        dispatch(getTasks())
        dispatch(getTaskers())
        console.log('The TASKERS', taskers)
    }, [dispatch])


    const openDeleteModal = (taskId) => {
        setModalContent(<DeleteTaskModal taskId={taskId}/>)
    }

    return (
        <div>
        <h1>Past Tasks</h1>
        <Link to="/tasks/current">Current Tasks</Link>
        <Link to="/tasks/past">Past Tasks</Link>
        {tasks && tasks
        .filter(task => new Date(task.task_date) < new Date()) //filter to past tasks to show only tasks with date < today
        .map(task => {
            const taskDate = new Date(task.task_date);
            const currentDate = new Date();
            currentDate.setHours(0,0,0,0); // set current time to 00:00:00
            const uniqueKey = `${task.id}_`;
            const tasker = taskers.find(tasker => tasker.id === task.tasker_id)

            return (
                <div key={uniqueKey} className="task-card">
                    {task.taskType && <h2>{task.taskType.type}</h2>}
                    {tasker && <p>{tasker.firstName}</p>}
                    <p>{task.title}</p>
                    <p>Date: {task.task_date}</p>
                    <p>Location: {task.location}</p>

                    {/* <p>Id: {task.tasker_id}</p> */}

                    <button onClick={() => openDeleteModal(task.id)}>Delete Task</button>
                    <CreateReviewModal tasker_id={task.tasker_id}/>
                    {taskDate >= currentDate && <Link to={`/tasks/${task.id}/edit`}>Edit Task</Link>}
                </div>
            )
        })}
    </div>
)
}

export default PastTasksPage
