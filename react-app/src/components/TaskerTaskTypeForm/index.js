import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTaskerTaskTypes, fetchCreateTaskerTaskType } from '../../store/taskerProfile';
import { getTaskTypes } from '../../store/taskTypes';
import './TaskerTaskType.css';

const TaskerTaskTypeForm = ({ taskerTaskType, formType}) => {
    console.log("Inside TaskerTaskTypeForm component>>>>>>>>>>>>>>")
    const tasker_id = useSelector((state) => state.session.user?.id);
    console.log(tasker_id, "******SESSIONUSER*********")
    const history = useHistory();
    

    // const tasker_id = session.user.id;
    // console.log (tasker_id, "********TASKERID********")
   
    const [hourlyRate, setHourlyRate] = useState("");
    const [rateError, setRateError] = useState('');
    const [taskType_id, setTaskTypeId] = useState(1);
    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    
    const dispatch = useDispatch();
    let hasErrors = false;

    const updateHourlyRate = (e) => setHourlyRate(e.target.value);
    const updateTaskType_id = (e) => setTaskTypeId(e.target.value);

    //Fetch all TaskerTaskTypes
    useEffect(() => {
        const data = dispatch(getTaskerTaskTypes());
        const taskTypeData = dispatch(getTaskTypes());
        console.log("********DATA-taskerTaskTypes*********", data)  
        console.log("********taskTypeDATA-taskerTaskTypes*********", taskTypeData)  
    }, [dispatch]);


    const handleSubmit = async (e) => {
        // console.log("Inside Handle SUbmit...TaskerTaskTypeForm component>>>>>>>>>>>>>>")
    
        e.preventDefault();
        setHasSubmitted(true);
        // Set hourlyRate errors

        const taskerTaskType = {
            hourlyRate,
            tasker_id,
            taskType_id
        };

        
        if (hourlyRate.length <= 0){
            setRateError('Must enter an hourly rate in USD to update');
            hasErrors = true;
        } else if (hourlyRate <= 0){
                setRateError('Must enter a minimum hourly rate of $1.');
                hasErrors = true;
        } else if (hourlyRate.includes(".")){
                setRateError('Must enter a whole number in USD.');
                hasErrors = true;
        } else {
            setRateError('');
        }
        
        // Disable form submission if errors are present
        if (hasErrors) {
            return;
        }

        // let newTaskerTaskType = await dispatch(fetchCreateTaskerTaskType(taskerTaskType));
        // console.log(newTaskerTaskType, "newTaskerTaskType details in TaskerTaskType component----AFTER dispatching CreateTaskerTaskType");
        // setErrors(newTaskerTaskType);
        // if (newTaskerTaskType.errors) {
        //     console.log(newTaskerTaskType.errors, "ERRRRRROOORRRRSSSS");  
        // } else {
        //     let taskertasktypeId = newTaskerTaskType.id;
            
        //     // history.push(`/taskerTaskTypes/current`);
        //     dispatch(getTaskerTaskTypes(taskertasktypeId));

        // }   
        const data = await dispatch(fetchCreateTaskerTaskType(taskerTaskType));
        console.log(data, "DATAnewTaskerTaskType details in TaskerTaskType component----AFTER dispatching CreateTaskerTaskType");
        if (data.id) {
            setErrors(data);
            // console.log(data.errors, "ERRRRRROOORRRRSSSS");
            let taskertasktypeId = data.id;
            dispatch(getTaskerTaskTypes(taskertasktypeId));
            history.push('/taskerTaskTypes/current')
        } else {
            alert('You are already signed up for this tasktype.  Please select a different one.')
        }
    };
    
    if (!tasker_id) {
        return(
            <div>
            <p>You must be a logged in tasker to access this page</p>
            {history.push('/')}
            </div>
        )
    }
    return (
        <div>
                <div className='newTTFormContainer'>
                    <form className ='ttFormContainer' onSubmit={handleSubmit} > 
                            <h2>{formType}</h2>
                                <div className='newTTInnerContainer'>
                                        <h3 className='newTT-TitleContainer'>Use this form to add a new tasktype to your profile.</h3>              
                                            <div className='newTTcontainer'>
                                                <h3>
                                                    <div>
                                                        <label  htmlFor='taskType_id'>Task Type </label>
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
                                                    <div>
                                                        <p className="field-error">
                                                            {rateError && <span className="error"> {rateError}</span>}
                                                        </p>
                                                    </div>
                                                    <input className='newTTSubmitBTN' type="submit" value={formType} />
                                                </h3>
                                            </div>
                                        
                                </div>
                    </form>
                </div>
        </div>
    );


}

export default TaskerTaskTypeForm;