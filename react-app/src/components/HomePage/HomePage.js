import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './homePage.css';
// import OpenModalButton from './OpenModalButton';
// import SignupFormModal from './SignupFormModal';

import { NavLink, Link, Route, useParams } from 'react-router-dom';
import { getTaskTypes } from '../../store/homepage';

const HomePage = () => {

    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user);
    const tasktype = useSelector(state => state.session.tasktype)

    useEffect(() => {
        dispatch(getTaskTypes());
    },[dispatch]);



    return (
        <main>
            THIS IS THE HOMEPAGE
        </main>
    )
}

export default HomePage;
