import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { authenticate } from '../../store/session';
import { useParams, NavLink } from "react-router-dom";
import { getTasks } from '../../store/tasks';


import './Step2.css'

function Step2({ onStepComplete, taskers}){
    const [taskerId, setTaskerId] = useState(null);
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const { taskTypeId } = useParams();

    //Find the highest hourly rate from all taskers
    let highestHourlyRate = 0;
    taskers.forEach(tasker => {
        tasker.taskerTaskTypes.forEach(taskType => {
            if (taskType.taskType_id == taskTypeId && Number(taskType.hourlyRate) > highestHourlyRate) {
                highestHourlyRate = Number(taskType.hourlyRate);
            }
        });
    });
    const [maxHourlyRate, setMaxHourlyRate] = useState(highestHourlyRate);

    const taskstypesobj = {
        1:"General Mounting",
        2: "Minor Home Repairs",
        3: 'Cleaning',
        4: "Yard Work",
        5: "Plumbing Help",
        6: "Indoor Painting",
        7: "Heavy Lifting and Loading",
        8: "Waiting in Line",
        9: "Pet Sitting",
        10: "Cooking/Baking"
    }

    let tasktypename = taskstypesobj[taskTypeId]

    const handleSelectTasker= (taskerId) => {
        const selectedTasker = filteredTaskers.find(tasker => tasker.id === taskerId);
        const taskType = selectedTasker.taskerTaskTypes.find(taskType => taskType.taskType_id == taskTypeId);
        // console.log('THE TASKTYPE', taskType.hourlyRate)
        const trustAndSupportFee = 12.54;
        // const totalRate = Number(taskType.hourlyRate) + trustAndSupportFee;

        setTaskerId(taskerId);
        onStepComplete({
            'tasker_id': taskerId,
            'trustAndSupportFee': trustAndSupportFee.toFixed(2),
            'tasker_name': `${selectedTasker.firstName} ${selectedTasker.lastName}`,
            'hourlyRate': taskType.hourlyRate,
            'totalPrice': (Number(taskType.hourlyRate) + Number(trustAndSupportFee)).toFixed(2)
        });
    }

    const handleBack = () => {
        onStepComplete({ back: true });
    };

    useEffect(() => {
        dispatch(authenticate());
    }, [dispatch])

    useEffect(() => {
        dispatch(getTasks())
    }, [dispatch])

    const tasks = useSelector(state => state.tasks.tasks)
    // console.log('THE TASKS', tasks)

    const filteredTaskers = taskers.filter((tasker) => {
        // console.log('In the loop', tasker)
        if(tasker.id === user.id) {
            // console.log(`Tasker ${tasker.id} has the same ID as the user, excluding`);
            return false;
        }
        for (let i = 0; i < tasker.taskerTaskTypes.length; i++){
            let taskType = tasker.taskerTaskTypes[i].taskType_id
            if(taskTypeId == taskType){
                return true
            }
        }
        return false
    })

    // console.log('LALALA', filteredTaskers)

    function countTaskerTasks(taskerId, taskTypeId) {
        let count = 0
        for (let i = 0; i < tasks.length; i++){
            let tasktype = tasks[i].taskTypeId
            if((taskerId == tasks[i].tasker_id) && (tasktype == taskTypeId)){
                count = count + 1
            }

        }
        return count
    }



    return (
        <>
        <div className="form-step2-description">
            <i className="fa-solid fa-user-group"></i>
          <p className='step2-text'>Filter and sort to find your Tasker. Then view their availability to request your date.</p>
        </div>
        <div className='main_container'>
            <div className='range-slider'>
                <input
                    type="range"
                    min="0"
                    max={highestHourlyRate}
                    value={maxHourlyRate}
                    onChange={event => setMaxHourlyRate(Number(event.target.value))}
                />
                {maxHourlyRate}$
            </div>

            <div className='taskers'>
            {/* <label> */}
                {/* Choose your tasker: */}
                    {filteredTaskers.length > 0 ? (
                        filteredTaskers
                        .filter(tasker => {
                            const hourlyRate = Number(tasker.taskerTaskTypes.find(taskType => taskType.taskType_id == taskTypeId).hourlyRate);
                            return hourlyRate <= maxHourlyRate;
                        })
                        .map((tasker) => {
                            const avgRating = tasker.reviews.length
                            ? tasker.reviews.reduce((total, review) => total + review.rating, 0) /
                                tasker.reviews.length
                            : 0;

                            return (
                            <div key={tasker.id} className='tasker-card'>
                                <div className='tasker-image-container'>
                                    <img src="https://placehold.it/100" alt='Profile' className='profile-image'></img>

                                    <a className="reviews-link"  activeclassname="is-active" href={`/taskers/${tasker.id}/reviews`} target="_blank" rel="noopener noreferrer">View Reviews</a>
                                    <button className='select-button' onClick={() => handleSelectTasker(tasker.id)}>Select and continue</button>
                                </div>
                                <div className='tasker-info-container'>
                                    <div className='header'>
                                        <h2>{tasker.firstName}</h2>
                                        <h2>${tasker.taskerTaskTypes.find(taskType => taskType.taskType_id == taskTypeId).hourlyRate}/hr</h2>
                                    </div>
                                    {/* {avgRating > 0 && <p>Overall Rating</p>} */}
                                    <div className='review-info'>
                                        {avgRating > 0 && <p>★ {avgRating.toFixed(1)} </p>}
                                        <p>({`${tasker.reviews.length} review${tasker.reviews.length > 1 ? 's' : ''}`})</p>
                                    </div>

                                    <p>
                                    {countTaskerTasks(tasker.id, taskTypeId) === 0
                                        ? `${tasker.firstName} hasn't completed ${tasktypename} yet, be her first client`
                                        : `${countTaskerTasks(tasker.id, taskTypeId)} ${tasktypename} task${countTaskerTasks(tasker.id, taskTypeId) > 1 ? 's' : ''}`}
                                    </p>
                                    {
                                        countTaskerTasks(tasker.id, taskTypeId) !== 0 && (
                                        <p>{tasker.reviews[0] ? tasker.reviews[0].description : 'No reviews'}</p>
                                        )
                                    }
                                </div>
                            </div>)
                        })
                    ) : (
                        <p>No taskers available</p>
                    )}
            {/* </label> */}
            </div>
            <button  type="button" onClick={handleBack}>
                Back
            </button>
        </div>
    </>
    )
}


export default Step2
