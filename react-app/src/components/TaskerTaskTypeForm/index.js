import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTaskerTaskTypes, fetchCreateTaskerTaskType  } from '../../store/taskerProfile';

const TaskerTaskTypeForm = ({ taskerTaskType, formType}) => {
    console.log("Inside TaskerTaskTypeForm component>>>>>>>>>>>>>>")
    const tasker_id = useSelector((state) => state.session.user.id);
    console.log(tasker_id, "******SESSIONUSER*********")
    // const tasker_id = session.user.id;
    // console.log (tasker_id, "********TASKERID********")
    const history = useHistory();
    const [hourlyRate, setHourlyRate] = useState(taskerTaskType.hourlyRate);
    const [taskType_id, setTaskTypeId] = useState(taskerTaskType.taskType_id);
    const [validationErrors, setValidationErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    
    const dispatch = useDispatch();

    const updateHourlyRate = (e) => setHourlyRate(e.target.value);
    const updateTaskType_id = (e) => setTaskTypeId(e.target.value);
      

    useEffect(() => {
        const errors = [];
        if(!Number(hourlyRate)) errors.push('You must enter an hourly rate');
        if(!Number(taskType_id)) errors.push('You must select a tasktype');
        setValidationErrors(errors);
    }, [hourlyRate, taskType_id])

    const handleSubmit = async (e) => {
        console.log("Inside Handle SUbmit...TaskerTaskTypeForm component>>>>>>>>>>>>>>")
    
        e.preventDefault();
        setHasSubmitted(true);
        
        const taskerTaskType = {
                hourlyRate,
                tasker_id,
                taskType_id
            };
        
        let newTaskerTaskType = await dispatch(fetchCreateTaskerTaskType(taskerTaskType));
        console.log(newTaskerTaskType, "newTaskerTaskType details in TaskerTaskType component----AFTER dispatching CreateTaskerTaskType");

        if (newTaskerTaskType) {
            let taskertasktypeId = newTaskerTaskType.id;
            
            history.push(`/api/taskerTaskType/${taskertasktypeId}`);
            dispatch(getTaskerTaskTypes(taskertasktypeId));
        }
        
    };
    
    return (
        <div className='a'>
            <form className ='b' onSubmit={handleSubmit} >   
                <h2>{formType}</h2>
                    <h3>Select a new task type to add to your profile.</h3>
                        <p></p>                    
                                <div className='c'>
                                    <label htmlFor='taskType_id'>Task Type</label>
                                        {hasSubmitted && !taskType_id && (
                                            <label htmlFor='taskType_id' className='field-error'>Task type is required</label>
                                        )}
                                        <input 
                                            type="text"
                                            placeholder="TaskType"
                                            required={true}
                                            value={taskType_id}
                                            onChange={updateTaskType_id}
                                        />
                                 </div>
                                    <div className='d'>
                                        <label htmlFor='hourlyRate'>Hourly Rate</label>
                                            {hasSubmitted && !hourlyRate && (
                                                <label htmlFor='hourlyRate' className='e'>Hourly rate is required</label>
                                            )}
                                            <input 
                                                type="text"
                                                placeholder="hourlyRate"
                                                required={true}
                                                value={hourlyRate}
                                                onChange={updateHourlyRate}
                                            />
                                    </div>
                                    <input type="submit" value={formType} />
            </form>
        </div>
    );


}

export default TaskerTaskTypeForm;