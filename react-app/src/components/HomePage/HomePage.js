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

    console.log(taskTypesById)
    const filteredTaskTypes = taskTypes.filter(taskType => taskType.type.toLowerCase().startsWith(filterText.toLowerCase()));



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
    // TODO use the ratings of each review to get an average star rating


    const recommendedTaskers = taskers.filter(tasker => user ? tasker.id != user.id : true).slice(0, 3);
    return (
        <main>
            <h1>
                {user ? 'Book Your Next Task' : 'Get help. Gain happiness'}
            </h1>
            <input
                type="text"
                placeholder={user ? "Choose your task type e.g. Cleaning" : 'I need help with...'}
                value={filterText}
                onChange={updateFilterText}
            />
            <ul>
                {filteredTaskTypes.map((taskType) => (
                    <div key={taskType.id}>
                        <NavLink to={`/tasks/new/${parseInt(taskType.id)}`}>
                            {taskType.type}
                        </NavLink>
                    </div>
                ))}
            </ul>
            <h3>
                Taskers recommended for you
            </h3>
            <ul>
                {recommendedTaskers.map((tasker) => (
                    <div key={tasker.id}>
                        <h3>{tasker.firstName} {tasker.lastName}</h3>
                        <p>Number of Reviews: {tasker.reviews.length}</p>
                        <ul>
                            {tasker.taskerTaskTypes.slice(0, 3).map((taskerTaskType) => (
                                <ul key={taskerTaskType.id}>
                                    {taskTypesById[taskerTaskType.taskType_id].type} for ${taskerTaskType.hourlyRate}/hr
                                </ul>

                            ))}
                        </ul>
                    </div>
                ))}
            </ul>

        </main>
    )
}


export default HomePage;
