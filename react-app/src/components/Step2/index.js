import React, { useEffect } from 'react';
import { useState } from 'react';
import { useModal } from '../../context/Modal';
import { useDispatch, useSelector } from "react-redux";
import { authenticate } from '../../store/session';
import { useParams } from "react-router-dom";

function Step2({ onStepComplete, taskers}){
    const [taskerId, setTaskerId] = useState(null);
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const { taskTypeId } = useParams();

    const handleSelectTasker= (taskerId) => {
        setTaskerId(taskerId);
        onStepComplete({
            'tasker_id': taskerId,
        });
    }

    const handleBack = () => {
        onStepComplete({ back: true });
    };

    useEffect(() => {
        dispatch(authenticate());
    }, [dispatch])



    const filteredTaskers = taskers.filter((tasker) => {
        // console.log('In the loop', tasker)
        if(tasker.id === user.id) {
            console.log(`Tasker ${tasker.id} has the same ID as the user, excluding`);
            return false;
        }

        // let filtertasktypes = tasker.taskerTaskTypes.some(taskType => taskType.taskType_id === taskTypeId)
        // console.log("--------check tasktypes length", tasker.taskerTaskTypes.length)
        for (let i = 0; i < tasker.taskerTaskTypes.length; i++){
            let taskType = tasker.taskerTaskTypes[i].taskType_id
            if(taskTypeId == taskType){
                return true
            }

        }
        // console.log('Checking for matching tasktypes', taskTypeId, )
        // if (!filtertasktypes) {
        //     console.log(`Tasker ${tasker.id} does not have task type ${taskTypeId}, excluding`);

        // }
        return false
    })

    console.log(filteredTaskers)

    return (
        <div>
            <label>
                Choose your tasker:
                    {filteredTaskers && filteredTaskers.map((tasker) => (
                        <div key={tasker.id}>
                            <h2>{tasker.firstName}</h2>
                            <p>({tasker.reviews.length} reviews)</p>
                            <p>{tasker.taskerTaskTypes.find(taskType => taskType.taskType_id == taskTypeId).hourlyRate}</p>
                            <button onClick={() => handleSelectTasker(tasker.id)}>Select and continue</button>
                        </div>
                    ))}
            </label>
            <button type="button" onClick={handleBack}>
                Back
            </button>

        </div>
    )
}

export default Step2
