import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import TaskersPage from "./components/TaskersPage";
import { authenticate } from "./store/session";
import MainFormPage from "./components/MainFormPage";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage/HomePage";
import TasksPage from "./components/TasksPage";
import EditTaskFormPage from "./components/EditTaskFormPage";
import CreateTaskForm from "./components/CreateTaskForm";
import ReviewByLoggedIn from "./components/CurrentReview";
import CreateReviewForm from "./components/CreateReviewForm/createReviewForm";
import GetReview from "./components/UpdateReview/GetReviewById";
import Update from "./components/UpdateReview";
import ReviewsByTasker_id from "./components/GetReviewByTasker/GetReviewByTasker";
import LoginSignup from "./components/LoginSignup/LoginSignup";
import TaskerProfilePage from "./components/TaskerProfilePage";
import CreateTaskerTaskTypeForm from "./components/CreateTaskerTaskTypeForm";
import NewUpdateTaskerTaskTypeForm from "./components/NewUpdateTaskerTaskTypeForm";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/login" >
            <LoginFormPage />
          </Route>
          <Route exact path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/loginSignup/:taskTypeId">
            <LoginSignup/>
          </Route>
          <Route exact path="/form">
            <MainFormPage />
          </Route>
          <Route exact path="/taskers">
            <TaskersPage />
          </Route>
          <Route exact path="/taskers/:tasker_id/reviews">
            <ReviewsByTasker_id />
          </Route>
          <Route exact path="/taskerTaskTypes/:taskerTaskTypeId/edit">
            <NewUpdateTaskerTaskTypeForm/>
          </Route>
          <Route exact path="/taskerTaskTypes/current">
            <TaskerProfilePage />
          </Route>
          <Route exact path="/taskerTaskTypes/new">
            <CreateTaskerTaskTypeForm />
          </Route>
          <Route exact path="/tasks/:taskId/edit">
            <EditTaskFormPage />
          </Route>
          <Route exact path="/tasks/current">
            <TasksPage />
          </Route>
          <Route exact path="/reviews/currentUser">
            <ReviewByLoggedIn />
          </Route>
          <Route exact path='/reviews/new'>
            <CreateReviewForm />
          </Route>
          <Route exact path='/reviews/:id'>
            <GetReview />
          </Route>
          <Route exact path="/reviews/:id/edit">
            <Update />
          </Route>
          <Route excat path="/tasks/new/:taskTypeId">
            <CreateTaskForm />
          </Route>

        </Switch>
      )}
    </>
  );
}

export default App;
