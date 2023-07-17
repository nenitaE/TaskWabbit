import TaskerTaskTypeForm from "../TaskerTaskTypeForm";

const CreateTaskerTaskTypeForm = () => {
  const taskerTaskType = {
    hourlyRate: '', 
    tasker_id: '',
    taskType_id: ''
};
  

  return (
    <TaskerTaskTypeForm taskerTaskType={taskerTaskType} formType="Submit New TaskType and/or Rate" />
  );
}

export default CreateTaskerTaskTypeForm;