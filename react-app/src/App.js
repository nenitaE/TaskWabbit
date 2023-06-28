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
          <Route exact path="/form">
            <MainFormPage />
          </Route>
          <Route exact path="/taskers">
            <TaskersPage />
          </Route>
          <Route excat path="/tasks/:taskId/edit">
            <EditTaskFormPage />
          </Route>
          <Route exact path="/tasks/current">
            <TasksPage />
          </Route>
          <Route excat path="/tasks/new">
            <CreateTaskForm />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
