import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTaskerTaskTypes, fetchCreateTaskerTaskType } from '../../store/taskerProfile';

const TaskerTaskTypeForm = ({ taskerTaskType, formType}) => {
    console.log("Inside TaskerTaskTypeForm component>>>>>>>>>>>>>>")
    const tasker_id = useSelector((state) => state.session.user.id);
    console.log(tasker_id, "******SESSIONUSER*********")
    // const tasker_id = session.user.id;
    // console.log (tasker_id, "********TASKERID********")
    const history = useHistory();
    const [hourlyRate, setHourlyRate] = useState("");
    const [taskType_id, setTaskTypeId] = useState(1);
    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    
    const dispatch = useDispatch();

    const updateHourlyRate = (e) => setHourlyRate(e.target.value);
    const updateTaskType_id = (e) => setTaskTypeId(e.target.value);
      

    // useEffect(() => {
    //     const errors = [];
    //     if(!Number(hourlyRate)) errors.push('You must enter an hourly rate');
    //     if(!Number(taskType_id)) errors.push('You must select a tasktype');
    //     setValidationErrors(errors);
    // }, [hourlyRate, taskType_id])

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
            
            history.push(`/taskerTaskTypes/current`);
            dispatch(getTaskerTaskTypes(taskertasktypeId));
        } else {
                setErrors(['Please complete form']);
            }      
    };
    
    return (
        <div className='a'>
            <form className ='b' onSubmit={handleSubmit} > 
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>  
                    <h2>{formType}</h2>
                        <h3>Use this form to add a new tasktype to your profile.</h3>              
                            <div className='c'>
                                <label htmlFor='taskType_id'>Task Type </label>
                                    {hasSubmitted && !taskType_id && (
                                        <label htmlFor='taskType_id' className='field-error'>Task type is required</label>
                                    )}
                                    <select 
                                        id="taskType_id" 
                                        onChange={updateTaskType_id} 
                                        required={true}
                                    >
                                        <option value={1}>General Mounting</option>
                                        <option value={2}>Minor Home Repairs</option>
                                        <option value={3}>Cleaning</option>
                                        <option value={4}>Yardwork</option>
                                        <option value={5}>Plumbing Help</option>
                                        <option value={6}>Indoor Painting</option>
                                        <option value={7}>Heavy Lifting and Loading</option>
                                        <option value={8}>Waiting in Line</option>
                                        <option value={9}>Pet Sitting</option>
                                        <option value={10}>Cooking/Baking</option>  
                                    </select>
                            </div>
                                <div className='d'>
                                    <label htmlFor='hourlyRate'>Enter an hourly rate in US dollars: </label>
                                        {hasSubmitted && !hourlyRate && (
                                            <label htmlFor='hourlyRate' className='e'>Hourly rate is required</label>
                                        )}
                                        <input 
                                            type="number"
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