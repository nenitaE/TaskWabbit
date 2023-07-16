import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './homePage.css';

import { NavLink, Link, Route, useParams } from 'react-router-dom';
import { getTaskTypes } from '../../store/taskTypes';
import { getTaskers } from '../../store/taskers';


const HomePage = () => {

    const dispatch = useDispatch();

    const [filterText, setFilterText] = useState('');
    const [taskTypeId, setTaskTypeId] = useState('');


    const user = useSelector(state => state.session.user)
    const taskTypes = useSelector(state => state.taskTypes);
    const taskers = Object.values(useSelector(state => state.taskers));
    const taskTypesById = {}
    taskTypes.forEach(taskType => { taskTypesById[taskType.id] = taskType })

    const filteredTaskTypes = taskTypes.filter(taskType => taskType.type.toLowerCase().startsWith(filterText.toLowerCase()));
    const validationErrors = []
    if (filteredTaskTypes.length == 0) validationErrors.push("Sorry, no results were found. Check your spelling or try searching for something else.");


    const updateFilterText = (e) => setFilterText(e.target.value);

    useEffect(() => {
        dispatch(getTaskTypes());
        dispatch(getTaskers());
    }, [dispatch]);

    if (taskTypes.length == 0) {
        return (
            <h1>Loading</h1>
        )
    }


    const recommendedTaskers = taskers.filter(tasker => user ? tasker.id != user.id : true).slice(0, 3);
    return (
        <main className='homepage-main-container'>
            <div className='book-task-spacing'>
                <h1>
                    {user ? 'Book Your Next Task' : 'Get help. Gain happiness'}
                </h1>
                <input
                    className='search-filter'
                    type="text"
                    placeholder={user ? "Choose your task type e.g. Cleaning" : 'I need help with...'}
                    value={filterText}
                    onChange={updateFilterText}
                />
                {validationErrors.length != 0 && (
                    <ul>
                        {validationErrors.map((error, idx) => (
                            <li className="signup-errors" key={idx}>
                                {error}
                            </li>
                        ))}
                    </ul>
                )}
                <div className='task-type-buttons'>
                    {filteredTaskTypes.map((taskType) => (
                        <NavLink key={taskType.id} className='task-type-button-link' to={user ? `/tasks/new/${parseInt(taskType.id)}` : `/loginSignup/${parseInt(taskType.id)}`}>
                            <div className='task-type-button'>
                                {taskType.type}
                            </div>
                        </NavLink>
                    ))}
                </div>
            </div>
            <div className="center-spacing">

            </div>
            <div className="taskers-recommended-container">
                <h3>
                    Taskers recommended for you
                </h3>
                <div className="taskers-recommended-spacing">
                    {recommendedTaskers.map((tasker) => (
                        <div className="tasker-recommended-individual" key={tasker.id}>
                            <div className="popular-in-area">popular in your area</div>
                            <div className='tasker-recommended-details'>
                                <h3>{tasker.firstName} {tasker.lastName}</h3>
                                <p>({tasker.reviews.length} reviews)</p>
                                <div>—————  Top Skills —————</div>
                                <div className="top-skill-container">
                                    {tasker.taskerTaskTypes.slice(0, 3).map((taskerTaskType) => (
                                        <div className="top-skills-layout" key={taskerTaskType.id}>
                                            {taskTypesById[taskerTaskType.taskType_id].type} for ${taskerTaskType.hourlyRate}/hr
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </main>
    )
}


export default HomePage;
