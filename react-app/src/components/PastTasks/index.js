import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link} from "react-router-dom";
import { getTasks } from "../../store/tasks";
import DeleteTaskModal from "../DeleteTaskModal";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import CreateReviewModal from "../CreateReviewForm";
import "./PastTasksPage.css";
import { getTaskers } from "../../store/taskers";
import avatarimage from "../../images/default_avatar.png"



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

    //hardcoded pictures from seeded data
    const PROFILE_PICTURES = {
        "demo": "",
        "marnie": "",
        "bobbie": ""
    }

    return (
        <div className="task-main-container">
            <div className="link-container">
            {/* <h1>Past Tasks</h1> */}
                <NavLink className="task-link" activeClassName="is-active"  to="/tasks/current">Current Tasks</NavLink>
                <NavLink className="task-link" activeClassName="is-active"  to="/tasks/past">Past Tasks</NavLink>
            </div>
            <div  className="spacer"></div>
            <div className="tasks-container">
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
                            <div className="task-type">
                                {task.taskType && <h2>{task.taskType.type}</h2>}

                            </div>
                            <div className="seperator"></div>
                            <div className="task-price">
                                {task.totalPrice && <h2>${task.totalPrice}</h2>}
                            </div>
                            <div className="tasker-name">
                                {tasker && (
                                    <>
                                        <img className="avatar-image"
                                            src={PROFILE_PICTURES[tasker.username] || avatarimage}
                                        />
                                        <h2>{tasker.firstName}</h2>
                                    </>
                                )}
                            </div>
                            <div className="tasktitle-date-location">
                                <p>Task Title: {task.title}</p>
                                <i className="fa-regular fa-calendar" />
                                <p>{
                                    new Date(task.task_date).toLocaleDateString('en-US', {
                                        weekday:'long',
                                        year:'numeric',
                                        month:'long',
                                        day:'numeric'
                                    })
                                }</p>
                                <p>Location: {task.location}</p>
                            </div>
                            <div className="task-button-actions">
                                <button className="select-button" onClick={() => openDeleteModal(task.id)}>Delete Task</button>
                                <CreateReviewModal tasker_id={task.tasker_id}/>
                                {taskDate >= currentDate && <Link to={`/tasks/${task.id}/edit`}>Edit Task</Link>}
                            </div>
                        </div>
                    )
                })}
        </div>
    </div>
)
}

export default PastTasksPage
