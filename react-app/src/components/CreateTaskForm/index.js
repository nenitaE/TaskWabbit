import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { createTask } from "../../store/tasks";
import { useEffect, useState} from "react";
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
    const [errors, setErrors] = useState([]);

    const [formData, setFormData] = useState({
        taskTypeId:  taskTypeId,  // replace with actual default value
        totalPrice: 100  // replace with actual default value
    });

    //Fetcha all Taskers
    useEffect(() => {
        dispatch(getTaskers())
    }, [dispatch]);


    const taskers = Object.values(useSelector(state => state.taskers));

    const handleStepComplete = (stepData) => {
        if (stepData.back) {
            setStep(prevStep => prevStep - 1);
        } else {
            setFormData(prevData => ({ ...prevData, ...stepData }));
            setStep(prevStep => prevStep + 1);
        }
    };

    const submitForm = async (e) => {
        console.log(formData);
        e.preventDefault();
        const data = await dispatch(createTask(formData))
        if(data){
            setErrors(data)
        }else {
            setStep(step + 1);
        }
    }
    return (
        <form onSubmit={submitForm}>
          {step === 1 && (
            <Step1
              onStepComplete={handleStepComplete}
            />
          )}
          {step === 2 && (
            <Step2
            //   taskTypeId={taskTypeId}
            //   setTaskTypeId={setTaskTypeId}
              taskers={taskers}
              onStepComplete={handleStepComplete}
            />
          )}
          {step === 3 && (
            <Step3
              onStepComplete={handleStepComplete}
            />
          )}
          {step === 4 && (
            <Step4
              handleSubmit={submitForm}
            />
          )}

        </form>
      );
}





export default CreateTaskForm
