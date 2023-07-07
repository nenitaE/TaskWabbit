import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { createTask } from "../../store/tasks";
import { useEffect, useState} from "react";
import { useSelector } from "react-redux";
import { getTaskers } from "../../store/taskers";
import StepIndicator from "../StepIndicator";
import Step1 from "../Step1"
import Step2 from "../Step2"
import Step3 from "../Step3"
import Step4 from "../Step4";


function CreateTaskForm() {
    const dispatch = useDispatch();
    const { taskTypeId } = useParams();
    const [step, setStep] = useState(1);
    const [errors, setErrors] = useState([]);
    const [stepIsValid, setStepIsValid] = useState({1:false, 2:false, 3:false, 4:false}); //keep track whether each step is valid(stepindicator)

    const [formData, setFormData] = useState({
        taskTypeId:  taskTypeId,
        totalPrice: 100  // replace with actual default value
    });

    //Fetcha all Taskers
    useEffect(() => {
        dispatch(getTaskers())
    }, [dispatch]);


    const taskers = Object.values(useSelector(state => state.taskers));

    const handleStepComplete = (stepData) => {
      setStepIsValid(prevStepIsValid => ({...prevStepIsValid, [step]: true}));
        if (stepData.back) {
            setStep(prevStep => prevStep - 1);
        } else {
            setFormData(prevData => ({ ...prevData, ...stepData }));
            setStep(prevStep => prevStep + 1);
        }
    };

    //Moving through steps using StepIndicator
    const handleStepClick = (step) => {
      for(let i = 1; i < step; i++){
        if(!stepIsValid[i]){
          return;
        }
      }
      setStep(step);
    }

    const submitForm = async (e) => {
        // console.log(formData);
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
          <StepIndicator currentStep={step} onStepClick={handleStepClick}/>
          {step === 1 && (
            <Step1
              onStepComplete={handleStepComplete}
              existingData={formData}
            />
          )}
          {step === 2 && (
            <Step2
              taskers={taskers}
              onStepComplete={handleStepComplete}
              existingData={formData}
            />
          )}
          {step === 3 && (
            <Step3
              onStepComplete={handleStepComplete}
              existingData={formData}
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
