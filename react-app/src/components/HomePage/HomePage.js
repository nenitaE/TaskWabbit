import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './homePage.css';
// import OpenModalButton from './OpenModalButton';
// import SignupFormModal from './SignupFormModal';

import { NavLink, Link, Route, useParams } from 'react-router-dom';
import { getTaskTypes } from '../../store/homepage';

const HomePage = () => {

    const dispatch = useDispatch();

    const [filterText, setFilterText] = useState('')

    const user = useSelector(state => state.session.user);
    const taskTypes = useSelector(state => state.taskTypes)

    const filteredTaskTypes = taskTypes.filter(taskType => taskType.type.toLowerCase().startsWith(filterText.toLowerCase()))
    // console.log(taskTypes, "tasktypes")

    const updateFilterText = (e) => setFilterText(e.target.value)

    useEffect(() => {
        dispatch(getTaskTypes());
    }, [dispatch]);

    if (taskTypes.length == 0) {
        return (
            <h1>Loading</h1>
        )
    }

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
        </main>
    )
}

export default HomePage;
