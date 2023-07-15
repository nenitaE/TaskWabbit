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
import ProtectedRoute from "./ProtectedRoute";
import PastTasksPage from "./components/PastTasks";
import Footer from "./components/Footer";
import {useLocation} from 'react-router-dom';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const location = useLocation();
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true)).catch(() => setIsLoaded(false));
  }, [dispatch]);

  return (
    <div className="App">
      {isLoaded && !location.pathname.startsWith('/tasks/new') && <Navigation isLoaded={isLoaded} />}
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/login/:taskTypeId?" >
            <LoginFormPage />
          </Route>
          <Route exact path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/loginSignup/:taskTypeId?">
            <LoginSignup/>
          </Route>
          <Route exact path="/form">
            <MainFormPage />
          </Route>
          <ProtectedRoute exact path="/taskers">
            <TaskersPage />
          </ProtectedRoute>
          <ProtectedRoute exact path="/taskers/:tasker_id/reviews">
            <ReviewsByTasker_id />
          </ProtectedRoute>
          <ProtectedRoute exact path="/taskerTaskTypes/:taskerTaskTypeId/edit">
            <NewUpdateTaskerTaskTypeForm/>
          </ProtectedRoute>
          <ProtectedRoute exact path="/taskerTaskTypes/current">
            <TaskerProfilePage />
          </ProtectedRoute>
          <ProtectedRoute exact path="/taskerTaskTypes/new">
            <CreateTaskerTaskTypeForm />
          </ProtectedRoute>
          <ProtectedRoute exact path="/tasks/:taskId/edit">
            <EditTaskFormPage />
          </ProtectedRoute>
          <ProtectedRoute exact path="/tasks/current">
            <TasksPage />
          </ProtectedRoute>
          <ProtectedRoute exact path="/tasks/past">
            <PastTasksPage/>
          </ProtectedRoute>
          <ProtectedRoute exact path="/reviews/currentUser">
            <ReviewByLoggedIn />
          </ProtectedRoute>
          <ProtectedRoute exact path='/reviews/new'>
            <CreateReviewForm />
          </ProtectedRoute>
          <ProtectedRoute exact path='/reviews/:id'>
            <GetReview />
          </ProtectedRoute>
          <ProtectedRoute exact path="/reviews/:id/edit">
            <Update />
          </ProtectedRoute>
          <ProtectedRoute exact path="/tasks/new/:taskTypeId">
            <CreateTaskForm />
          </ProtectedRoute>

        </Switch>
      )}
      {isLoaded && !location.pathname.startsWith('/tasks/new') && <Footer/>}
    </div>
  );
}

export default App;
