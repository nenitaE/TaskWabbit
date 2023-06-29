import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { createTask } from "../../store/tasks";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getTaskers } from "../../store/taskers";
import Step1 from "../Step1"
import Step2 from "../Step2"
import Step3 from "../Step3"
import Step4 from "../Step4";



function CreateTaskForm() {
    const dispatch = useDispatch();
    const { taskTypeId } = useParams();
    console.log(taskTypeId, "tasktypeId______")
    const [step, setStep] = useState(1);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    // const [taskTypeId, setTaskTypeId] = useState(null);
    const [location, setLocation] = useState("")
    const [taskDate, setTaskDate] = useState("");
    const [errors, setErrors] = useState([]);
    const [taskerId, setTaskerId] = useState(null);

    //Fetcha all Taskers
    useEffect(() => {
        dispatch(getTaskers())
    }, [dispatch]);

    const taskers = Object.values(useSelector(state => state.taskers));
    console.log('THE TASKERS', taskers)

    const submitForm = async (e) => {
        const taskData = {
            location,
            description,
            "task_date": taskDate,
            title,
            "tasker_id": taskerId,
            "taskTypeId": taskTypeId,
            "totalPrice": 123,
        }
        const data = await dispatch(createTask(taskData))

        if(data){
            setErrors(data)
        }
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        await submitForm()
    }

    const handleNext = () => {
        setStep(step + 1)
    };

    const handleBack = () => {
        setStep(step - 1);
    };

    return (
        <form>
          {step === 1 && (
            <Step1
              location={location}
              setLocation={setLocation}
              description={description}
              setDescription={setDescription}
              handleNext={handleNext}
              title={title}
              setTitle={setTitle}
            />
          )}
          {step === 2 && (
            <Step2
            //   taskTypeId={taskTypeId}
            //   setTaskTypeId={setTaskTypeId}
              taskers={taskers}
              setTaskerId={setTaskerId}
              handleNext={handleNext}
              handleBack={handleBack}
            />
          )}
          {step === 3 && (
            <Step3
              taskDate={taskDate}
              setTaskDate={setTaskDate}
              handleNext={handleNext}
              handleBack={handleBack}
            />
          )}
          {step === 4 && (
            <Step4
              taskData={{location, description, taskers, taskDate}} // Pass all data for confirmation
              handleSubmit={submitForm}
            />
          )}
        </form>
      );
}





export default CreateTaskForm
