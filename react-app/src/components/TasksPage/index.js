import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import { getTasks } from "../../store/tasks";
import DeleteTaskModal from "../DeleteTaskModal";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import CreateReviewModal from "../CreateReviewForm";
import avatarimage from "../../images/default_avatar.png"
import { getTaskers } from "../../store/taskers";
import noTasksImage from "../../images/notasks.png"

//Note: Rename this to CurrentTasksPage

//hardcoded pictures from seeded data
const PROFILE_PICTURES = {
    "demo": "",
    "marnie": "",
    "bobbie": ""
}

function TasksPage(){
    const dispatch = useDispatch();
    const history = useHistory()
    const tasks = useSelector((state) => state.tasks.tasks)
    const taskers = useSelector((state) => Object.values(state.taskers))
    const {setModalContent} = useModal();

    useEffect(() =>{
        dispatch(getTasks())
        dispatch(getTaskers())
        // console.log('TASKKSSS', tasks);
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
                .filter(task => new Date(task.task_date) >= new Date()).length > 0 //filter current tasks to show only tasks with date >= today
                ? tasks.map(task => {
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
                                {taskDate <= currentDate && <CreateReviewModal tasker_id={task.tasker_id}/> }
                                {taskDate >= currentDate && <NavLink className="select-button" to={`/tasks/${task.id}/edit`}>Edit Task</NavLink>}
                            </div>
                        </div>
                    )
                })
                :
                    <div className="image-container">
                        <img className="no-tasks-image" src={noTasksImage} alt="No tasks"></img>
                    </div>
            }
        </div>
    </div>
)
}






export default TasksPage
