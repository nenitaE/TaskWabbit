import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { authenticate } from '../../store/session';
import { useParams } from "react-router-dom";
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
    console.log('THE TASKS', tasks)

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
                Choose your tasker:
                    {filteredTaskers.length > 0 ? (
                        filteredTaskers
                        .filter(tasker => {
                            const hourlyRate = Number(tasker.taskerTaskTypes.find(taskType => taskType.taskType_id == taskTypeId).hourlyRate);
                            return hourlyRate <= maxHourlyRate;
                        })
                        .map((tasker) => (
                            <div key={tasker.id} className='tasker-card'>
                                <div className='tasker-image-container'>
                                    <img src="https://placehold.it/100" alt='Profile' className='profile-image'></img>
                                    <button onClick={() => handleSelectTasker(tasker.id)}>Select and continue</button>
                                </div>
                                <div className='tasker-info-container'>
                                    <div className='header'>
                                        <h2>{tasker.firstName}</h2>
                                        <h2>{tasker.taskerTaskTypes.find(taskType => taskType.taskType_id == taskTypeId).hourlyRate}/hr</h2>
                                    </div>

                                    <p>({tasker.reviews.length} reviews)</p>
                                    <p>Tasks done: {countTaskerTasks(tasker.id, taskTypeId)}</p>
                                    <p>{tasker.reviews[0] ? tasker.reviews[0].description : 'No reviews'}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No taskers available</p>
                    )}
            {/* </label> */}
            </div>
            <button type="button" onClick={handleBack}>
                Back
            </button>
        </div>
    )
}


export default Step2
