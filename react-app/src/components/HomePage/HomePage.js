import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './homePage.css';
// import OpenModalButton from './OpenModalButton';
// import SignupFormModal from './SignupFormModal';

import { NavLink, Link, Route, useParams } from 'react-router-dom';
import { getTaskTypes } from '../../store/taskTypes';
import { getTaskers } from '../../store/taskers';


const HomePage = () => {

    const dispatch = useDispatch();

    const [filterText, setFilterText] = useState('');

    const user = useSelector(state => state.session.user);
    const taskTypes = useSelector(state => state.taskTypes);
    const taskers = Object.values(useSelector(state => state.taskers));

    const filteredTaskTypes = taskTypes.filter(taskType => taskType.type.toLowerCase().startsWith(filterText.toLowerCase()));
    const recommendedTaskers = taskers.slice(0, 3);
    // console.log(taskTypes, "tasktypes")

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
    return (
        <main>
            <h1>
                Book Your Next Task
            </h1>
            <input
                type="text"
                placeholder="Choose your task type e.g. Cleaning"
                value={filterText}
                onChange={updateFilterText}
            />
            <ul>
                {filteredTaskTypes.map((taskType) => (
                    <div key={taskType.id}>
                        {taskType.type}
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
                            {tasker.taskerTaskTypes.slice(0, 3).map((taskType) => (
                                <li>
                                    Hourly Rate: {taskType.hourlyRate}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </ul>

        </main>
    )
}

export default HomePage;
