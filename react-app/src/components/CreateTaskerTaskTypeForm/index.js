import TaskerTaskTypeForm from "../TaskerTaskTypeForm";

const CreateTaskerTaskTypeForm = () => {
  const taskerTaskType = {
    hourlyRate: '', 
    tasker_id: '',
    taskType_id: ''
};
  

  return (
    <TaskerTaskTypeForm taskerTaskType={taskerTaskType} formType="SUBMIT NEW TASKTYPE/RATE" />
  );
}

export default CreateTaskerTaskTypeForm;