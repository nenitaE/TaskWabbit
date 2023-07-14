import SignupFormPage from "../SignupFormPage";

const ShowSignUpForm = () => {
  const taskTypeId = {
    taskType_id: 'taskTypeId'
};
  

  return (
    <SignupFormPage taskTypeId={taskTypeId} formType="Sign Up" />
  );
}

export default ShowSignUpForm;