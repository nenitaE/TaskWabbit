import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTask, updateTask } from "../../store/tasks";
import { useHistory, useParams } from "react-router-dom";

function EditTaskFormPage(){
    const dispatch = useDispatch();
    const { taskId } = useParams();
    const history = useHistory();

    const task = useSelector(state => state.tasks.currentTask);
    console.log("TASK IN UPDATE FORM", task)
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    // const [totalPrice, setTotalPrice] = useState(0);
    // const [isPastDate, setIsPastDate] = useState(false);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        dispatch(getTask(taskId))
    }, [dispatch, taskId])

    useEffect(() => {
        if(task){
            // const taskDate = new Date(task.task_date);
            // const currentDate = new Date();
            // currentDate.setHours(0,0,0,0) //set current time to 00:00:00
            // setIsPastDate(taskDate < currentDate);
            setTitle(task.title);
            setDescription(task.description);
            setLocation(task.location);
            // setTotalPrice(task.totalPrice);
        }

    }, [task]);

    if(!task){
        return null; //replace with loading spinner
    }
    // if(isPastDate){
    //   return <div>You cannot edit a Past Task Booking</div>
    // }

    const handleSubmit = async(e) => {
        e.preventDefault();

        const existingData = {
            "taskTypeId": task.taskTypeId,
            "user_id": task.user_id,
            "tasker_id": task.tasker_id,
            "task_date": task.task_date,
            "totalPrice": task.totalPrice
        }
        const taskData = {
            title,
            description,
            location,
            // totalPrice
        }

        const finaltaskData = {
            ...existingData,
            ...taskData
        }

        const data = await dispatch(updateTask(taskId, finaltaskData));
        if(data && data.length > 0){
            setErrors(data);
        } else {
            history.push('/tasks/current')
        }
    }
    return (
        <form onSubmit={handleSubmit}>
          <ul>
            {Array.isArray(errors) ? errors.map((error, idx) => <li key={idx}>{error}</li>) : <li>{errors}</li>}
          </ul>
          <label>
            Title
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label>
            Description
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <label>
            Location
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </label>
          {/* <label>
            Total Price
            <input
              type="number"
              value={totalPrice}
              onChange={(e) => setTotalPrice(e.target.value)}
            />
          </label> */}
          <button type="submit">Update Task</button>
        </form>
      );
}
export default EditTaskFormPage
